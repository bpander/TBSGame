define(function (require) {
    'use strict';


    function Grid (rowCount, colCount) {

        this.rowCount = Math.floor(rowCount || 1);

        this.colCount = Math.floor(colCount || 1);

        this.element = document.createElement('div');

        this.cells = [];

        this.init();
    }


    Grid.prototype.init = function () {
        var i_row = 0;
        var i_col = 0;
        var row;
        var cell;

        this.element.classList.add('grid');

        for (i_col; i_col !== this.colCount; i_col++) {
            if (this.cells[i_col] === undefined) {
                this.cells[i_col] = [];
            }
            row = document.createElement('div');
            row.classList.add('grid-row');
            this.element.appendChild(row);
            for (i_row = 0; i_row !== this.rowCount; i_row++) {
                cell = document.createElement('div');
                cell.classList.add('grid-cell');
                row.appendChild(cell);
                this.cells[i_col][i_row] = cell;
            }
        }

        return this;
    };


    Grid.prototype.getCellAt = function (position) {
        return this.cells[position.col][position.row];
    };


    return Grid;
});
