define([
   'jquery',
   'jquery/ui',
   'jquery/validate',
   'mage/translate',
], function ($) {
'use strict';

    return function () {
        $.validator.addMethod(
            'phone-ua',
            function (phoneNumber, element) {
                phoneNumber = phoneNumber.replace(/\s+/g, '');
                return this.optional(element) || phoneNumber.length > 9 &&
                       phoneNumber.match(/\+3\(\d{3}\)\d{3}-\d{2}-\d{2}/g);
            },
            $.mage.__('Please specify a valid mobile number with country code example +3(999)999-99-99')
        );
    }
});
