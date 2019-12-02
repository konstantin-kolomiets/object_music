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
                    this.filterCartData(data, this.product.productIds, this.product.productOptions);
                }).bind(this), 300);
            },

            filterCartData: function (array, id, options) {
                const self = this;

                array.items.filter(function(obj) {
                    if(obj.product_id === id){
                        if(obj.options.length === 0) {
                            self.modal(self, obj);
                        } else {
                           self.filterOptions(obj, options);
                        }
                    }
                });
            },

            filterOptions: function(obj, options) {
                var optionsLength = 0;
                for(var i = 0; i < options.length; i++) {
                    if (obj.options[i].option_id === options[i].option_id
                        && +obj.options[i].option_value === options[i].option_value) {
                        optionsLength++;
                        if(optionsLength === options.length) {
                            this.modal(this, obj);
                        }
                    }
                }
            },

            modal: function(self, obj) {
                self.product = obj;
                self.showModal();
            },

            showModal: function () {
                var popup = $(template(modalTpl, this.product));
                popup.modal({
                    modalClass: 'add-to-cart-popup',
                    buttons: [
                        {
                            text: 'Continue Shopping',
                            class: 'action',
                            click: function () {
                                this.closeModal();
                            }
                        },
                        {
                            text: 'Proceed to Checkout',
                            class: 'action primary',
                            click: function () {
                                window.location = window.checkout.checkoutUrl
                            }
                        }
                    ]
                });
                popup.modal('openModal');
            },

            /**
             * @param {jQuery} form
             */
            ajaxSubmit: function (form) {
                var self = this,
                    productIds = idsResolver(form),
                    formData = new FormData(form[0]),
                    formDataArray = $(form).serializeArray();

                var optionItems = function getOptions(options) {
                    return options
                        .filter(function(el) {
                            if (el.name.match(/\d+/g)) {
                                return el;
                            }
                        })
                        .map(function(el) {
                            return {
                                option_id: +el.name.match(/\d+/g).toString(),
                                option_value: +el.value
                            }
                        });
                };

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

                        self.product.productIds = productIds[productIds.length-1];
                        self.product.productOptions = optionItems(formDataArray);

                        self.enableAddToCartButton(form);
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



