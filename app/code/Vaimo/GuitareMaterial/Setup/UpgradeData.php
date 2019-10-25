<?php
/**
 * Created by PhpStorm.
 * User: kostiantyn
 * Date: 2019-10-25
 * Time: 12:49
 */
namespace Vaimo\GuitareMaterial\Setup;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\UpgradeDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
class UpgradeData implements UpgradeDataInterface
{
    private $eavSetupFactory;
    public function __construct(EavSetupFactory $eavSetupFactory)
    {
        $this->eavSetupFactory = $eavSetupFactory;
    }
    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();
        if (version_compare($context->getVersion(), '1.0.3','<')) {
        $eavSetup = $this->eavSetupFactory->create(['setup' => $setup]);
        $eavSetup->removeAttribute(
            \Magento\Catalog\Model\Product::ENTITY,
            'guitare_material');
        $eavSetup->addAttribute(
            \Magento\Catalog\Model\Product::ENTITY,
            'guitare_material',
            [
                'guitare_material' => 'int',
                'select' => '',
                'source' => \Vaimo\GuitareMaterial\Model\Attribute\Source\Material::class,
                'frontend' => '',
                'label' => 'Guitare Material',
                  'input' => 'select',
                  'class' => '',
                  'global' => \Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface::SCOPE_GLOBAL,
                  'visible' => true,
                  'required' => false,
                  'user_defined' => false,
                  'default' => '1',
                  'searchable' => false,
                  'filterable' => false,
                  'comparable' => false,
                  'visible_on_front' => false,
                  'used_in_product_listing' => true,
                  'unique' => false,
                  'apply_to' => ''
              ]
          );
      }
       $setup->endSetup();
   }
}