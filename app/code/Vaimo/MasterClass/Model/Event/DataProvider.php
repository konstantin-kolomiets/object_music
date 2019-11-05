<?php

namespace Vaimo\MasterClass\Model\Event;

use Vaimo\MasterClass\Model\ResourceModel\MasterClass\CollectionFactory;
use Vaimo\MasterClass\Model\Event;

class DataProvider extends \Magento\Ui\DataProvider\AbstractDataProvider
{
    protected $collection;
    protected $_loadedData;

    public function __construct(
        $name,
        $primaryFieldName,
        $requestFieldName,
        CollectionFactory $masterclassCollectionFactory,
        array $meta = [],
        array $data = []
    ){
        $this->collection = $masterclassCollectionFactory->create();
        parent::__construct($name, $primaryFieldName, $requestFieldName, $meta, $data);
    }

    public function getData()
    {
        if(isset($this->_loadedData)) {
            return $this->_loadedData;
        }

        $items = $this->collection->getItems();

        foreach($items as $masterclass)
        {
            $this->_loadedData[$masterclass->getId()] = $masterclass->getData();
        }

        return $this->_loadedData;
    }

}
