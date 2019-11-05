<?php

namespace Vaimo\MasterClass\Model\ResourceModel\MasterClass;

class Collection extends \Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection
{
    protected $_idFieldName = 'vaimo_masterclass_event_id';

    protected function _construct()
    {
        $this->_init('Vaimo\MasterClass\Model\MasterClass','Vaimo\MasterClass\Model\ResourceModel\MasterClass');
    }
}