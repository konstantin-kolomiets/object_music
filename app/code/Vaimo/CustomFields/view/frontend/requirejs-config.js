/**
* @author Vaimo
* Copyright © Magento, Inc. All rights reserved.
* See COPYING.txt for license details.
* @package Vaimo_CustomFields
*/

var config = {
   config: {
       mixins: {
           'Magento_Checkout/js/view/shipping': {
               'Vaimo_CustomFields/js/view/shipping': true
           }
       }
   },
   "map": {
       "*": {
           "Magento_Checkout/js/model/shipping-save-processor/default" : "Vaimo_CustomFields/js/shipping-save-processor"
       }
   }
};
