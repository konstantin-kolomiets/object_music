/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
   'jquery',
   'jquery/ui',
   'slick'
], function ($) {
    'use strict';

    /**
     * Breadcrumb Widget.
     */
    $.widget('vaimo.slider', {

        /** @inheritdoc */
        _init: function () {
            $('.banner').slick({
               'prevArrow': '<button type="button" class="slick-next"></button>',
               'nextArrow': '<button type="button" class="slick-prev"></button>'
            });
        }
   });

    return $.vaimo.slider;
});
