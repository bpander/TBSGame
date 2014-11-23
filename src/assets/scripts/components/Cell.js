define(function (require) {
    'use strict';


    function Cell () {

        this.element = document.createElement('div');

        this.isOpen = true;

        this.isTested = false;

        this.position = null;

        this.init();
    }


    Cell.CLASS_NAME = {
        ELEMENT:    'grid-cell',
        SHOOTABLE:  'grid-cell_shootable',
        WALKABLE:   'grid-cell_walkable'
    };


    Cell.prototype.init = function () {
        this.element.classList.add(Cell.CLASS_NAME.ELEMENT);
        return this;
    };


    Cell.prototype.getCenterPoint = function () {
        var boundingClientRect = this.element.getBoundingClientRect();
        return {
            top: (boundingClientRect.top + boundingClientRect.bottom) / 2,
            left: (boundingClientRect.left + boundingClientRect.right) / 2
        };
    };


    return Cell;
});
