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
   'text!Magento_Catalog/template/modal.html',
   'text!Magento_Catalog/template/default-modal.html',
   'Magento_Ui/js/modal/modal',
], function ($, _, customerData, idsResolver, template, modalTpl, defaultModalTpl) {
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
                    this.filterCartData(data, this.product.productId, this.product.productOptions, this.product.productSKU);
                }, 300).bind(this));
            },

            filterCartData: function (array, id, options, sku) {
                const self = this;
                array.items.filter(function(obj) {
                    if(obj.product_type === "simple" || obj.product_type === "configurable"){
                        if(obj.product_id === id) {
                            if(obj.options.length === 0) {
                                self.modal(obj);
                            } else {
                                self.filterOptions(obj, options);
                            }
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
                            this.modal(obj);
                        }
                    }
                }
            },

            modal: function(obj) {
                this.product = obj;
                this.showModal(modalTpl, this.product);
            },

            defaultModal: function() {
                var info = {
                    product_name: 'product name'
                }
                this.showModal(defaultModalTpl, info);
            },

            showModal: function (tpl, data) {
                var popup = $(template(tpl, data));
                popup.modal({
                    // type: 'slide',
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

                var getProductId = function (arr) {
                    var idArray = arr
                        .filter(function (el) {
                            if (el.name === "product") {
                                return el;
                            }
                        });
                    var result = idArray[0].value;
                    return result ? result : null; // or undefined
                };

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
                        // self.cartItems = customerData.get('cart')().items;
                        // console.log(self.cartItems);
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

                        // self.cartItems = customerData.get('cart')().items;
                        self.product.productOptions = optionItems(formDataArray);
                        self.product.productId = getProductId(formDataArray);
                        self.product.productSKU = form.data().productSku;

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



