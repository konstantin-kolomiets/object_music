<?php

namespace Vaimo\MasterClass\Controller\Adminhtml\Index;

use Vaimo\MasterClass\Model\MasterClass as Event;


class Delete extends \Magento\Backend\App\Action
{

    const ADMIN_RESOURCE = 'Index';

    protected $resultPageFactory;
    protected $eventFactory;

    public function __construct(
        \Magento\Backend\App\Action\Context $context,
        \Magento\Framework\View\Result\PageFactory $resultPageFactory,
        \Vaimo\MasterClass\Model\MasterClass $eventFactory
    )
    {
        $this->resultPageFactory = $resultPageFactory;
        $this->eventFactory = $eventFactory;
        parent::__construct($context);
    }

    public function execute()
    {
        $id = $this->getRequest()->getParam('id');

        $contact = $this->eventFactory->create()->load($id);

        if(!$contact)
        {
            $this->messageManager->addError(__('Unable to process. please, try again.'));
            $resultRedirect = $this->resultRedirectFactory->create();
            return $resultRedirect->setPath('*/*/', array('_current' => true));
        }

        try{
            $contact->delete();
            $this->messageManager->addSuccess(__('Your master class has been deleted !'));
        }
        catch(\Exception $e)
        {
            $this->messageManager->addError(__('Error while trying to delete master class'));
            $resultRedirect = $this->resultRedirectFactory->create();
            return $resultRedirect->setPath('*/*/index', array('_current' => true));
        }

        $resultRedirect = $this->resultRedirectFactory->create();
        return $resultRedirect->setPath('*/*/index', array('_current' => true));
    }
}
