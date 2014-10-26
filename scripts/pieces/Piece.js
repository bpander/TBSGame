define(function (require) {
    'use strict';


    function Piece () {

        this.element = document.createElement('div');

        this.startingActionPoints = 0;

        this.hitPoints = 0;

        this.range = 0;

        this.board = null;

        this.position = null;

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
