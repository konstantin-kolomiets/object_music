/**
 * Copyright (c) Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

define([
           'jquery',
           'vendor/responsive-utils'
       ], function ($, util) {
    'use strict';

    $(document).ready(function () {

        // Apply sticky header on every pages except checkout page
        if (!$('body.checkout-index-index').length) {

            var $pageWrapper = $('.page-wrapper'),
                $pageHeader = $pageWrapper.find('.page-header'),
                $headerHeight = $pageHeader.outerHeight(),
                isScrolled = false,
                debounceTime = 0;

            var enableStickyHeader = function () {
                // Add sticky-header class
                $pageWrapper.addClass('sticky-header');
                isScrolled = true;

                // if (util.currentGrid == 'desktop') {
                // }
                // Add margin for whole page
                // $pageWrapper.css('margin-top', $headerHeight);

                $('body').addClass('sticky-header');

                // Update header height because it has different size
                $headerHeight = $pageHeader.outerHeight();
            };

            var disableStickyHeader = function () {
                // Remove sticky-header class
                $pageWrapper.removeClass('sticky-header');
                isScrolled = false;

                // Reupdate the header height
                $headerHeight = $pageHeader.outerHeight();

                // Remove margin for page
                // $pageWrapper.removeAttr('style');

                $('body').removeClass('sticky-header');
            };

            // On resize handler
            var debounceTimerResize;

            $(window).resize(function () {
                if (debounceTimerResize) {
                    window.clearTimeout(debounceTimerResize);
                }

                debounceTimerResize = window.setTimeout(function () {

                    // Reupdate the header height
                    $headerHeight = $pageHeader.outerHeight();

                    // Get current scroll top position
                    var $scrollTop = $(window).scrollTop();

                    if ($scrollTop >= $headerHeight) {
                        enableStickyHeader();

                    } else {
                        disableStickyHeader();
                    }

                }, debounceTime);
            });

            // On scrolling handler
            var debounceTimerScroll;

            $(window).scroll(function () {

                if (debounceTimerScroll) {
                    window.clearTimeout(debounceTimerScroll);
                }

                debounceTimerScroll = window.setTimeout(function () {

                    var $scrollTop = $(window).scrollTop();

                    if ($scrollTop >= $headerHeight && !isScrolled  && !($('html.search-opened').length)) {
                        enableStickyHeader();
                    }

                    if ($scrollTop < $headerHeight && isScrolled) {
                        disableStickyHeader();
                    }

                }, debounceTime);

            });
        }

    });

});