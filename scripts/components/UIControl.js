define(function (require) {
    'use strict';


    function UIControl (label) {

        this.label = label;

        this.element = document.createElement('div');

        this.button = document.createElement('button');

        this.init();
    }


    UIControl.prototype.init = function () {
        this.element.appendChild(this.button);

        this.element.classList.add('ui-control');
        this.button.classList.add('ui-control-button');

        this.setLabel(this.label);

        return this;
    };


    UIControl.prototype.setLabel = function (label) {
        this.label = label;
        this.button.innerText = label;
        return this;
    }


    return UIControl;
});
