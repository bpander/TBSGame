define(function (require) {
    'use strict';

    var Grid = require('components/Grid');
    var Position = require('models/Position');


    function Board () {

        this.element = document.createElement('div');

        this.grid = new Grid(Board.UNITS_WIDE, Board.UNITS_TALL);

        this.init();
    }


    Board.UNITS_WIDE = 12;

    Board.UNITS_TALL = 12;


    Board.startingPositions = [
        [
            new Position(0, 0),
            new Position(1, 0),
            new Position(0, 1)
        ],
        [
            new Position(Board.UNITS_WIDE - 1, Board.UNITS_TALL - 1),
            new Position(Board.UNITS_WIDE - 2, Board.UNITS_TALL - 1),
            new Position(Board.UNITS_WIDE - 1, Board.UNITS_TALL - 2)
        ]
    ];


    Board.prototype.init = function () {
        this.element.classList.add('board');
        this.element.appendChild(this.grid.element);
        return this;
    };


    return Board;
})