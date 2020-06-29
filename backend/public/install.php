<?php

if (file_exists(__DIR__.'/../install.php') && ! file_exists(__DIR__.'/../.env')) {
    $validInstallationUrlRewrite = true;

    require __DIR__.'/../install.php';

    return;
}

if (! file_exists(__DIR__.'/../vendor/autoload.php')) {
    exit('You need to install Azuriom with the installer or manually download the dependencies.');
}

$scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'];
$path = ! empty($_SERVER['REQUEST_URI']) ? explode('?', $_SERVER['REQUEST_URI'])[0] : '';
$uri = "{$scheme}://{$host}{$path}";

header('Location: '.str_replace(basename(__FILE__), '', $uri));
