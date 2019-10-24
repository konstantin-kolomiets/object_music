<?php

namespace Vaimo\Socials\Setup;

use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\DB\Ddl\Table;

class InstallSchema implements InstallSchemaInterface
{

    public function install(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        $installer = $setup;

        $installer->startSetup();

        // Get vaimo_socials table
        $tableName = $installer->getTable('vaimo_socials');

        // Check if the table already exists
        if ($installer->getConnection()->isTableExists($tableName) != true) {

            /**
             * Create table 'vaimo_socials'
             */

            $table = $installer->getConnection()->newTable(
                $tableName
            )->addColumn(
                'id',
                Table::TYPE_INTEGER,
                null,
                ['identity' => true, 'unsigned' => true, 'nullable' => false, 'primary' => true],
                'Item Id'
            )
                ->addColumn('title', Table::TYPE_TEXT, 255, [], 'Item Title')
                ->addColumn('item_url', Table::TYPE_TEXT, 255, ['nullable' => true, 'default' => ''], 'Item URL')
                ->addColumn('sort_order', Table::TYPE_INTEGER, null, ['nullable' => true], 'Item Sort Order')
                ->setComment('Vaimo Socials Table');

            $installer->getConnection()->createTable($table);
        }

        $installer->endSetup();
    }
}