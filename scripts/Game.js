define(function (require) {
    'use strict';

    var Arena = require('components/Arena');
    var Player = require('models/Player');
    var Promise = require('bluebird');
    var Scout = require('pieces/Scout');
    var Soldier = require('pieces/Soldier');
    var Tank = require('pieces/Tank');


    function Game (element) {

        this.element = element;

        this.arena = new Arena();

        this.players = [
            new Player('Player One', 'red'),
            new Player('Player Two', 'blue')
        ];

        this.loop = this.loop.bind(this);

        this.init();
    }


    Game.pieces = [
        Tank,
        Scout,
        Soldier
    ];


    Game.prototype.init = function () {
        this.element.appendChild(this.arena.element);
        this.setup();
        this.loop();
        return this;
    };


    Game.prototype.loop = function () {
        return this.playRound().then(this.loop);
    };


    Game.prototype.playRound = function () {
        var current = Promise.resolve();
        return Promise.map(this.players, function (player) {
            current = current.then(function () {
                return player.playTurn();
            });
            return current;
        });
    };


    Game.prototype.setup = function () {
        var startingPositions = this.arena.constructor.startingPositions;
        var arenaElement = this.arena.element;
        this.players.forEach(function (player, i) {
            Game.pieces.forEach(function (Piece, j) {
                var position = startingPositions[i][j];
                var piece = new Piece();

                // TODO: This needs to be more re-usable since moving pieces is one of the main parts of the game
                var cell = this.arena.grid.getCellAt(position.col, position.row);
                var cellBoundingRect = cell.getBoundingClientRect();
                piece.element.style.top = (cellBoundingRect.top + cellBoundingRect.bottom) / 2 + 'px';
                piece.element.style.left = (cellBoundingRect.left + cellBoundingRect.right) / 2 + 'px';
                piece.setColor(player.color);
                this.arena.element.appendChild(piece.element);
                player.pieces.push(piece);
            }, this);
        }, this);
        return this;
    };


    return Game;
});
