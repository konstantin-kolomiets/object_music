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
            $('.fotorama').slick();
        }
   });

    return $.vaimo.slider;
});
