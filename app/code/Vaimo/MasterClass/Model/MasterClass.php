<?php

namespace Vaimo\MasterClass\Model;

use Magento\Framework\DataObject\IdentityInterface;
use Magento\Framework\Model\AbstractModel;

class MasterClass extends AbstractModel implements IdentityInterface
{
    const CACHE_TAG = 'vaimo_masterclass_event';

    protected function _construct()
    {
        $this->_init('Vaimo\MasterClass\Model\ResourceModel\MasterClass');
    }

    public function getIdentities()
    {
        return [self::CACHE_TAG . '_' . $this->getId()];
    }
}