define(function (require) {
    'use strict';

    var Board = require('components/Board');
    var Bullet = require('components/Bullet');
    var Cell = require('components/Cell');
    var Player = require('models/Player');
    var Piece = require('pieces/Piece');
    var Promise = require('bluebird');
    var Scout = require('pieces/Scout');
    var Soldier = require('pieces/Soldier');
    var Tank = require('pieces/Tank');
    var UI = require('components/UI');
    var Volley = require('models/Volley');
    require('velocity');


    function Game (element) {

        this.element = element;

        this.activePiece = null;

        this.activePlayer = null;

        this.board = new Board();

        this.players = [
            new Player('Player One', 'red'),
            new Player('Player Two', 'blue')
        ];

        this.ui = new UI();

        this.loop = this.loop.bind(this);

        this._onPieceActionPointChange = Game._onPieceActionPointChange.bind(this);
        this._onTargetRequest = Game._onTargetRequest.bind(this);
        this._onWalkToRequest = Game._onWalkToRequest.bind(this);
        this._onUISkipRequest = Game._onUISkipRequest.bind(this);

        this.init();
    }


    /**
     * @property BULLET_SPEED
     * @description Number of pixels bullets travel per second
     * @static
     * @const
     * @type {Number}
     */
    Game.BULLET_SPEED = 1000;


    Game.pieces = [
        Tank,
        Scout,
        Soldier
    ];


    Game._onUISkipRequest = function () {
        this.activePiece.finish();
    };


    Game._onWalkToRequest = function (cell) {
        var self = this;
        this.board.grid.reset();
        this.activePiece.cell.deactivate();
        this.activePiece.walkTo(cell).then(function () {
            self.checkActivePieceStatus();
        });
    };


    Game._onTargetRequest = function (cell) {
        var self = this;
        this.board.grid.reset();
        this.manageVolley(new Volley(this.activePiece, cell)).then(function () {
            self.checkActivePieceStatus();
        });
    };


    Game._onPieceActionPointChange = function (piece) {
        this.ui.apReadout.setValue(piece.actionPoints);
    };


    Game.prototype.init = function () {
        this.element.appendChild(this.board.element);
        this.element.appendChild(this.ui.element);

        // TODO: There's probably a better way to do this (putting padding below the grid to allow space for the fixed UI)
        this.element.style.paddingBottom = this.ui.element.getBoundingClientRect().height + 'px';

        this.setup();
        this.enable();
        this.loop();

        return this;
    };


    Game.prototype.enable = function () {
        this.ui.on(UI.EVENT_NAME.SKIP_REQUEST, this._onUISkipRequest);
        this.players.forEach(function (player) {
            player.pieces.forEach(function (piece) {
                piece.on(Piece.EVENT_NAME.ACTION_POINT_CHANGE, this._onPieceActionPointChange);
            }, this);
        }, this);
        this.board.grid.cellsFlattened.forEach(function (cell) {
            cell.on(Cell.EVENT_NAME.WALK_TO_REQUEST, this._onWalkToRequest);
            cell.on(Cell.EVENT_NAME.TARGET_REQUEST, this._onTargetRequest);
        }, this);
        return this;
    };


    Game.prototype.loop = function () {
        return this.playRound().then(this.loop);
    };


    Game.prototype.playRound = function () {
        var self = this;
        var current = Promise.resolve();
        return Promise.map(this.players, function (player) {
            current = current.then(function () {
                return self.playTurn(player);
            });
            return current;
        });
    };


    Game.prototype.playTurn = function (player) {
        var self = this;
        var current = Promise.resolve();
        this.activePlayer = player;
        return Promise.map(player.pieces, function (piece) {
            current = current.then(function () {
                return self.playPiece(piece);
            });
            return current;
        });
    };


    Game.prototype.playPiece = function (piece) {
        if (this.activePiece instanceof Piece) {
            this.activePiece.cell.deactivate();
        }
        this.activePiece = piece;
        piece.cell.activate();
        piece.ready();
        this.ui.apReadout.setValue(piece.actionPoints);
        this.highlightWalkableArea(piece);
        this.highlightEnemiesInRange(piece);
        return new Promise(function (resolve) {
            piece.once(Piece.EVENT_NAME.FINISH, resolve);
        });
    };


    Game.prototype.highlightEnemiesInRange = function (piece) {
        var i = 0;
        var j = 0;
        var enemyPiece;
        var player;
        var players = this.players;
        while ((player = this.players[i++]) !== undefined) {
            if (player === this.activePlayer) {
                continue;
            }
            j = 0;
            while ((enemyPiece = player.pieces[j++]) !== undefined) {
                if (piece.cell.getNormalizedDistanceTo(enemyPiece.cell) < piece.range) {
                    enemyPiece.cell.makeTargetable();
                }
            }
        }
        return this;
    };


    Game.prototype.highlightWalkableArea = function (piece) {
        var i_move = 0;
        var i_cell = 0;
        var cell;
        var moveCount = piece.actionPoints;
        var numberOfStepsTakenWhereShootingIsStillPossible = piece.actionPoints - piece.volleyCost;
        var frontierCells = [ piece.cell ];
        var frontierCellsNew;
        var steps = [];

        this.board.grid.reset();

        for (; i_move !== moveCount; i_move++) {
            frontierCellsNew = [];
            i_cell = 0;
            while ((cell = frontierCells[i_cell++]) !== undefined) {
                frontierCellsNew = frontierCellsNew.concat(this.board.grid.getAdjacentOpenUntestedCells(cell));
            }
            steps.push(frontierCellsNew);
            frontierCells = frontierCellsNew;
        }

        steps.forEach(function (cells, i) {
            var isShootable = i < numberOfStepsTakenWhereShootingIsStillPossible;
            setTimeout(function () {
                cells.forEach(function (cell) {
                    cell.makeWalkable();
                    if (isShootable) {
                        cell.makeShootable();
                    }
                });
            }, 50 * i);
        });

        return this;
    };


    Game.prototype.setup = function () {
        var startingPositions = this.board.constructor.startingPositions;
        var boardElement = this.board.element;
        this.players.forEach(function (player, i) {
            Game.pieces.forEach(function (Piece, j) {
                var position = startingPositions[i][j];
                var piece = new Piece();
                piece.setColor(player.color);
                piece.setBoard(this.board);
                piece.moveTo(this.board.grid.getCellAt(position));

                player.pieces.push(piece);
            }, this);
        }, this);
        return this;
    };


    Game.prototype.manageVolley = function (volley) {
        var bullet = new Bullet();
        var distance;
        var duration;
        var isSuccessful = volley.shoot();
        var positionInitial = volley.piece.cell.getCenterPoint();
        var positionFinal = volley.targetCell.getCenterPoint();
        var self = this;

        bullet.$element.css(positionInitial);
        $.Velocity.hook(bullet.element, 'rotateZ', volley.piece.cell.getAngleTo(volley.targetCell) + 'deg');
        this.element.appendChild(bullet.element);

        if (!isSuccessful) {
            positionFinal.left -= 20 - (Math.round(Math.random()) * 40);
            positionFinal.top -= 20 - (Math.round(Math.random()) * 40);
        }

        distance = volley.piece.cell.getPixelDistanceTo(volley.targetCell);
        duration = distance / Game.BULLET_SPEED * 1000;
        return new Promise(function (resolve) {
            $.when(bullet.$element.velocity(positionFinal, { duration: duration, easing: 'linear' })).then(function () {
                self.element.removeChild(bullet.element);
                resolve();
            });
        });
    };


    Game.prototype.checkActivePieceStatus = function () {
        var piece = this.activePiece;
        if (piece.actionPoints > 0) {
            piece.cell.activate();
            this.highlightWalkableArea(piece);
            if (piece.actionPoints >= piece.volleyCost) {
                this.highlightEnemiesInRange(piece);
            }
        } else {
            piece.finish();
        }
        return this;
    };


    return Game;
});
