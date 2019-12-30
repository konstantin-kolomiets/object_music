<?php

namespace Vaimo\CustomFields\Observer;

/**
* Class SaveCustomFieldsInOrder
* @package Vaimo\CustomFields\Observer
*/
class SaveCustomFieldsInOrder implements \Magento\Framework\Event\ObserverInterface
{
   /**
    * @param \Magento\Framework\Event\Observer $observer
    * @return $this
    */
   public function execute(\Magento\Framework\Event\Observer $observer)
  {

     $order = $observer->getEvent()->getOrder();
     $quote = $observer->getEvent()->getQuote();

       $order->setData("input_custom_shipping_field",$quote->getInputCustomShippingField());
       $order->setData("date_custom_shipping_field",$quote->getDateCustomShippingField());
       $order->setData("select_custom_shipping_field",$quote->getSelectCustomShippingField());

     return $this;
  }
}
