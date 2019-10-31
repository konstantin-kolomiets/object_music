<?php

namespace Vaimo\HelloWorld\Block;

class Display extends \Magento\Framework\View\Element\Template
{
    protected $productFactory;
    protected $productRepository;
    protected $helper;
    protected $anotherHelper;



    public function __construct(
        \Vaimo\HelloWorld\Helper\Data $helper,
        \Vaimo\HelloWorld\Helper\Data $anotherHelper,
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        \Magento\Catalog\Model\ProductFactory $productFactory,
        array $data = []
    )
    {
        $this->productFactory = $productFactory;
        $this->productRepository = $productRepository;
        $this->helper = $helper;
        $this->anotherHelper = $anotherHelper;
        parent::__construct($context, $data);
    }

    public  function changeProduct (){
//        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
//        $_productFactory = $objectManager->get('\Magento\Catalog\Model\ProductFactory');
//        $product = $_productFactory->create()->load(23);
        $storeId = '0'; //Store ID
        $product_id = 23;
        $product = $this->productFactory->create()->setStoreId($storeId)->load($product_id);
//        $product = $this->productFactory->create();
//        $product->load(23);
//        $product->setData('price', '179.99')->save();
        $product
            ->setName('New Name')
            ->setShortDescription('Custom Short Description Proceedings make-up Taylor to justify. ')
            ->save();


        $product3 = $this->productRepository->get('product_dynamic_23');
        $product3->setPrice('139.99');
        $this->productRepository->save($product3);
    }

    public function sayHello() {
        return $this->helper->sayHello();
    }

    public function anotherSayHello() {
        return $this->anotherHelper->sayHello();
    }

    public function getProductById($id) {
        return $this->productRepository->getById($id);
    }

    public function getProductBySku($sku) {
        return $this->productRepository->get($sku);
    }

    public function getProductBySkuWithFactory($sku) {
        $product = $this->productFactory->create();
        return $product->loadByAttribute('sku', $sku);
    }

}

// for all stores:
// protected $storeManager;
// protected $storeViewId = null;
// \Magento\Store\Model\StoreManagerInterface $storeManager,
// $this->storeManager = $storeManager;
//  if ($storeViewId = $this->storeManager->getStore()->getId()) {
//            $this->storeViewId = $storeViewId;
//        }
//$storeIds = array_keys($this->storeManager->getStores());
////activate products
//$updateAttributes['status'] = \Magento\Catalog\Model\Product\Attribute\Source\Status::STATUS_ENABLED;
//foreach ($storeIds as $storeId) {
//    $this->productAction->updateAttributes($productIdsActivate, $updateAttributes, $storeId);
//}