define(function (require) {
    'use strict';

    var Cell = require('components/Cell');
    var Collection = require('collections/Collection');
    var Position = require('models/Position');


    function Grid (rowCount, colCount) {

        this.rowCount = Math.floor(rowCount || 1);

        this.colCount = Math.floor(colCount || 1);

        this.element = document.createElement('div');

        this.cells = [];

        this.cellsFlattened = [];

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
                this.cellsFlattened.push(cell);
            }
        }

        return this;
    };


    Grid.prototype.getCellAt = function (position) {
        return this.cells[position.row][position.col];
    };


    Grid.prototype.getAdjacentOpenUntestedCells = function (cell) {
        var adjacentOpenUntestedCells = [];
        var i;
        var j;
        var col;
        var row;
        var cellPotential;
        for (i = -1; i <= 1; i++) {
            for (j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }
                row = cell.position.row + i;
                if (row < 0 || row >= this.rowCount) {
                    continue;
                }
                col = cell.position.col + j;
                if (col < 0 || col >= this.colCount) {
                    continue;
                }
                cellPotential = this.getCellAt(new Position(row, col));
                if (!cellPotential.isTested) {
                    cellPotential.isTested = true;
                    if (cellPotential.isOpen) {
                        adjacentOpenUntestedCells.push(cellPotential);
                    }
                }
            }
        }
        return adjacentOpenUntestedCells;
    };


    /**
     * Loops through all the cells and marks them all as untested and removes the walkable and shootable classes
     * @return {Grid}
     */
    Grid.prototype.reset = function () {
        var cell;
        var cellsFlattened = this.cellsFlattened;
        var i = 0;
        while ((cell = cellsFlattened[i++]) !== undefined) {
            cell.isTested = false;
            cell.element.classList.remove(Cell.CLASS_NAME.WALKABLE);
            cell.element.classList.remove(Cell.CLASS_NAME.SHOOTABLE);
        }
        return this;
    };


    /**
     * Calculates the shortest path between two grid cells using Dijkstra's algorithm
     * 
     * @param  {Cell}   cellStart   Starting cell
     * @param  {Cell}   cellFinal   Goal cell
     * @return {Cell[]} path        An array containing the cells from the starting cell to the final cell
     */
    Grid.prototype.getPathBetween = function (cellStart, cellFinal) {
        var i = 0;
        var cellCurrent;
        var path = [];
        var openList = new Collection([ cellStart ]);
        var closedList = new Collection();

        cellStart.G = 0;

        while (i++ < 10000) {
            cellCurrent = openList.getModelWithLowest('G');
            if (openList.models.length === 0 || cellCurrent === cellFinal) {
                break;
            }
            openList.remove(cellCurrent);
            closedList.add(cellCurrent);
            this.getAdjacentCells(cellCurrent).forEach(function (cellAdjacent) {
                if (cellAdjacent.isOpen === false || closedList.contains(cellAdjacent)) {
                    return;
                }
                if (openList.contains(cellAdjacent)) {
                    var gScoreOld = cellCurrent.G + cellAdjacent.getGScoreTo(cellCurrent);
                    var gScoreNew = cellCurrent.parent.G + cellAdjacent.getGScoreTo(cellCurrent.parent);
                    if (gScoreNew > gScoreOld) {
                        cellAdjacent.parent = cellCurrent.parent;
                        cellAdjacent.G = gScoreNew;
                    }
                    return;
                }
                openList.add(cellAdjacent);
                cellAdjacent.parent = cellCurrent;
                cellAdjacent.G = cellAdjacent.parent.G + cellAdjacent.getGScoreTo(cellCurrent);
            });
        }

        path = [ cellFinal ];
        cellCurrent = cellFinal;
        while ((cellCurrent = cellCurrent.parent) !== null) {
            path.unshift(cellCurrent);
        }
        this.clearHeuristics();

        return path;
    };


    Grid.prototype.getAdjacentCells = function (cell) {
        var cellAdjacent;
        var cells = [];
        var i;
        var j;
        var col;
        var row;
        for (i = -1; i <= 1; i++) {
            for (j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }
                row = cell.position.row + i;
                if (row < 0 || row >= this.rowCount) {
                    continue;
                }
                col = cell.position.col + j;
                if (col < 0 || col >= this.colCount) {
                    continue;
                }
                cellAdjacent = this.getCellAt(new Position(row, col));
                cells.push(cellAdjacent);
            }
        }
        return cells;
    };


    Grid.prototype.clearHeuristics = function () {
        var cell;
        var cells = this.cellsFlattened;
        var i = 0;
        while ((cell = cells[i++]) !== undefined) {
            cell.clearHeuristics();
        }
    };

    return Grid;
});
