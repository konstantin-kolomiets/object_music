<?php
/**
 * Copyright © 2019 Vaimo. All rights reserved.
 * See COPYING.txt for license details.
 */

namespace Vaimo\GuitareMaterial\Model\Attribute\Source;

class Material extends \Magento\Eav\Model\Entity\Attribute\Source\AbstractSource
{
    /**
     * Get all options
     * @return array
     */
    public function getAllOptions()
    {
        if (!$this->_options) {
            $this->_options = [
                ['label' => __('Tree'), 'value' => 'tree'],
                ['label' => __('Metal'), 'value' => 'metal'],
                ['label' => __('Plastic'), 'value' => 'plastic'],
            ];
        }
        return $this->_options;
    }
}
