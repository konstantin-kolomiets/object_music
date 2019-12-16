/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
   'jquery',
   'Vaimo_QtyManager/js/qty-manager'
], function ($) {
    'use strict';

    $('.input-text.qty').each(function () {
        self = $(this);
        self.qtyManager({
            el: self
        });
    });
});