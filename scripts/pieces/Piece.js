define(function (require) {
    'use strict';


    function Piece () {

        this.actionPoints = 0;

        this.board = null;

        this.damage = 0;

        this.element = document.createElement('div');

        this.hitPoints = 0;

        this.position = null;

        this.range = 0;

        this.startingActionPoints = 0;

        this.init();
    }


    Piece.prototype.init = function () {
        this.element.classList.add('piece');
        return this;
    };


    Piece.prototype.ready = function () {
        this.actionPoints = this.startingActionPoints;
        return this;
    };


    Piece.prototype.setColor = function (color) {
        this.element.style.backgroundColor = color;
        return this;
    };


    Piece.prototype.setBoard = function (board) {
        this.board = board;
        board.element.appendChild(this.element);
        return this;
    };


    Piece.prototype.setPosition = function (position) {
        var cell = this.board.grid.getCellAt(position);
        var cellBoundingRect = cell.getBoundingClientRect();
        this.position = position;
        this.element.style.top = (cellBoundingRect.top + cellBoundingRect.bottom) / 2 + 'px';
        this.element.style.left = (cellBoundingRect.left + cellBoundingRect.right) / 2 + 'px';
        return this;
    };


    Piece.prototype.guard = function () {

    };


    Piece.prototype.skip = function () {

    };


    return Piece;
});
