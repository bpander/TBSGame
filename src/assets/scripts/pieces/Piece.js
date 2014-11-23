define(function (require) {
    'use strict';

    var Cell = require('components/Cell');


    function Piece () {

        this.actionPoints = 0;

        this.board = null;

        this.damage = 0;

        this.element = document.createElement('div');

        this.hitPoints = 0;

        this.cell = null;

        this.range = 0;

        this.shotCost = 0;

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


    Piece.prototype.setCell = function (cell) {
        var cellCenterPoint = cell.getCenterPoint();
        if (this.cell instanceof Cell) {
            this.cell.isOpen = true;
        }
        this.cell = cell;
        this.cell.isOpen = false;
        this.element.style.top = cellCenterPoint.top + 'px';
        this.element.style.left = cellCenterPoint.left + 'px';
        return this;
    };


    Piece.prototype.guard = function () {

    };


    Piece.prototype.skip = function () {

    };


    return Piece;
});
