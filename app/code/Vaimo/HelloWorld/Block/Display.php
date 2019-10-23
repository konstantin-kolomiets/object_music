<?php
/**
 * Created by PhpStorm.
 * User: konstantin
 * Date: 2019-10-17
 * Time: 16:31
 */

namespace Vaimo\HelloWorld\Block;
use Magento\Framework\View\Element\Template;

class Display extends \Magento\Framework\View\Element\Template
{
    public function __construct(\Magento\Framework\View\Element\Template\Context $context)
    {
        parent::__construct($context);
    }

    public function sayHello()
    {
        return __('Hello World Block');
    }
}