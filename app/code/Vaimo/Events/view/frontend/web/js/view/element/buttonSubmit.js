define([
    'Magento_Ui/js/form/components/button'
    ], function (Element) {
    'use strict';
    return Element.extend({
        defaults: {
            elementTmpl: 'view/element/buttonSubmit'
        },
        action: function () {
            // this.actions.forEach(this.applyAction, this);
            console.log('asdasd');
        },
    })
})