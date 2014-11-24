define(function (require) {
    'use strict';

    var EventEmitter = require('EventEmitter');


    function Cell () {
        EventEmitter.call(this);

        this.element = document.createElement('div');

        this.isOpen = true;

        this.isTested = false;

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
        WALKABLE:   'grid-cell_walkable'
    };

    Cell.EVENT_NAME = {
        MOVE_TO_REQUEST: 'cell:moveToRequest'
    };


    Cell._onClick = function (e) {
        if (this.element.classList.contains(Cell.CLASS_NAME.WALKABLE)) {
            this.trigger(Cell.EVENT_NAME.MOVE_TO_REQUEST, [ this ]);
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


    Cell.prototype.getCenterPoint = function () {
        var boundingClientRect = this.element.getBoundingClientRect();
        return {
            top: window.scrollY + (boundingClientRect.top + boundingClientRect.bottom) / 2,
            left: window.scrollX + (boundingClientRect.left + boundingClientRect.right) / 2
        };
    };


    return Cell;
});
