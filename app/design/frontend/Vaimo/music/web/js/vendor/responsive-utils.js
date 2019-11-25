/**
 * Copyright (c) Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

/**
 * If you using debounce function, the
 * @param $
 * @returns {{currentGrid: string}}
 */

define([
           'jquery'
       ], function ($) {
    'use strict';
    // $(window).width() incorrect on tablet Chrome
    var $window = $(window),
        responsiveGrid = {currentGrid: ""},
        timeout = null;

    function getCurrentGrid() {
        var viewportWidth = window.innerWidth || parseInt($window.width());

        if (viewportWidth >= 1024) {
            //Large devices - Desktops
            responsiveGrid.currentGrid = 'desktop';
        } else if (viewportWidth >= 768) {
            //Small devices - Tablets
            responsiveGrid.currentGrid = 'tablet';
        } else {
            //Extra small devices - Phones
            responsiveGrid.currentGrid = 'mobile';
        }
    }

    //rebound function
    function onResize() {
        clearTimeout(timeout);
        timeout = setTimeout(getCurrentGrid, 200);
    }

    getCurrentGrid();
    $window.on("resize", onResize);

    return responsiveGrid;
});