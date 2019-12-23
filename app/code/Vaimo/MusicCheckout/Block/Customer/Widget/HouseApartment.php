<?php
/**
 * Created by PhpStorm.
 * User: konstantin
 * Date: 2019-12-23
 * Time: 11:16
 */

namespace Vaimo\MusicCheckout\Block\Customer\Widget;

use Magento\Customer\Api\AddressMetadataInterface;
use Magento\Customer\Api\Data\AddressInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\View\Element\Template;

class HouseApartment extends Template
{
    /**
     * @var AddressMetadataInterface
     */
    private $addressMetadata;

    public function __construct(
        Template\Context $context,
        AddressMetadataInterface $addressMetadata,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->addressMetadata = $addressMetadata;
    }

    protected function _construct()
    {
        parent::_construct();
        $this->setTemplate('widget/house-apartment.phtml');
    }

    /**
     * @return bool
     */
    public function isRequired($val) {
        return $this->getAttribute($val)
            ? $this->getAttribute($val)->isRequired()
            : false;
    }

    /**
     * @return string
     */
    public function getFieldId($val) {
        return $val;
    }

    /**
     * @return \Magento\Framework\Phrase\string
     */
    public function getFieldLabel($val) {
        return $this->getAttribute($val)
            ? $this->getAttribute($val)->getFrontendLabel()
            : __($val);
    }

    /**
     * @return string
     */
    public function getFieldName($val) {
        return $val;
    }

    /**
     * @return string|null
     */
    public function getValue($val)
    {
        $address = $this->getAddress();
        if ($address instanceof AddressInterface) {
            return $address->getCustomAttribute($val)
                ? $address->getCustomAttribute($val)->getValue()
                : null;
        }
        return null;
    }

    public function getAttribute($val) {
        try {
            $result = $this->addressMetadata->getAttributeMetadata($val);
        } catch (NoSuchEntityException $exception) {
            return null;
        }
        return $result;
    }
}