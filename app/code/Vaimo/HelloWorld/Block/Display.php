<?php

namespace Vaimo\HelloWorld\Block;

class Display extends \Magento\Framework\View\Element\Template
{
    private $productFactory;
    protected $_productRepository;
    protected $helper;
    protected $anotherHelper;

    public function __construct(
        \Vaimo\HelloWorld\Helper\Data $helper,
        \Vaimo\HelloWorld\Helper\Data $anotherHelper,
        \Magento\Framework\View\Element\Template\Context $context,
//        \Magento\Backend\Block\Template\Context $context,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        \Magento\Catalog\Model\ProductFactory $productFactory,
        array $data = []
    )
    {
        $this->productFactory = $productFactory;
        $this->_productRepository = $productRepository;
        $this->helper = $helper;
        $this->anotherHelper = $anotherHelper;
        parent::__construct($context, $data);
    }

    public function sayHello()
    {
        return $this->helper->sayHello();
    }

    public function anotherSayHello()
    {
        return $this->anotherHelper->sayHello();
    }

    public function getProductById($id)
    {
        return $this->_productRepository->getById($id);
    }

    public function getProductBySku($sku)
    {
        return $this->_productRepository->get($sku);
    }

    public function getProductBySkuWithFactory($sku)
    {
        $product = $this->productFactory->create();
        return $product->loadByAttribute('sku', $sku);
    }
}