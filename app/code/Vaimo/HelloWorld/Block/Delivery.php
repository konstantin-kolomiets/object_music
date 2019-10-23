<?php
/**
 * Created by PhpStorm.
 * User: konstantin
 */

namespace Vaimo\HelloWorld\Block;
use Magento\Framework\View\Element\Template;
class Delivery extends \Magento\Framework\View\Element\Template
{
    public function __construct(\Magento\Framework\View\Element\Template\Context $context)
    {
        parent::__construct($context);
    }

    public function deliveryDisplay()
    {
        return __('Delivery');
    }
}