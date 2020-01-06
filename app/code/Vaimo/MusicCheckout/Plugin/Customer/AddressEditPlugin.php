<?php
namespace Vaimo\MusicCheckout\Plugin\Customer;

use Magento\Framework\View\LayoutInterface;

class AddressEditPlugin
{
    /**
     * @var LayoutInterface
     */
    private $layout;

    /**
     * AddressEditPlugin constructor.
     * @param LayoutInterface $layout
     */
    public function __construct(
        LayoutInterface $layout
    ) {
     $this->layout = $layout;
    }

    /**
     * @param \Magento\Customer\Block\Address\Edit $edit
     * @param string $result
     * @return string
     */
    public function afterGetNameBlockHtml(
        \Magento\Customer\Block\Address\Edit $edit,
        $result
    ) {
        $houseApartmentBlock = $this->layout->createBlock(
            'Vaimo\MusicCheckout\Block\Customer\Address\Form\Edit\HouseApartment',
            'musiccheckout_houseapartment_attribute'
        );
        return $result . $houseApartmentBlock->toHtml();
    }
}
