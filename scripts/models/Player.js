define(function (require) {
    'use strict';

    var Promise = require('bluebird');


    function Player (name, color) {

        this.name = name;

        this.color = color;

        this.pieces = [];

    }


    Player.prototype.playTurn = function () {
        var self = this;
        return new Promise(function (resolve) {
            console.log(self.name, 'starting turn');
            setTimeout(function () {
                console.log(self.name, 'finishing turn');
                // resolve();
            }, 1000);
        });
    };


    return Player;
});
