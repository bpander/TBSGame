define(function (require) {
    'use strict';


    function Cell () {

        this.element = document.createElement('div');

        this.isOpen = true;

        this.isTested = false;

        this.position = null;

        this.init();
    }


    Cell.prototype.init = function () {
        this.element.classList.add('grid-cell');
        return this;
    };


    return Cell;
});
