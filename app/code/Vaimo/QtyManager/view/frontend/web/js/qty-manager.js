/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
'jquery',
'underscore',
'mage/template',
'text!Vaimo_QtyManager/template/qty-template.html',
'jquery/ui',
'mage/validation'
   ], function ($, _, template, qtyTemplate) {
    'use strict';

    $.widget('mage.qtyManager', {
        _create: function () {
            this._constructorBlock();
            this._minQtyChecker();
            this._bind();
        },

        /**
         * @description Method for adding increase/decrease buttons template and variable declaration.
         * And replace quantity input to this template.
         */
        _constructorBlock: function () {
            this.element.after($(template(qtyTemplate, '')));
            this.block = this.element.next('[data-qty-wrapper]');
            this.block.find('[data-input]').replaceWith(this.element);
            this.qtyInput = this.block.find('.input-text.qty');
            this.decreaseBtn = this.block.find('[data-qty=decrease]');
            this.currentProductRow = this.block.closest('.item-info');
            this.currentProductPrice = this.currentProductRow.find('[data-th="Price"] .price');
            this.currentProductTotal = this.currentProductRow.find('[data-th="Subtotal"] .price');
        },

        /**
         * @description Method for getting current qty value.
         * @return {number} - quantity from input
         */
        _getQnty: function () {
            return +this.qtyInput.val();
        },

        /**
         * @description Method for setting new qty value.
         * @param {qty} qty - The new quantity value.
         */
        _setQty: function (qty) {
            this.qtyInput.val(qty);
        },

        /**
         * @description Method for update total price for current product in cart.
         */
        updateCurrentTotal: function () {
            let price = this.currentProductPrice.text();
            let priceCurrency = price.replace(/\d+.\d+/g,'');
            let priceValue = price.replace(/[^\d.-]/g, '');
            let totalSum = (priceValue * this.qtyInput.val()).toFixed(2).toString();
            let totalPrice = priceCurrency + totalSum;
            this.currentProductTotal.text(totalPrice);
        },

        /**
         * @description Method for update qty value and total price.
         * @param {qty} qty - The new quantity value.
         */
        _updateQty: function (qty) {
            this._setQty(qty);
            // Apply triggerChangeInput on minicart
            if (this.qtyInput.closest('#mini-cart').length) {
                this.triggerChangeInput();
            }
            // Apply updateCurrentTotal on checkout page
            if ($('body.checkout-cart-index').length) {
                this.updateCurrentTotal();
            }
        },

        /**
         * @description Method for decrease and increase events.
         */
        _bind: function () {
            let self = this;
            this.block.on('click', '[data-qty=decrease]', function (e) {
                e.preventDefault();
                self._decreaseQty();
            });
            this.block.on('click', '[data-qty=increase]', function (e) {
                e.preventDefault();
                self._increaseQty();
            });
            this.block.on('focusout', '.input-text.qty', function () {
                if(!this.closest('#mini-cart')){
                    self._isValidQtyUpdate();
                }
            });

        },

        /**
         * @description Method for decrease quantity.
         */
        _decreaseQty: function() {
            let newQty = this._getQnty() - 1;
            if (newQty <= 1) {
                newQty = 1;
                this._disableButton();
            }
            this._updateQty(newQty);
        },

        /**
         * @description Method for increase quantity.
         */
        _increaseQty: function() {
            let newQty = this._getQnty() + 1;
            if (newQty > 1) {
                this._enableButton();
            }
            this._updateQty(newQty);
        },

        /**
         * @description Method for validate quantity.
         */
        _isValidQtyUpdate: function () {
            let newQty = this._getQnty();
            if (newQty <= 1) {
                newQty = 1;
            }
            this._updateQty(newQty);
        },

        /**
         * @description Method for add disabled attribute for decrease button.
         */
        _disableButton: function() {
            this.decreaseBtn.attr('disabled', 'disabled');
        },

        /**
         * @description Method for remove disabled attribute for decrease button.
         */
        _enableButton: function() {
            this.decreaseBtn.removeAttr('disabled');
        },

        /**
         * @description Method for disable decrease button if quantity == 1 when page is just loaded.
         */
        _minQtyChecker: function() {
            if (this._getQnty() == 1) {
                this._disableButton();
            }
        },

        triggerChangeInput: function () {
            this.qtyInput.trigger('change');
        }



    });

    return $.mage.qtyManager;
});
