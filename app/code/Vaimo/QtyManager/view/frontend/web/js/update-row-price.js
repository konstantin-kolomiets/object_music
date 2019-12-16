/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
   'jquery',
   'Magento_Checkout/js/model/quote',
   'Magento_Catalog/js/price-utils',
   'jquery/ui',
], function ($, quote, priceUtils) {
    'use strict';

    $.widget('mage.updateRowPrice', {
        options: {
            debounceDelay: 1000,
        },

        _create: function () {
            this._constructorBlock();
            this.extendQtyManager();
        },

        /**
         * @description Method for adding increase/decrease buttons template and variable declaration.
         * And replace quantity input to this template.
         */
        _constructorBlock: function () {
            this.currentProductRow = this.element.closest('.item-info');
            this.currentProductPrice = this.currentProductRow.find('[data-th="Price"] .price');
            this.currentProductTotal = this.currentProductRow.find('[data-th="Subtotal"] .price');
        },

        /**
         * @description Method for update total price for current product in cart.
         */
        updateCurrentTotal: function () {
            let price = this.currentProductPrice.text();
            let priceValue = price.replace(/[^\d.-]/g, '');
            let totalSum = priceUtils.formatPrice(priceValue * this.element.val(), quote.getBasePriceFormat());
            this.currentProductTotal.text(totalSum);
        },

        /**
         * @description Method for extend qtyManager on cart page.
         */
        extendQtyManager: function () {
            const self = this;

            this.element.on('change paste keyup', function () {
                if (self.element.val() > 0) {
                    self.updateCurrentTotal();
                }
            });
        }

    });

    return $.mage.qtyManagerCart;
});
