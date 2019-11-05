<?php

namespace Vaimo\MasterClass\Model\ResourceModel;

class MasterClass extends \Magento\Framework\Model\ResourceModel\Db\AbstractDb
{
    protected function _construct()
    {
        $this->_init('vaimo_masterclass_event','vaimo_masterclass_event_id');
    }
}