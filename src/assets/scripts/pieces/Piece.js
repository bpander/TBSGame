define(function (require) {
    'use strict';

    require('velocity');
    var $ = require('jquery');
    var Cell = require('components/Cell');
    var EventEmitter = require('EventEmitter');
    var Promise = require('bluebird');


    function Piece (player) {
        EventEmitter.call(this);

        this.player = player;

        this.actionPoints = 0;

        this.board = null;

        this.cell = null;

        this.damage = 0;

        this.element = document.createElement('div');

        this.$element = $(this.element);

        this.hitPoints = 0;

        this.piece = null;

        this.range = 0;

        this.shotCost = 0;

        this.startingActionPoints = 0;

        this.init();
    }
    Piece.prototype = Object.create(EventEmitter.prototype);
    Piece.prototype.constructor = Piece;


    Piece.EVENT_NAME = {
        FINISH:                 'piece:finish',
        ACTION_POINT_CHANGE:    'piece:actionPointChange'
    };


    Piece.prototype.init = function () {
        this.element.classList.add('piece');
        return this;
    };


    Piece.prototype.ready = function () {
        this.actionPoints = this.startingActionPoints;
        return this;
    };


    Piece.prototype.finish = function () {
        this.emit(Piece.EVENT_NAME.FINISH);
        return this;
    };


    Piece.prototype.setActionPoints = function (actionPoints) {
        this.actionPoints = actionPoints;
        this.emit(Piece.EVENT_NAME.ACTION_POINT_CHANGE, this);
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
        if (this.cell instanceof Cell) {
            this.cell.isOpen = true;
            this.cell.piece = null;
        }
        this.cell = cell;
        this.cell.isOpen = false;
        this.cell.piece = this;
        return this;
    };


    Piece.prototype.moveTo = function (cell) {
        var self = this;
        var cellCenterPoint = cell.getCenterPoint();
        this.setCell(cell);
        return new Promise(function (resolve) {
            $.when(self.$element.velocity({
                top: cellCenterPoint.top,
                left: cellCenterPoint.left,

                // Velocity zeroes these out (probably for hardware acceleration) which causes the pieces to jump when animated. This forces the pieces to stay vertically and horizontally centered.
                translateX: '-50%',
                translateY: '-50%'
            })).then(resolve);
        });
    };


    Piece.prototype.walkTo = function (cell) {
        var current = Promise.resolve();
        var path = this.board.grid.getPathBetween(this.cell, cell);
        var self = this;
        path.shift(); // Throw out the starting cell
        return Promise.map(path, function (cell) {
            current = current.then(function () {
                self.setActionPoints(self.actionPoints - 1);
                return self.moveTo(cell);
            });
            return current;
        });
    };


    Piece.prototype.guard = function () {

    };


    Piece.prototype.skip = function () {

    };


    return Piece;
});
