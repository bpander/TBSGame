define(function (require) {
    'use strict';


    function UIReadout (label, value) {

        this.label = label;

        this.value = value;

        this.element = document.createElement('div');

        this.labelElement = document.createElement('div');

        this.valueElement = document.createElement('div');

        this.init();
    }


    UIReadout.prototype.init = function () {
        this.element.appendChild(this.valueElement);
        this.element.appendChild(this.labelElement);

        this.element.classList.add('ui-control');
        this.element.classList.add('ui-control_readout');
        this.labelElement.classList.add('ui-control-label');
        this.valueElement.classList.add('ui-control-value');

        this.setLabel(this.label);
        this.setValue(this.value);

        return this;
    };


    UIReadout.prototype.setLabel = function (label) {
        this.label = label;
        this.labelElement.innerText = label;
        return this;
    };


    UIReadout.prototype.setValue = function (value) {
        this.value = value;
        this.valueElement.innerText = value;
        return this;
    };


    return UIReadout;
});
