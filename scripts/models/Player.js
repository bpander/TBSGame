define(function (require) {
    'use strict';

    var Promise = require('bluebird');


    function Player (name, color) {

        this.name = name;

        this.color = color;

        this.pieces = [];

    }


    return Player;
});
