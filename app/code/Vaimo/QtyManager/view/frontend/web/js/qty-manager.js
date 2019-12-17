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
            this._qtyChecker();
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
            this._qtyChecker();
            this.triggerChangeInput();
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
            }
            this._setQty(newQty);
        },

        /**
         * @description Method for increase quantity.
         */
        _increaseQty: function() {
            let newQty = this._getQnty() + 1;
            this._setQty(newQty);
        },

        /**
         * @description Method for validate quantity.
         */
        _isValidQtyUpdate: function () {
            let newQty = this._getQnty();
            if (newQty <= 1) {
                newQty = 1;
            }
            this._setQty(newQty);
        },

        /**
         * @description Method for disable decrease button if quantity == 1 when page is just loaded.
         */
        _qtyChecker: function() {
            if (this._getQnty() <= 1) {
                this._disableButton();
            } else {
                this._enableButton();
            }
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
         * @description Method for input change trigger simulation.
         */
        triggerChangeInput: function () {
            this.qtyInput.trigger('change');
        }
    });

    return $.mage.qtyManager;
});
