<?php
namespace Vaimo\Socials\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Magento\Framework\App\Config\ScopeConfigInterface;
class Socials extends Template
{
    const SOCIAL_FACEBOOK      = 'vaimo_socials/social_item/social_facebook';
    const SOCIAL_INSTAGRAM     = 'vaimo_socials/social_item/social_instagram';
    const SOCIAL_YOUTUBE    = 'vaimo_socials/social_item/social_youtube';
    const SOCIAL_TELEGRAM    = 'vaimo_socials/social_item/social_telegram';
    const SOCIAL_VIBER     = 'vaimo_socials/social_item/social_viber';
    private $scopeConfig;
    public function __construct(ScopeConfigInterface $scopeConfig, Context $context, array $data = [])
    {
        $this->scopeConfig = $scopeConfig;
        parent::__construct($context, $data);
    }
    public function getScoupeConfig()
    {
        $result['social_facebook'] = $this->scopeConfig->getValue($this::SOCIAL_FACEBOOK);
        $result['social_instagram'] = $this->scopeConfig->getValue($this::SOCIAL_INSTAGRAM);
        $result['social_youtube'] = $this->scopeConfig->getValue($this::SOCIAL_YOUTUBE);
        $result['social_telegram'] = $this->scopeConfig->getValue($this::SOCIAL_TELEGRAM);
        $result['social_viber'] = $this->scopeConfig->getValue($this::SOCIAL_VIBER);
        return $result;
    }
}