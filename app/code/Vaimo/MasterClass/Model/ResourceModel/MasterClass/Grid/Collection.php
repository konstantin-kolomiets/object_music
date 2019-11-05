<?php
/**
 * Created by PhpStorm.
 * User: konstantin
 * Date: 2019-11-04
 * Time: 17:48
 */

namespace Vaimo\MasterClass\Model\ResourceModel\MasterClass\Grid;


use Magento\Framework\Api\Search\AggregationInterface;
use Magento\Framework\Api\Search\SearchResultInterface;
use Magento\Framework\View\Element\UiComponent\DataProvider\Document;
use Magento\Framework\Api\SearchCriteriaInterface;

use Vaimo\MasterClass\Model\ResourceModel\MasterClass as ResourceModel;
use Vaimo\MasterClass\Model\ResourceModel\MasterClass\Collection as ElevatorCollection;

class Collection extends ElevatorCollection implements SearchResultInterface
{
    /** @var AggregationInterface */
    protected $aggregations;
    /** @var SearchCriteriaInterface */
    protected $searchCriteria;
    /** {@inheritdoc} */
    public function _construct()
    {
        $this->_init(Document::class, ResourceModel::class);
    }
    /** {@inheritdoc} */
    public function getAggregations()
    {
        return $this->aggregations;
    }
    /** {@inheritdoc} */
    public function setAggregations($aggregations)
    {
        $this->aggregations = $aggregations;
    }
    /** {@inheritdoc} */
    public function getSearchCriteria()
    {
        return $this->searchCriteria;
    }
    /** {@inheritdoc} */
    public function setSearchCriteria(SearchCriteriaInterface $searchCriteria = null)
    {
        $this->searchCriteria = $searchCriteria;
        return $this;
    }
    /** {@inheritdoc} */
    public function getTotalCount()
    {
        return $this->getSize();
    }
    /** {@inheritdoc} */
    public function setTotalCount($totalCount)
    {
        return $this;
    }
    /** {@inheritdoc} */
    public function setItems(array $items = null)
    {
        return $this;
    }
}