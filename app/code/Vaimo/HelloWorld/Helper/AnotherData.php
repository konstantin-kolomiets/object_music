<?php

namespace Vaimo\HelloWorld\Helper;

class AnotherData extends \Vaimo\HelloWorld\Helper\Data
{
    protected $string;

    public function __construct(string $mystring)
    {
       $this->string = $mystring;
    }

    public function sayHello() {
        return $this->string;
    }
}