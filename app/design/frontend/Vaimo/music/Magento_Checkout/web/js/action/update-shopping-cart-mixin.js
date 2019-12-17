/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

define([
   'Magento_Ui/js/modal/alert',
   'jquery',
   'jquery/ui',
   'mage/validation',
   'Vaimo_QtyManager/js/update-row-price'
], function (alert, $) {
    'use strict';

    return function (updateCartTotals) {
        $.widget('mage.updateShoppingCart', updateCartTotals, {

            /** @inheritdoc */
            _create: function () {
                this._super();
                this.qtyManagerCartInit();
            },

            /**
             * Init method for updating product totals when quantity was changed.
             */
            qtyManagerCartInit: function(){
                $('.form.form-cart .input-text.qty').updateRowPrice();
            },

            /**
             * Prevents default submit action and calls form validator.
             *
             * @param {Event} event
             * @return {Boolean}
             */
            onSubmit: function (event) {
                var action = this.element.find(this.options.updateCartActionContainer).val();

                if (!this.options.validationURL || action === 'empty_cart') {
                    return true;
                }
                this.options.validationURL = this.element.attr('action');

                if (this.isValid()) {
                    event.preventDefault();
                    this.validateItems(this.options.validationURL, this.element.serialize());
                }

                return false;
            },

            /**
             * Validates requested form.
             *
             * @return {Boolean}
             */
            isValid: function () {
                return this.element.validation() && this.element.validation('isValid');
            },

            /**
             * Validates updated shopping cart data.
             *
             * @param {String} url - request url
             * @param {Object} data - post data for ajax call
             */
            validateItems: function (url, data) {
                $.extend(data, {
                    'form_key': $.mage.cookies.get('form_key')
                });

                $.ajax({
                   url: url,
                   data: data,
                   type: 'post',
                   dataType: 'json',
                   context: this,

                   /** @inheritdoc */
                   beforeSend: function () {
                       $(document.body).trigger('processStart');
                   },

                   /** @inheritdoc */
                   complete: function () {
                       $(document.body).trigger('processStop');
                   }
                })
                .done(function (response) {
                    if (response.success) {
                        this.onSuccess();
                    } else {
                        this.onError(response);
                    }
                })
                .fail(function () {
                    // this.submitForm();
                });
            },

            /**
             * Form validation succeed.
             */
            onSuccess: function () {
                $(document).trigger('ajax:' + this.options.eventName);
                // this.submitForm();
            }

        });

        return $.mage.updateShoppingCart;
    }
});
