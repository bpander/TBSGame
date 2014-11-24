define(function (require) {
    'use strict';

    require('velocity');
    var $ = require('jquery');
    var Cell = require('components/Cell');
    var EventEmitter = require('EventEmitter');


    function Piece () {
        EventEmitter.call(this);

        this.actionPoints = 0;

        this.board = null;

        this.damage = 0;

        this.element = document.createElement('div');

        this.$element = $(this.element);

        this.hitPoints = 0;

        this.cell = null;

        this.range = 0;

        this.shotCost = 0;

        this.startingActionPoints = 0;

        this.init();
    }
    Piece.prototype = Object.create(EventEmitter.prototype);
    Piece.prototype.constructor = Piece;


    Piece.EVENT_NAME = {
        FINISH: 'piece:finish'
    };


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


    Piece.prototype.moveTo = function (cell) {
        var self = this;
        var cellCenterPoint = cell.getCenterPoint();
        return new Promise(function (resolve) {
            // TODO: Eventually this will need A* pathfinding
            $.when(self.$element.velocity({
                top: cellCenterPoint.top,
                left: cellCenterPoint.left,

                // Velocity zeroes these out (probably for hardware acceleration) which causes the pieces to jump when animated. This forces the pieces to stay vertically and horizontally centered.
                translateX: '-50%',
                translateY: '-50%'
            })).then(resolve);
        });
    };


    Piece.prototype.guard = function () {

    };


    Piece.prototype.skip = function () {

    };


    return Piece;
});
