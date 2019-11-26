/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/*jshint browser:true jquery:true*/
define([
           'jquery',
           'underscore',
           'Magento_Customer/js/customer-data',
           'mage/translate'
       ], function ($, _,customerData, $t) {
    'use strict';

    return function (catalogAddToCart) {
        var prototype = catalogAddToCart.prototype;

        $.widget(prototype.namespace + '.' + prototype.widgetName, catalogAddToCart , {
            options: {
                processStart: 'startAddToCartAjax',
                processStop: 'successAddToCartAjax',
                addToCartSuccess: 'ajax:addToCart',
                contentUpdated: 'contentUpdated',
                classes : {
                    addToCartSuccess: 'added-tocart',
                    qtySwitcher: 'product-view-qty-switch'
                },
                selectors: {
                    itemInfo: '.product-item-info',
                    container: '.product-item-details .product-item-name'
                },
                cacheDataSection: 'last-additional-product-ajax-request',
                addToCartButtonTextDefault: $t('Add to Cart'),
                defaultDeleteText: null
            },
            _create: function () {
                this._super();

                this.isRelatedItem = this.element.data('is-related-item');
                this.isConfigurable = this.element.data('is-configurable');

                if (this.options.bindSubmit && this.isRelatedItem) {
                    this._initRelatedItem();
                }
            },
            _initRelatedItem: function () {
                this.document = $(document);
                this.isDeleteAction = false;
                this.minicart = $('[data-block=\'minicart\']');
                this.cart = customerData.get('cart');
                this.clickTimeout = null;
                this.lastRequest = null;
                this.$selectedOptions = null;

                this.addRemoveItemListener();
                this.addUpdateQtyListener();
                this.cart.subscribe(this.cartSubscriber.bind(this));

                var currentItemsInCart = this.getItemsInCart();
                if (currentItemsInCart.length > 0) {

                    this.toggleFormAction();
                    this.updateState(currentItemsInCart);
                }
                if (this.isConfigurable){

                    this._initConfigurable();
                }

                /*enabled the form after initialization*/
                this.element.find('.action.tocart').removeAttr('disabled');
            },
            _initConfigurable: function () {
                var cart = this.element.find('.tocart.related-configurable-quickview');

                cart.on('click', function(e) {

                    if( this.isDeleteAction ) {
                        /*stop event goes to quickview listener*/
                        e.stopPropagation();
                    }

                }.bind(this));

            },
            updateState: function (currentItemsInCart) {
                if ( currentItemsInCart.length > 0 ){
                    var qty = 0;

                    for (var i = 0; i < currentItemsInCart.length; i++) {
                        var item = currentItemsInCart[i];
                        qty += item.qty;

                        if ( this.isConfigurable && typeof item.options !== 'undefined' ) {
                            this._updateSelectedOptions(item.options);
                        }

                        this.updateDeleteItemIdParams(item);
                    }

                    this.element.find('.input-text.qty').val(qty);
                }
            },
            cartSubscriber: function () {
                var currentItemsInCart = this.getItemsInCart();

                var selectedOptions = this.element.parents(this.options.selectors.itemInfo).find('.selected-options');

                if (this.isConfigurable && selectedOptions.length > 0) {
                    //reset configuration selected options
                    selectedOptions.remove();
                }

                if (currentItemsInCart.length > 0) {
                    this.updateState(currentItemsInCart);
                }
            },
            addRemoveItemListener: function () {
                this.document.on(this.options.addToCartSuccess, function (event, productSku) {

                    if (productSku === this.element.data('product-sku')) {
                        $('.quickview-container.has-product').remove();
                        this.lastRequest = customerData.get(this.options.cacheDataSection)();
                        var isDeleteaction = this.lastRequest && this.lastRequest.action === 'delete';

                        if ( this.lastRequest.productsku === this.element.data('product-sku') && this.isDeleteAction !==  isDeleteaction) {
                            /*same product is added through quickview because isDeleteAction states are different, do not switch state */
                            return;
                        } else {
                            this.toggleFormAction();
                        }
                    }

                }.bind(this));
            },
            /**
             * switching between Add and Delete Action for the form based on current action
             */
            toggleFormAction: function () {

                if (this.isDeleteAction) {

                    this.element.parents('.product-item').removeClass(this.options.classes.addToCartSuccess);
                    this.element.attr('action', this.element.data('add-url'));
                    this.element.find('input[name="item_id"]').remove();
                    this.isDeleteAction = false;

                } else {
                    this.element.parents('.product-item').addClass(this.options.classes.addToCartSuccess);
                    this.element.attr('action', this.element.data('remove-url'));

                    //this will overwrite the button text from enableAddToCartButton function which run everytime the ajax success is made
                    setTimeout(function () {
                        var addToCartButton = this.element.find(this.options.addToCartButtonSelector);
                        var deleteText = this.options.defaultDeleteText || $t('Added to cart');

                        addToCartButton.attr('title', deleteText);
                        addToCartButton.find('span').text(deleteText);

                    }.bind(this), 1050);

                    this.isDeleteAction = true;

                }
            },
            /**
             * Overwrite original to save action from quickview for comparing with original related product
             */
            ajaxSubmit: function (form) {
                if ( form.attr('action') === this.element.data('remove-url') ) {
                    customerData.set(this.options.cacheDataSection, {productsku: this.element.data('product-sku'), action: 'delete', isConfigurable: this.element.data('isConfigurable')});
                } else {
                    customerData.set(this.options.cacheDataSection, {productsku: this.element.data('product-sku'), action: 'add', isConfigurable: this.element.data('isConfigurable')});
                }

                this._super(form);
            },
            /**
             *
             * @returns {Array}
             */
            getItemsInCart: function () {
                var cart = this.cart();

                var param = this.isConfigurable ? {product_id: this.element.data('product-id').toString()} : {product_sku: this.element.data('product-sku').toString()};

                return _.filter(cart.items, param);
            },
            updateDeleteItemIdParams: function (item) {
                if (typeof item !== 'undefined') {
                    this.element.append('<input type="hidden" name="item_id" value="' + item.item_id + '">');
                }
            },
            addUpdateQtyListener: function () {
                this.element.find('.' + this.options.classes.qtySwitcher).on('click', this.qtyClickHandler.bind(this));
                this.element.find('.input-text.qty').on('input', this.qtyClickHandler.bind(this));
            },
            qtyClickHandler: function () {
                clearTimeout(this.clickTimeout);

                this.clickTimeout = setTimeout(function(){
                    // replace with your update code
                    var updateQtyUrl = this.element.data('update-url');
                    var items = this.getItemsInCart();

                    if (items.length > 0) {
                        /*todo implement update qty for multiple options products*/
                        var obj = items[0];

                        var data = {
                            item_id: obj.item_id,
                            item_qty: this.element.find('.input-text.qty').val()
                        };

                        customerData.set(this.options.cacheDataSection, {productsku: this.element.data('product-sku'), action: 'updateQty' });
                        this._ajax(updateQtyUrl, data, this.element, this.qtyClickHandlerCallBack);

                    }
                }.bind(this), 500);
            },
            qtyClickHandlerCallBack: function (elem, response) {
                this.lastRequest = customerData.get(this.options.cacheDataSection)();
                console.log('update Qty');
            },
            /**
             * @param {String} url - ajax url
             * @param {Object} data - post data for ajax call
             * @param {Object} elem - element that initiated the event
             * @param {Function} callback - callback method to execute after AJAX success
             */
            _ajax: function (url, data, elem, callback) {
                $.extend(data, {
                    'form_key': $.mage.cookies.get('form_key')
                });

                $.ajax({
                           url: url,
                           data: data,
                           type: 'post',
                           dataType: 'json',
                           context: this,
                           beforeSend: function () {
                               elem.attr('disabled', 'disabled');
                           },
                           complete: function () {
                               elem.attr('disabled', null);
                           }
                       })
                    .done(function (response) {
                        if (response.success) {
                            callback.call(this, elem, response);
                        } else {
                            var msg = response.error_message;

                            if (msg) {
                                alert(msg);
                            }
                        }
                    })
                    .fail(function (error) {
                        console.log(JSON.stringify(error));
                    });
            },
            _updateSelectedOptions: function (options) {
                var optionsArray = [];

                for (var i = 0; i < options.length; i++) {
                    var obj = options[i];
                    optionsArray.push(obj.value);
                }

                var $container = this.element.parents(this.options.selectors.itemInfo).find(this.options.selectors.container);
                $container.append(('<span class="selected-options">'+ optionsArray.join(', ') +'</span>'));
            }
        });

        return $[prototype.namespace][prototype.widgetName];
    };
});