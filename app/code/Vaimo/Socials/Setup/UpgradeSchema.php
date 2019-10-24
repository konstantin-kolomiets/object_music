<?php

namespace Vaimo\Socials\Setup;

use Magento\Framework\Setup\UpgradeSchemaInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\Setup\ModuleContextInterface;

class UpgradeSchema implements UpgradeSchemaInterface
{
    public function upgrade(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();
        $tableNameItems = $setup->getTable('vaimo_socials');

        if (version_compare($context->getVersion(), '1.0.1') < 0) {
            if ($setup->getConnection()->isTableExists($tableNameItems) == true) {
                $columns = [
                    'icon' => [
                        'type' => \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
                        'nullable' => true,
                        'comment' => 'Icon',
                    ],
                    'alt_text' => [
                        'type' => \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
                        'nullable' => true,
                        'comment' => 'Icon Alt Text',
                    ]
                ];

                $connection = $setup->getConnection();
                foreach ($columns as $name => $definition) {
                    $connection->addColumn($tableNameItems, $name, $definition);
                }
            }
        }

        $setup->endSetup();
    }
}