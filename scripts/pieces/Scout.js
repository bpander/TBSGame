define(function (require) {
    'use strict';

    var Piece = require('pieces/Piece');


    function Scout () {
        Piece.call(this);

        this.damage = 5;

        this.hitPoints = 10;

        this.range = 15;

        this.startingActionPoints = 10;

    }
    Scout.prototype = Object.create(Piece.prototype);
    Scout.prototype.constructor = Scout;


    Scout.prototype.init = function () {
        Piece.prototype.init.call(this);
        this.element.classList.add('piece_scout');
        return this;
    };


    Scout.prototype.setColor = function (color) {
        this.element.style.borderBottomColor = color;
        return this;
    };


    return Scout;
});
