<?php

namespace Vaimo\HelloWorld\Block;

class Display extends \Magento\Framework\View\Element\Template
{
    protected $helper;
    protected $anotherHelper;

    public function __construct(
        \Vaimo\HelloWorld\Helper\Data $helper,
        \Vaimo\HelloWorld\Helper\Data $anotherHelper,
        \Magento\Framework\View\Element\Template\Context $context,
        array $data = []
    )
    {
        parent::__construct($context, $data);
        $this->helper = $helper;
        $this->anotherHelper = $anotherHelper;
    }

    public function sayHello()
    {
        return $this->helper->sayHello();
    }

    public function anotherSayHello()
    {
        return $this->anotherHelper->sayHello();
    }
}
