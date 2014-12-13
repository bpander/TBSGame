define(function (require) {
    'use strict';


    function Volley (piece, targetCell) {

        this.piece = piece;

        this.targetCell = targetCell;

    }


    Volley.prototype.shoot = function () {
        var percentOfRange = this.piece.cell.getNormalizedDistanceTo(this.targetCell) / this.piece.range;
        return Math.random() >= percentOfRange;
    };


    return Volley;
});
