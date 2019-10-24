<?php
/**
 * Copyright © 2019 Vaimo. All rights reserved.
 * See COPYING.txt for license details.
 */

namespace Vaimo\GuitareMaterial\Model\Attribute\Backend;

class Material extends \Magento\Eav\Model\Entity\Attribute\Backend\AbstractBackend
{
    /**
     * Validate
     * @param \Magento\Catalog\Model\Product $object
     * @throws \Magento\Framework\Exception\LocalizedException
     * @return bool
     */
    public function validate($object)
    {
        $value = $object->getData($this->getAttribute()->getAttributeCode());
        if ( ($object->getAttributeSetId() == 10) && ($value == 'metal')) {
            throw new \Magento\Framework\Exception\LocalizedException(
                __('Bottom can not be metal.')
            );
        }
        return true;
    }
}
