/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
           'jquery',
           'underscore',
           'jquery/ui',
           'mage/validation'
       ], function ($, _) {
    'use strict';

    $.widget('mage.qtyManagerCart', {
        _create: function () {
            this._constructorBlock();
        },

        /**
         * @description Method for adding increase/decrease buttons template and variable declaration.
         * And replace quantity input to this template.
         */
        _constructorBlock: function () {
            console.log(this);
        },




    });

    return $.mage.qtyManagerCart;
});
