/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
           'jquery',
           'Magento_Customer/js/customer-data',
           'underscore',
           'jquery/ui',
           'mage/decorate',
           'mage/collapsible',
           'mage/cookies'
       ], function ($, customerData, _) {
    'use strict';

    return function (widget) {
        $.widget('mage.sidebar', widget, {
            options: {
                debounceDelay: 500
            },

            /**
             * Create sidebar.
             * @private
             */
            _create: function () {
                this._super();
            },

            /** @inheritdoc */
            _initContent: function () {
                this._super();
                this._unbind();
                this._bind();
            },

            /**
             * Unbinding all previously binded events
             */
            _unbind: function () {
                this.element.off('keyup change focusout', this.options.item.qty);
            },

            /**
             * Binding new events
             */
            _bind: function () {
                const self = this;
                let el;

                this.element.on('change', this.options.item.qty, _.debounce(function (e) {
                    el = $(e.currentTarget);

                    if (self._checkQty(el)) {
                        self._updateItemQty(el);
                    }

                }, this.options.debounceDelay));
            },

            /**
             * @param {HTMLElement} element
             *
             * @returns {boolean}
             */
            _checkQty: function (element) {
                return this._isValidQty(element.data('item-qty'), element.val());
            },

            /**
             * @param {HTMLElement} element
             * @private
             */
            _updateItemQty: function (element) {
                this._ajax(this.options.url.update, {
                    'item_id': element.data('cart-item'),
                    'item_qty': element.val()
                }, element, this._updateItemQtyAfter);
            },

            /**
             * Update content after update qty
             *
             * @param {HTMLElement} elem
             */
            _updateItemQtyAfter: function (elem) {
                var productData = this._getProductById(Number(elem.data('cart-item')));

                if (!_.isUndefined(productData)) {
                    // $(document).trigger('ajax:updateCartItemQty');
                    this.recalculateTotals();
                }
            },

            recalculateTotals: function () {
                $(document).trigger('recalculateTotals');
            },



        });

        return $.mage.sidebar;
    };

});