<?php
namespace Vaimo\MusicCheckout\Setup;

use Magento\Customer\Api\AddressMetadataInterface;
use Magento\Eav\Setup\EavSetup;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Eav\Model\Config;

class InstallData implements InstallDataInterface
{
    /**
     * Attribute Code of the Custom Attribute
     */
    const HOUSE = 'house';
    const APARTMENT = 'apartment';
    /**
     * @var EavSetup
     */
    private $eavSetup;
    /**
     * @var Config
     */
    private $eavConfig;

    /**
     * InstallData constructor.
     *
     * @param EavSetup $eavSetup
     * @param Config $config
     */
    public function __construct(
        EavSetup $eavSetup,
        Config $config
    ) {
        $this->eavSetup = $eavSetup;
        $this->eavConfig = $config;
    }
    public function install(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();
        $this->eavSetup->addAttribute(
            AddressMetadataInterface::ENTITY_TYPE_ADDRESS,
            self::HOUSE,
            [
                'label' => 'House number',
                'input' => 'text',
                'visible' => true,
                'required' => false,
                'position' => 101,
                'sort_order' => 101,
                'system' => false
            ]
        );
        $houseAttribute = $this->eavConfig->getAttribute(
            AddressMetadataInterface::ENTITY_TYPE_ADDRESS,
            self::HOUSE
        );
        $houseAttribute->setData(
            'used_in_forms',
            ['adminhtml_customer_address', 'customer_address_edit', 'customer_register_address']
        );
        $houseAttribute->save();

        $this->eavSetup->addAttribute(
            AddressMetadataInterface::ENTITY_TYPE_ADDRESS,
            self::APARTMENT,
            [
                'label' => 'Apartment number',
                'input' => 'text',
                'visible' => true,
                'required' => false,
                'position' => 102,
                'sort_order' => 102,
                'system' => false
            ]
        );
        $apartmentAttribute = $this->eavConfig->getAttribute(
            AddressMetadataInterface::ENTITY_TYPE_ADDRESS,
            self::APARTMENT
        );
        $apartmentAttribute->setData(
            'used_in_forms',
            ['adminhtml_customer_address', 'adminhtml_checkout', 'customer_address_edit', 'customer_register_address']
        );
        $apartmentAttribute->save();

        $setup->endSetup();
    }
}