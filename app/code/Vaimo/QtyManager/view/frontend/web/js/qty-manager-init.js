/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

define([
   'jquery',
   'Vaimo_QtyManager/js/qty-manager'
], function ($) {
    'use strict';

    $('.input-text.qty').each(function () {
        var self = $(this);
        self.qtyManager({
            el: self
        });
    });
});
