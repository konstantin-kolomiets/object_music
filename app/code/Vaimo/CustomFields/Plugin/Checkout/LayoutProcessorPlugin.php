<?php

namespace Vaimo\CustomFields\Plugin\Checkout;

use Magento\Checkout\Block\Checkout\LayoutProcessor;

/**
* Class LayoutProcessorPlugin
* @package Vaimo\CustomFields\Plugin\Checkout
*/
class LayoutProcessorPlugin
{
   /**
    * @param LayoutProcessor $subject
    * @param array $jsLayout
    * @return array
    */
   public function afterProcess(
       LayoutProcessor $subject,
       array $jsLayout
   ) {

       $validation['required-entry'] = true;

       $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
       ['shippingAddress']['children']['shipping-address-fieldset']['children']['input_custom_shipping_field'] = [
           'component' => "Magento_Ui/js/form/element/abstract",
           'config' => [
               'customScope' => 'shippingAddress',
               'template' => 'ui/form/field',
               'elementTmpl' => "ui/form/element/input",
               'id' => "input_custom_shipping_field"
           ],
           'dataScope' => 'shippingAddress.custom_shipping_field[input_custom_shipping_field]',
           'label' => "Test input",
           'provider' => 'checkoutProvider',
           'visible' => true,
           'validation' => $validation,
           'sortOrder' => 2,
           'id' => 'custom_shipping_field[input_custom_shipping_field]'
       ];

       $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
       ['shippingAddress']['children']['shipping-address-fieldset']['children']['date_custom_shipping_field'] = [
           'component' => "Magento_Ui/js/form/element/date",
           'config' => [
               'customScope' => 'shippingAddress',
               'template' => 'ui/form/field',
               'elementTmpl' => "ui/form/element/date",
               'id' => "date_custom_shipping_field"
           ],
           'dataScope' => 'shippingAddress.custom_shipping_field[date_custom_shipping_field]',
           'label' => "Date Ui component",
           'options' => $this->getOptions(),
           'provider' => 'checkoutProvider',
           'visible' => true,
           'validation' => $validation,
           'sortOrder' => 4,
           'id' => 'custom_shipping_field[date_custom_shipping_field]'
       ];

       $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
       ['shippingAddress']['children']['shipping-address-fieldset']['children']['select_custom_shipping_field'] = [
           'component' => "Magento_Ui/js/form/element/select",
           'config' => [
               'customScope' => 'shippingAddress',
               'template' => 'ui/form/field',
               'elementTmpl' => "ui/form/element/select",
               'id' => "select_custom_shipping_field"
           ],
           'dataScope' => 'shippingAddress.custom_shipping_field[select_custom_shipping_field]',
           'label' => "Select gender",
           'options' => $this->getSelectOptions(),
           'caption' => 'Please select',
           'provider' => 'checkoutProvider',
           'visible' => true,
           'validation' => $validation,
           'sortOrder' => 4,
           'id' => 'custom_shipping_field[select_custom_shipping_field]'
       ];

       return $jsLayout;
   }

   /**
    * @return array
    */
   protected function getOptions()
   {
       $options = [
           'dateFormat' => 'm/d/Y',
           "timeFormat" => 'HH:mm',
           "showsTime" => true
       ];

       return $options;
   }

   protected function getSelectOptions()
   {
       $items[1]["value"] = "male";
       $items[1]["label"] = "Male";
      
       $items[2]["value"] = "Female";
       $items[2]["label"] = "female";

       return $items;
   }
}
