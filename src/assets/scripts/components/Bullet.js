define(function (require) {
    'use strict';

    var $ = require('jquery');


    function Bullet () {

        this.element = document.createElement('div');

        this.$element = $(this.element);

        this.init();
    }


    Bullet.prototype.init = function () {
        this.element.classList.add('bullet');
        return this;
    };


    return Bullet;
});
