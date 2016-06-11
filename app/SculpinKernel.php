<?php
use Ramsey\Sculpin\Bundle\CodeBlockBundle\RamseySculpinCodeBlockBundle;
use Sculpin\Bundle\SculpinBundle\HttpKernel\AbstractKernel;

if (!class_exists('SculpinKernel')) {
    class SculpinKernel extends AbstractKernel
    {
        protected function getAdditionalSculpinBundles()
        {
            return [
                RamseySculpinCodeBlockBundle::class,
            ];
        }
    }
}
