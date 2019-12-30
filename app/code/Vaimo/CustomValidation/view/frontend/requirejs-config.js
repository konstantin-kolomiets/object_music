/**
 * Copyright © Vaimo, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

var config = {
    config: {
        mixins: {
            'mage/validation': {
                'Vaimo_CustomValidation/js/validation-phone-ua': true
            },
            'Magento_Ui/js/lib/validation/validator': {
                'Vaimo_CustomValidation/js/ui-validation-phone-ua': true
            }
        }
    }
};
