/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Customer/js/customer-data',
    'Magento_Catalog/js/price-utils'
], function (ko, Component, _, customerData, priceUtils) {
    'use strict';

    return Component.extend({
        defaults: {
            defaultTemplate: 'Magento_Theme/promo-default',
            template: 'Magento_Theme/promo',
            amountDoneTemplate: 'Magento_Theme/success-promo',
            freeShippingPrice: 500,
            amountLeft: ko.observable(0),
            currentSubTotal: 0,
            isFreeShippingAvailable: ko.observable(false)
        },
        initialize: function() {
            this._super();
            this.getInitValue();
            this.getUpdateValue();
        },
        checkFreeShipping: function() {
            return this.freeShippingPrice - this.currentSubTotal <= 0;
        },
        getAmountLeftValue: function(val) {
            let result = this.freeShippingPrice - val;
            return result >= 0 ? result : val;
        },
        getFormatPrice: function (val) {
            return priceUtils.formatPrice(val);
        },
        getValue: function (data) {
            let amountLeftValue = this.getAmountLeftValue(data.subtotalAmount);
            this.currentSubTotal = data.subtotalAmount;
            this.amountLeft(this.getFormatPrice(amountLeftValue));
        },
        getInitValue: function () {
            let customData = customerData.get('cart')();
            this.getValue(customData);
            this.isFreeShippingAvailable(this.checkFreeShipping());
        },
        getUpdateValue: function () {
            customerData.get('cart').subscribe(function (data) {
                this.getValue(data);
                this.isFreeShippingAvailable(this.checkFreeShipping());
            }.bind(this));
        }
    });
});
