/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
   'jquery',
   'Vaimo_QtyManager/js/qty-manager',
   'Vaimo_QtyManager/js/qty-manager-cart'
], function ($) {
    'use strict';

    $('.input-text.qty').each(function () {
        self = $(this);
        self.qtyManager({
            el: self
        });
    });

    $('.form.form-cart .input-text.qty').each(function () {
        self = $(this);
        self.qtyManagerCart({
            el: self
        });
    });

});