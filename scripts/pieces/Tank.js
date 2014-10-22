define(function (require) {
    'use strict';

    var Piece = require('pieces/Piece');


    function Tank () {
        Piece.call(this);

    }
    Tank.prototype = Object.create(Piece.prototype);
    Tank.prototype.constructor = Tank;


    Tank.prototype.init = function () {
        Piece.prototype.init.call(this);
        this.element.classList.add('piece_tank');
        return this;
    };


    return Tank;
});
