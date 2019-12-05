/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
'jquery',
'underscore',
'mage/template',
'text!Vaimo_QtyManager/template/qty-template.html',
'jquery/ui'
   ], function ($, _, template, qtyTemplate) {
    'use strict';

    $.widget('mage.qtyManager', {
        _create: function () {
            this._constructorBlock();
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
        },

        /**
         * @description Method for decrease and increase events.
         */
        _bind: function () {
            var self = this;
            this.block.on('click', '[data-qty=decrease]', function (e) {
                e.preventDefault();
                self._decreaseQty();
            });
            this.block.on('click', '[data-qty=increase]', function (e) {
                e.preventDefault();
                self._increaseQty();
            });
        },

        /**
         * @description Method for decrease quantity.
         */
        _decreaseQty: function() {
            var newQty = this._getQnty() - 1;
            if (newQty < 1) {
                newQty = 1;
                this._disableButton();
            }
            this._setQty(newQty);
        },

        /**
         * @description Method for increase quantity.
         */
        _increaseQty: function() {
            var newQty = this._getQnty() + 1;
            if (newQty > 1) {
                this._enableButton();
            }
            this._setQty(newQty);
        },

        /**
         * @description Method for add disable attribute for decrease button.
         */
        _disableButton: function() {
            this.decreaseBtn.attr('disable', 'true');
        },

        /**
         * @description Method for remove disable attribute for decrease button.
         */
        _enableButton: function() {
            this.decreaseBtn.attr('disable', 'false');
        }

    });

    return $.mage.qtyManager;
});
