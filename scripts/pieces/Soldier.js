define(function (require) {
    'use strict';

    var Piece = require('pieces/Piece');


    function Soldier () {
        Piece.call(this);

    }
    Soldier.prototype = Object.create(Piece.prototype);
    Soldier.prototype.constructor = Soldier;


    Soldier.prototype.init = function () {
        Piece.prototype.init.call(this);
        this.element.classList.add('piece_soldier');
        return this;
    };


    return Soldier;
});
