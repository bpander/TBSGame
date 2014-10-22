define(function (require) {
    'use strict';

    var Grid = require('components/Grid');
    var Position = require('models/Position');


    function Arena () {

        this.element = document.createElement('div');

        this.grid = new Grid(Arena.UNITS_WIDE, Arena.UNITS_TALL);

        this.init();
    }


    Arena.UNITS_WIDE = 12;

    Arena.UNITS_TALL = 12;


    Arena.startingPositions = [
        [
            new Position(0, 0),
            new Position(1, 0),
            new Position(0, 1)
        ],
        [
            new Position(Arena.UNITS_WIDE - 1, Arena.UNITS_TALL - 1),
            new Position(Arena.UNITS_WIDE - 2, Arena.UNITS_TALL - 1),
            new Position(Arena.UNITS_WIDE - 1, Arena.UNITS_TALL - 2)
        ]
    ];


    Arena.prototype.init = function () {
        this.element.classList.add('arena');
        this.element.appendChild(this.grid.element);
        return this;
    };


    return Arena;
})