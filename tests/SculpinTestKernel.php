<?php
class SculpinKernelTest extends PHPUnit_Framework_TestCase
{
    public function testGetAdditionalSculpinBundles()
    {
        $kernel = new SculpinKernel('', '');
        $reflection = new ReflectionObject($kernel);
        $method = $reflection->getMethod('getAdditionalSculpinBundles');
        $method->setAccessible(true);
        $this->assertInternalType('array', $method->invoke($kernel));
    }
}
