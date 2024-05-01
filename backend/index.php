<?php

/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Azuriom</title>
</head>
<body style="font-family: sans-serif; text-align: center; margin-top: 1rem">
<h1>Azuriom - PHP installation issue</h1>
<h2>PHP is not executed</h2>
<p>If you see this page in your browser, it means that PHP is not installed or not configured properly on your server.</p>
<p>On Linux with Apache2 you can try the following command: <code>apt install libapache2-mod-php</code></p>
<p>If you are using another setup, please refer to your web server documentation.</p>
<hr>
<p>This is NOT an issue related to Azuriom.</p>
</body>
</html><!--
*/

/**
 * The Azuriom installer.
 *
 * This file is not a part of Azuriom itself,
 * and can be removed when Azuriom is installed.
 *
 * @author Azuriom
 */
$installerVersion = '1.1.2';

$minPhpVersion = '8.1';

$requiredExtensions = [
    'bcmath', 'ctype', 'json', 'mbstring', 'openssl', 'PDO', 'tokenizer', 'xml', 'xmlwriter', 'curl', 'fileinfo', 'zip',
];

set_error_handler(function ($level, $message, $file = 'unknown', $line = 0) {
    http_response_code(500);
    exit(json_encode(['message' => "A fatal error occurred: {$message} ({$file}:{$line})"]));
});

//
// Some helper functions
//

/**
 * Parse the PHP version to x.x format.
 *
 * @return string
 */
function parse_php_version()
{
    preg_match('/^(\d+)\.(\d+)/', PHP_VERSION, $matches);

    if (count($matches) > 2) {
        return "{$matches[1]}.{$matches[2]}";
    }

    return PHP_VERSION;
}

/**
 * Get an item from an array using "dot" notation.
 *
 * @param  array  $array
 * @param  int|string  $key
 * @param  mixed  $default
 *
 * @return mixed
 */
function array_get($array, $key, $default = null)
{
    if (array_key_exists($key, $array)) {
        return $array[$key];
    }

    if (strpos($key, '.') === false) {
        return isset($array[$key]) ? $array[$key] : $default;
    }

    foreach (explode('.', $key) as $segment) {
        if (! array_key_exists($segment, $array)) {
            return $default;
        }

        $array = $array[$segment];
    }

    return $array;
}

/**
 * Get the HTTP method of the request.
 *
 * @return string
 */
function request_method()
{
    return strtoupper(array_get($_SERVER, 'REQUEST_METHOD', 'GET'));
}

/**
 * Get the base url of the request.
 *
 * @return string
 */
function request_url()
{
    $scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
    $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'];
    $path = ! empty($_SERVER['REQUEST_URI']) ? explode('?', $_SERVER['REQUEST_URI'])[0] : '';

    return "{$scheme}://{$host}{$path}";
}

$requestContent = null;

/**
 * Get an input from the request.
 *
 * @param  string  $key
 * @param  mixed  $default
 *
 * @return null|string
 */
function request_input($key, $default = null)
{
    global $requestContent;

    if (! in_array(request_method(), ['GET', 'HEAD'], true)) {
        if ($requestContent === null) {
            $requestContent = json_decode(file_get_contents('php://input'), true);
        }

        if ($requestContent) {
            $value = array_get($requestContent, $key);

            if ($value !== null) {
                return $value;
            }
        }
    }

    return array_get($_GET, $key, $default);
}

/**
 * Send the response as JSON and exit.
 *
 * @param  array  $data
 * @param  int  $status
 */
function send_json_response($data = null, $status = 200)
{
    if ($data === null && $status === 200) {
        $status = 204;
    }

    if ($status !== 200) {
        http_response_code($status);
    }

    header('Content-Type: application/json');

    if ($data === null) {
        exit();
    }

    exit(json_encode($data));
}

/**
 * Read the given url as a string.
 *
 * @param  string  $url
 * @param  null|array  $curlOptions
 *
 * @return string
 */
function read_url($url, $curlOptions = null)
{
    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_CONNECTTIMEOUT => 150,
        CURLOPT_HTTPHEADER => [
            'User-Agent: Azuriom Installer v1',
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);

    if ($curlOptions !== null) {
        curl_setopt_array($ch, $curlOptions);
    }

    $response = curl_exec($ch);
    $errno = curl_errno($ch);

    if ($errno || $response === false) {
        $error = curl_error($ch);

        throw new RuntimeException("cURL error {$errno}: {$error}");
    }

    $statusCode = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

    if ($statusCode >= 400) {
        throw new RuntimeException("HTTP code {$statusCode} returned for '{$url}'.", $statusCode);
    }

    curl_close($ch);

    return $response;
}

/**
 * Download a file from the given url and save it to the given path.
 *
 * @param  string  $url
 * @param  string  $path
 *
 * @return string
 */
function download_file($url, $path)
{
    return read_url($url, [CURLOPT_FILE => fopen($path, 'wb+')]);
}

/**
 * Determines if a function exists and is not disabled.
 *
 * @param  string  $function
 *
 * @return bool
 */
function has_function($function)
{
    if (! function_exists($function)) {
        return false;
    }

    try {
        return strpos(ini_get('disable_functions'), $function) === false;
    } catch (Exception $e) {
        return false;
    }
}

/**
 * Check if the current OS is Windows.
 *
 * @return bool
 */
function is_windows()
{
    return stripos(PHP_OS, 'WIN') === 0;
}

if (array_get($_GET, 'phpinfo') === '') {
    phpinfo();
    exit();
}

//
// Give the requested data if the request is from AJAX.
//
if (array_get($_SERVER, 'HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest'
    || array_get($_GET, 'execute') === 'php') {
    try {
        $data = [
            'installerVersion' => $installerVersion,
            'minPhpVersion' => $minPhpVersion,
            'phpVersion' => parse_php_version(),
            'phpFullVersion' => PHP_VERSION,
            'phpIniPath' => php_ini_loaded_file(),
            'path' => __DIR__,
            'file' => __FILE__,
            'htaccess' => file_exists(__DIR__.'/.htaccess') && file_exists(__DIR__.'/public/.htaccess'),
            'windows' => is_windows(),
        ];

        $step = 'check';

        $writable = is_writable(__DIR__) && is_writable(__DIR__.'/public');

        $requirements = [
            'php' => version_compare(PHP_VERSION, $minPhpVersion, '>='),
            'writable' => $writable,
            'function-symlink' => has_function('symlink'),
            'rewrite' => isset($validInstallationUrlRewrite),
        ];

        $extracted = file_exists(__DIR__.'/vendor');

        foreach ($requiredExtensions as $extension) {
            $requirements['extension-'.$extension] = extension_loaded($extension);
        }

        $data['requirements'] = $requirements;

        $data['compatible'] = ! in_array(false, $requirements, true);
        $data['downloaded'] = file_exists(__DIR__.'/Azuriom.zip');
        $data['extracted'] = $extracted;

        $action = request_input('action');

        if (request_method() !== 'POST') {
            send_json_response($data);
        }

        if ($action === 'download') {
            // Get the latest download url
            $json = read_url('https://market.azuriom.com/api/download');

            $response = json_decode($json);

            if (! $response) {
                throw new RuntimeException('The response from Azuriom API is not a valid JSON.');
            }

            $file = __DIR__.'/'.$response->file;
            $needDownload = true;

            if (file_exists($file)) {
                // File was already downloaded before, if it's valid we don't
                // need to download it again.
                if (hash_equals($response->hash, hash_file('sha256', $file))) {
                    $needDownload = false;
                } else {
                    unlink($file);
                }
            }

            if ($needDownload) {
                download_file($response->url, $file);
            }

            if (! file_exists($file)) {
                throw new RuntimeException('The file was not downloaded.');
            }

            if (! hash_equals($response->hash, hash_file('sha256', $file))) {
                throw new RuntimeException('File size don\'t match the expected size.');
            }

            $zip = new ZipArchive();

            if (($status = $zip->open($file)) !== true) {
                throw new RuntimeException('Unable to open zip: '.$status.'.');
            }

            if (! $zip->extractTo(__DIR__)) {
                throw new RuntimeException('Unable to extract zip');
            }

            $zip->close();

            send_json_response($data);
        }

        send_json_response('Unexpected action: '.$action, 403);
    } catch (Throwable $t) {
        http_response_code(500);
        exit(json_encode(['message' => $t->getMessage()]));
    }
}

?>
<!-- Vue.js file -->
