define(function (require) {
    'use strict';

    var EventEmitter = require('EventEmitter');


    function Cell () {
        EventEmitter.call(this);

        this.element = document.createElement('div');

        this.G = Infinity;

        this.isOpen = true;

        this.isTested = false;

        this.parent = null;

        this.position = null;

        this._onClick = Cell._onClick.bind(this);

        this.init();
    }
    Cell.prototype = Object.create(EventEmitter.prototype);
    Cell.prototype.constructor = Cell;


    Cell.CLASS_NAME = {
        ACTIVE:     'grid-cell_activePiece',
        ELEMENT:    'grid-cell',
        SHOOTABLE:  'mix-grid-cell_shootable',
        TARGETABLE: 'mix-grid-cell_targetable',
        WALKABLE:   'grid-cell_walkable'
    };

    Cell.EVENT_NAME = {
        WALK_TO_REQUEST: 'cell:walkToRequest',
        TARGET_REQUEST:  'cell:targetRequest'
    };


    Cell._onClick = function (e) {
        if (this.element.classList.contains(Cell.CLASS_NAME.WALKABLE)) {
            this.emit(Cell.EVENT_NAME.WALK_TO_REQUEST, this);
        } else if (this.element.classList.contains(Cell.CLASS_NAME.TARGETABLE)) {
            this.emit(Cell.EVENT_NAME.TARGET_REQUEST, this);
        }
    };


    Cell.prototype.init = function () {
        this.element.classList.add(Cell.CLASS_NAME.ELEMENT);
        this.element.addEventListener('click', this._onClick);
        return this;
    };


    Cell.prototype.activate = function () {
        this.element.classList.add(Cell.CLASS_NAME.ACTIVE);
        return this;
    };


    Cell.prototype.deactivate = function () {
        this.element.classList.remove(Cell.CLASS_NAME.ACTIVE);
        return this;
    };


    Cell.prototype.makeWalkable = function () {
        this.element.classList.add(Cell.CLASS_NAME.WALKABLE);
        return this;
    };


    Cell.prototype.makeShootable = function () {
        this.element.classList.add(Cell.CLASS_NAME.SHOOTABLE);
        return this;
    };


    Cell.prototype.makeTargetable = function () {
        this.element.classList.add(Cell.CLASS_NAME.TARGETABLE);
        return this;
    };


    Cell.prototype.getAngleTo = function (cell) {
        var centerPointInitial = this.getCenterPoint();
        var centerPointFinal = cell.getCenterPoint();
        return Math.atan2((centerPointFinal.top * -1) - (centerPointInitial.top * -1), centerPointFinal.left - centerPointInitial.left);
    };


    Cell.prototype.getCenterPoint = function () {
        var boundingClientRect = this.element.getBoundingClientRect();
        return {
            top: window.scrollY + (boundingClientRect.top + boundingClientRect.bottom) / 2,
            left: window.scrollX + (boundingClientRect.left + boundingClientRect.right) / 2
        };
    };


    Cell.prototype.getPixelDistanceTo = function (cell) {
        var centerPointInitial = this.getCenterPoint();
        var centerPointFinal = cell.getCenterPoint();
        return Math.sqrt( Math.pow(centerPointFinal.left - centerPointInitial.left, 2) + Math.pow(centerPointFinal.top - centerPointInitial.top, 2) );
    };


    Cell.prototype.getGScoreTo = function (cell) {
        return (this.position.row - cell.position.row === 0 || this.position.col - cell.position.col === 0) ? 10 : 14;
    };


    Cell.prototype.getNormalizedDistanceTo = function (cell) {
        return Math.max(Math.abs(this.position.row - cell.position.row), Math.abs(this.position.col - cell.position.col));
    };


    Cell.prototype.clearHeuristics = function () {
        this.parent = null;
        this.G = Infinity;
        return this;
    };


    return Cell;
});
