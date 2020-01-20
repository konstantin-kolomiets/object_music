/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
   'jquery',
], function ($) {
'use strict';
    return function (validator) {
        validator.addRule(
            'phone-ua',
            function (value, params, additionalParams) {
                value = value.replace(/\s+/g, '');
                return $.mage.isEmptyNoTrim(value) || value.length > 9 && value.match(/\+3\(\d{3}\)\d{3}-\d{2}-\d{2}/g);
            },
            $.mage.__("Please specify a valid mobile number with country code example +3(999)999-99-99")
        );
        return validator;
    }
});
