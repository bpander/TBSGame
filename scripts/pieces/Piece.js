define(function (require) {
    'use strict';


    function Piece () {

        this.element = document.createElement('div');

        this.startingActionPoints = 0;

        this.hitPoints = 0;

        this.range = 0;

        this.init();
    }


    Piece.prototype.init = function () {
        this.element.classList.add('piece');
        return this;
    };


    Piece.prototype.setColor = function (color) {
        this.element.style.backgroundColor = color;
        return this;
    };


    Piece.prototype.guard = function () {

    };


    Piece.prototype.skip = function () {

    };


    return Piece;
});
