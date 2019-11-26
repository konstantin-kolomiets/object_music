/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
   'jquery',
   'underscore',
   'Magento_Customer/js/customer-data',
   'Magento_Catalog/js/product/view/product-ids-resolver',
   'mage/template',
   'text!Magento_Catalog/template/modal.html'
], function ($, _, customerData, idsResolver, template, modalTpl) {
'use strict';

    return function (modalAddToCart) {
        $.widget('mage.catalogAddToCart', modalAddToCart, {
            _create: function () {
                this._super();
                this.subscriptions();
                this.product = {};
            },

            subscriptions: function () {
                customerData.get('cart').subscribe(_.debounce(function (data) {
                    this.filterCartData(data, this.product.productIds);
                }).bind(this), 300);
            },

            filterCartData: function (array, i) {
                const self = this;

                array.items.filter(function(obj) {
                    if(obj.product_id == i){
                        self.product = obj;
                        console.log(self.product);
                        self.showModal();
                    }
                });
            },

            showModal: function () {
                var popup = $('<div class="add-to-cart-dialog">'+ template(modalTpl, this.product) +'</div>');
                console.log(this.product);

                popup.modal({
                    modalClass: 'add-to-cart-popup',
                    buttons: [
                        {
                            text: 'Continue Shopping',
                            click: function () {
                                this.closeModal();
                            }
                        },
                        {
                            text: 'Proceed to Checkout',
                            click: function () {
                                window.location = window.checkout.checkoutUrl
                            }
                        }
                    ]
                });
                popup.modal('openModal');
            },

            _renderForm: function () {
                var form = $(template(modalTpl, this.product));
            },

            /**
             * @param {jQuery} form
             */
            ajaxSubmit: function (form) {
                var self = this,
                    productIds = idsResolver(form),
                    formData = new FormData(form[0]);

                $(self.options.minicartSelector).trigger('contentLoading');
                self.disableAddToCartButton(form);

                $.ajax({
                    url: form.attr('action'),
                    data: formData,
                    type: 'post',
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,

                    /** @inheritdoc */
                    beforeSend: function () {
                        if (self.isLoaderEnabled()) {
                            $('body').trigger(self.options.processStart);
                        }
                    },

                    /** @inheritdoc */
                    success: function (res) {
                        var eventData, parameters;

                        $(document).trigger('ajax:addToCart', {
                            'sku': form.data().productSku,
                            'productIds': productIds,
                            'form': form,
                            'response': res
                        });

                        if (self.isLoaderEnabled()) {
                            $('body').trigger(self.options.processStop);
                        }

                        if (res.backUrl) {
                            eventData = {
                                'form': form,
                                'redirectParameters': []
                            };
                            // trigger global event, so other modules will be able add parameters to redirect url
                            $('body').trigger('catalogCategoryAddToCartRedirect', eventData);

                            if (eventData.redirectParameters.length > 0) {
                                parameters = res.backUrl.split('#');
                                parameters.push(eventData.redirectParameters.join('&'));
                                res.backUrl = parameters.join('#');
                            }

                            self._redirect(res.backUrl);

                            return;
                        }

                        if (res.messages) {
                            $(self.options.messagesSelector).html(res.messages);
                        }

                        if (res.minicart) {
                            $(self.options.minicartSelector).replaceWith(res.minicart);
                            $(self.options.minicartSelector).trigger('contentUpdated');
                        }

                        if (res.product && res.product.statusText) {
                           $(self.options.productStatusSelector)
                               .removeClass('available')
                               .addClass('unavailable')
                               .find('span')
                               .html(res.product.statusText);
                        }
                        self.enableAddToCartButton(form);

                        self.product.productIds = productIds;
                    },

                    /** @inheritdoc */
                    complete: function (res) {
                        if (res.state() === 'rejected') {
                            location.reload();
                        }
                    }
                });
            }
        });

        return $.mage.catalogAddToCart;
    };

});



