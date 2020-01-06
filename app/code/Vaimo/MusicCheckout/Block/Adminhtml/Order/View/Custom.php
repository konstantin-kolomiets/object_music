<?php
namespace Vaimo\MusicCheckout\Block\Adminhtml\Order\View;

use Magento\Checkout\Api\Data\ShippingInformationInterface;
use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;

class Custom extends Template {

    /**
     * @var ShippingInformationInterface
     */
    private $_addressInformation;

    /**
     * Custom constructor.
     *
     * @param Context $context
     * @param ShippingInformationInterface $addressInformation
     * @param array $data
     */
    public function __construct(
        Context $context,
        ShippingInformationInterface $addressInformation,
        array $data = []
    ) {
        $this->_addressInformation = $addressInformation;
        parent::__construct($context, $data);
    }

    /**
     * Get custom Shipping Charge
     *
     * @return String
     */
    public function getShippingCharge()
    {
        $extAttributes = $this->_addressInformation->getExtensionAttributes();
        if (!empty($extAttributes)) {
            return $attributeValue = $extAttributes->getCustomField();
        }

        return 'false';
        // return $extAttributes; //get custom attribute data.
    }
}