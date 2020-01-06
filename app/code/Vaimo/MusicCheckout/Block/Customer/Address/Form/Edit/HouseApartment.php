<?php

namespace Vaimo\MusicCheckout\Block\Customer\Address\Form\Edit;

use Magento\Customer\Api\AddressRepositoryInterface;
use Magento\Customer\Api\Data\AddressInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\View\Element\Template;
use Magento\Customer\Api\Data\AddressInterfaceFactory;
use Magento\Customer\Model\Session;

class HouseApartment extends Template
{
    /**
     * @var AddressInterface
     */
    private $address;
    /**
     * @var AddressRepositoryInterface
     */
    private $addressRepository;
    /**
     * @var AddressInterfaceFactory
     */
    private $addressFactory;
    /**
     * @var Session
     */
    private $customerSession;

    /**
     * @param Template\Context $context
     * @param AddressRepositoryInterface $addressRepository
     * @param AddressInterfaceFactory $addressFactory
     * @param Session $session
     * @param array $data
     */
    public function __construct(
        Template\Context $context,
        AddressRepositoryInterface $addressRepository,
        AddressInterfaceFactory $addressFactory,
        Session $session,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->addressRepository = $addressRepository;
        $this->addressFactory = $addressFactory;
        $this->customerSession = $session;
    }

    protected function _prepareLayout()
    {
        $addressId = $this->getRequest()->getParam('id');

        if($addressId) {
            try {
                $this->address = $this -> addressRepository->getById($addressId);
                if ($this->address->getCustomerId() != $this->customerSession->getCustomerId()) {
                    $this->address = null;
                }
            } catch (NoSuchEntityException $exception) {
                $this->address = null;
            }
        }

        if (null === $this->address) {
            $this->address = $this->addressFactory->create();
        }

        return parent::_prepareLayout();
    }

    protected function _toHtml()
    {
        $houseApartmentWidgetBlock = $this->getLayout()->createBlock(
          'Vaimo\MusicCheckout\Block\Customer\Widget\HouseApartment'
        );
        $houseApartmentWidgetBlock->setAddress($this->address);
        return $houseApartmentWidgetBlock->toHtml();
    }
}