define(function (require) {
    'use strict';

    var Arena = require('components/Arena');
    var Player = require('models/Player');
    var Promise = require('bluebird');


    function Game (element) {

        this.element = element;

        this.arena = new Arena();

        this.players = [
            new Player('Player One'),
            new Player('Player Two'),
            new Player('Player Three')
        ];

        this.loop = this.loop.bind(this);

        this.init();
    }


    Game.prototype.init = function () {
        this.element.appendChild(this.arena.element);
        this.loop();
        return this;
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


    Game.prototype.loop = function () {
        return this.playRound().then(this.loop);
    };


    return Game;
});
