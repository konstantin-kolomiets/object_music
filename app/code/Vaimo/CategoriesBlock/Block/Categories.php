<?php

namespace Vaimo\CategoriesBlock\Block;

class Categories extends \Magento\Framework\View\Element\Template
{
    protected $_categoryHelper;
    protected $categoryFactory;
    protected $_catalogLayer;

    public function __construct(
        \Magento\Catalog\Block\Product\Context $context,
        \Magento\Catalog\Model\CategoryFactory $categoryFactory,
        \Magento\Catalog\Helper\Category $categoryHelper,
        array $data = []
    ) {
        $this->_categoryFactory = $categoryFactory;
        $this->_categoryHelper = $categoryHelper;
        parent::__construct(
            $context,
            $data
        );
    }

    /**
     * Retrieve current store level 2 category
     *
     * @param bool|string $sorted (if true display collection sorted as name otherwise sorted as based on id asc)
     * @param bool $asCollection (if true display all category otherwise display second level category menu visible category for current store)
     * @param bool $toLoad
     */

    public function getStoreCategories($sorted = false, $asCollection = false, $toLoad = true)
    {
        return $this->_categoryHelper->getStoreCategories($sorted , $asCollection, $toLoad);
    }
    public function getCategorymodel($id)
    {
        $_category = $this->_categoryFactory->create();
        $_category->load($id);
        return $_category;
    }

}