define(function (require) {
    'use strict';

    var Cell = require('components/Cell');
    var Position = require('models/Position');


    function Grid (rowCount, colCount) {

        this.rowCount = Math.floor(rowCount || 1);

        this.colCount = Math.floor(colCount || 1);

        this.element = document.createElement('div');

        this.cells = [];

        this.init();
    }


    Grid.prototype.init = function () {
        var i_col = 0;
        var i_row = 0;
        var row;
        var cell;

        this.element.classList.add('grid');

        for (i_row; i_row !== this.colCount; i_row++) {
            if (this.cells[i_row] === undefined) {
                this.cells[i_row] = [];
            }
            row = document.createElement('div');
            row.classList.add('grid-row');
            this.element.appendChild(row);
            for (i_col = 0; i_col !== this.rowCount; i_col++) {
                cell = new Cell();
                cell.position = new Position(i_row, i_col);
                row.appendChild(cell.element);
                this.cells[i_row][i_col] = cell;
            }
        }

        return this;
    };


    Grid.prototype.getCellAt = function (position) {
        return this.cells[position.row][position.col];
    };


    return Grid;
});
