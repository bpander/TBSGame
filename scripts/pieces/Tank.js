define(function (require) {
    'use strict';

    var Piece = require('pieces/Piece');


    function Tank () {
        Piece.call(this);

        this.damage = 5;

        this.hitPoints = 30;

        this.range = 8;

        this.startingActionPoints = 5;

    }
    Tank.prototype = Object.create(Piece.prototype);
    Tank.prototype.constructor = Tank;


    Tank.prototype.init = function () {
        Piece.prototype.init.call(this);
        this.element.classList.add('piece_tank');
        return this;
    };


    return Tank;
});
