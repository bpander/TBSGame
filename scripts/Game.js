define(function (require) {
    'use strict';

    var Board = require('components/Board');
    var Cell = require('components/Cell');
    var Player = require('models/Player');
    var Promise = require('bluebird');
    var Scout = require('pieces/Scout');
    var Soldier = require('pieces/Soldier');
    var Tank = require('pieces/Tank');
    var UI = require('components/UI');


    function Game (element) {

        this.element = element;

        this.board = new Board();

        this.players = [
            new Player('Player One', 'red'),
            new Player('Player Two', 'blue')
        ];

        this.ui = new UI();

        this.loop = this.loop.bind(this);

        this.init();
    }


    Game.pieces = [
        Tank,
        Scout,
        Soldier
    ];


    Game.prototype.init = function () {
        this.element.appendChild(this.board.element);
        this.element.appendChild(this.ui.element);

        // TODO: There's probably a better way to do this (putting padding below the grid to push the fixed UI down)
        this.element.style.paddingBottom = this.ui.element.getBoundingClientRect().height + 'px';

        this.setup();
        this.loop();
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
        return Promise.map(player.pieces, function (piece) {
            current = current.then(function () {
                return self.playPiece(piece);
            });
            return current;
        });
    };


    Game.prototype.playPiece = function (piece) {
        piece.cell.element.classList.add('grid-cell_activePiece');
        piece.ready();
        this.ui.apReadout.setValue(piece.actionPoints);
        this.highlightWalkableArea(piece);
        return new Promise(function (resolve) {
            setTimeout(function () {
                piece.cell.element.classList.remove('grid-cell_activePiece');
                resolve();
            }, 2000);
        });
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
                piece.setCell(this.board.grid.getCellAt(position));

                player.pieces.push(piece);
            }, this);
        }, this);
        return this;
    };


    return Game;
});
