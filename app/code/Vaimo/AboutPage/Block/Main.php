<?php
/**
 * Created by PhpStorm.
 * User: konstantin
 * Date: 2019-10-29
 * Time: 12:27
 */

namespace Vaimo\AboutPage\Block;
use Magento\Framework\View\Element\Template;

class Main extends \Magento\Framework\View\Element\Template
{
    public function __construct(\Magento\Framework\View\Element\Template\Context $context)
    {
        parent::__construct($context);
    }

    public function main()
    {
        return __('Main Block');
    }
}