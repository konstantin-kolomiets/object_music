/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    deps: [
        'jquery',
        'js/sticky-header'
    ],
    map: {
        '*': {
            'slick': 'js/vendor/slick.min',
            'slider': 'js/component/slider',
            'vendor/responsive-utils': 'js/vendor/responsive-utils',
            'phoneUA': 'js/mixins/validation-mixin',
        }
    },
    // config: {
    //     'mixins': {
    //         'mage/validation' : {
    //             'js/mixins/validation-mixin' : true
    //         },
    //     }
    // }
};
