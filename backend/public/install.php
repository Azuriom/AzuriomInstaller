<?php

if (! file_exists(__DIR__.'/../.env')) {
    if (! file_exists(__DIR__.'/../install.php')) {
        exit('The Azuriom installer is not installed properly.');
    }

    $validInstallationUrlRewrite = true;

    require __DIR__.'/../install.php';

    return;
}

if (! file_exists(__DIR__.'/../vendor/autoload.php')) {
    exit('Azuriom is not installed but the file .env already exists. You need to delete it to continue the installation. You might need to enable hidden files in some FTP clients like WinSCP.');
}

$scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'];
$path = ! empty($_SERVER['REQUEST_URI']) ? explode('?', $_SERVER['REQUEST_URI'])[0] : '';
$uri = "{$scheme}://{$host}{$path}";

header('Location: '.str_replace(basename(__FILE__), '', $uri));
