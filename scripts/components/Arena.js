define(function (require) {
    'use strict';

    var Grid = require('components/Grid');


    function Arena () {

        this.element = document.createElement('div');

        this.grid = new Grid(12, 12);

        this.init();
    }


    Arena.prototype.init = function () {
        this.element.classList.add('arena');
        this.element.appendChild(this.grid.element);
        return this;
    };


    return Arena;
})