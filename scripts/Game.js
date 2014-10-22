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
            new Player('Player One'),
            new Player('Player Two')
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
        this.players.forEach(function (player) {
            Game.pieces.forEach(function (Piece) {
                player.pieces.push(new Piece());
            });
        }, this);
    };


    return Game;
});
