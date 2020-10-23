<?php

/**
 * The Azuriom installer.
 *
 * This file is not a part of Azuriom itself,
 * and can be remove when Azuriom is installed.
 *
 * @author Azuriom
 */

/** @noinspection PhpComposerExtensionStubsInspection */

$installerVersion = '0.2.1';

$minPhpVersion = '7.3';

$requiredExtensions = [
    'bcmath', 'ctype', 'json', 'mbstring', 'openssl', 'PDO', 'tokenizer', 'xml', 'curl', 'zip', 'gd',
];

// The different installation steps
$steps = [
    'check', // Check the server requirements
    'download', // Download and install the CMS files
    'database', // Configure the database connection
    'config', // Choose the lang, game and create the user
    'done', // Installation done !
];

// The Steam games supported by Azuriom
$steamGames = [
    'gmod', 'ark', 'rust', 'csgo', 'tf2',
];

// The games supported by Azuriom
$supportedGames = array_merge([
    'mc-online', 'mc-offline',
], $steamGames);

$locales = ['en', 'fr'];

//
// Some helper functions
//

/**
 * Escape a input
 *
 * @param  string  $value
 * @return string
 */
function escape($value)
{
    return htmlspecialchars($value, ENT_QUOTES);
}

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
 * @param  string|int  $key
 * @param  mixed  $default
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
 * Get the HTTP method of the request
 *
 * @return string
 */
function request_method()
{
    return strtoupper(array_get($_SERVER, 'REQUEST_METHOD', 'GET'));
}

/**
 * Get the base url of the request
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
 * @param  string  $key
 * @param  mixed  $default
 * @return string|null
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
 * Remove invalid UTF-8 characters.
 *
 * @param  string  $text
 * @return string
 */
function fix_utf8($text)
{
    return iconv('UTF-8', 'UTF-8//IGNORE', $text);
}

/**
 * Read the given url as a string.
 *
 * @param  string  $url
 * @param  callable|null  $curlCallback
 * @return string
 */
function read_url($url, $curlCallback = null)
{
    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_CONNECTTIMEOUT => 150,
        CURLOPT_HTTPHEADER => [
            'User-Agent: Azuriom Installer',
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);

    if ($curlCallback !== null) {
        $curlCallback($ch);
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
 * @return string
 */
function download_file($url, $path)
{
    $fp = fopen($path, 'wb+');

    return read_url($url, function ($ch) use ($fp) {
        curl_setopt($ch, CURLOPT_FILE, $fp);
    });
}

/**
 * Determines if a function exists and is not disabled.
 *
 * @param  string  $function
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
 * Update the give values in the environment file.
 *
 * @param  string  $file
 * @param  array  $values
 * @param  callable|null  $callback
 * @return bool
 */
function update_env($file, $values, $callback = null)
{
    $contents = file_get_contents($file);

    foreach ($values as $key => $value) {
        if (strpos($value, ' ') !== false || strpos($value, '#') !== false) {
            if (strpos($value, '"') !== false) {
                $value = str_replace('"', '\"', $value);
            }
            $value = '"'.$value.'"';
        }

        preg_match("/^{$key}=[^\r\n]*/m", $contents, $matches);
        if (count($matches)) {
            $oldValue = substr($matches[0], strlen($key) + 1);

            $contents = str_replace("{$key}={$oldValue}", "{$key}={$value}", $contents);
        } else {
            $contents .= PHP_EOL."{$key}={$value}";
        }
    }

    if ($callback !== null) {
        $contents = $callback($contents);
    }

    return file_put_contents($file, $contents) !== false;
}

//
// Give the requested data if the request is from AJAX.
//
if (array_get($_SERVER, 'HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest') {
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
        ];

        $step = 'check';

        $writable = is_writable(__DIR__) && is_writable(__DIR__.'/public/install.php');

        $requirements = [
            'php' => version_compare(PHP_VERSION, $minPhpVersion, '>='),
            'writable' => $writable,
            'function-symlink' => has_function('symlink'),
        ];

        $extracted = file_exists(__DIR__.'/vendor');

        $requirements['rewrite'] = isset($validInstallationUrlRewrite);

        foreach ($requiredExtensions as $extension) {
            $requirements['extension-'.$extension] = extension_loaded($extension);
        }

        $data['requirements'] = $requirements;

        $data['compatible'] = ! in_array(false, $requirements, true);

        $data['status'] = [
            'downloaded' => file_exists(__DIR__.'/Azuriom.zip'),
            'extracted' => $extracted,
            'configured' => file_exists(__DIR__.'/.env.install'),
            'installed' => file_exists(__DIR__.'/.env'),
        ];

        $action = request_input('action');

        if ($action === 'info' || request_method() !== 'POST') {
            send_json_response($data);
        }

        if ($action === 'download') {
            // Get the latest download url
            $json = read_url('https://azuriom.com/api/download');

            $response = json_decode($json);

            if (! $response) {
                throw new RuntimeException('The response from the API is not a valid JSON.');
            }

            $file = __DIR__.'/Azuriom.zip';
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
                throw new RuntimeException('File hash don\'t match the expected hash.');
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

        if ($action === 'database') {
            $databaseType = request_input('type');

            if ($databaseType === 'sqlite') {
                try {
                    $databasePath = __DIR__.'/database/database.sqlite';

                    touch($databasePath);

                    new PDO("sqlite:{$databasePath}", null, null, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    ]);

                    copy(__DIR__.'/.env.example', __DIR__.'/.env.install');

                    $result = update_env(__DIR__.'/.env.install', [
                        'DB_CONNECTION' => $databaseType,
                    ], function ($content) {
                        return str_replace('DB_DATABASE', '#DB_DATABASE', $content);
                    });

                    if ($result === false) {
                        throw new RuntimeException('Unable to write .env.install');
                    }

                    send_json_response($data);
                } catch (Throwable $t) {
                    send_json_response(['message' => fix_utf8($t->getMessage())], 500);
                }
            }

            if ($databaseType === 'mysql' || $databaseType === 'pgsql') {
                try {
                    $host = request_input('credentials.host');
                    $port = request_input('credentials.port', $databaseType === 'pgsql' ? 5432 : 3306);
                    $database = request_input('credentials.database');
                    $user = request_input('credentials.user');
                    $password = request_input('credentials.password');

                    if (empty($host) || empty($database) || ! is_numeric($port) || empty($user)) {
                        send_json_response(['message' => 'Missing or invalid parameters.'], 422);
                    }

                    new PDO("{$databaseType}:host={$host};port={$port};dbname={$database}", $user, $password, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    ]);

                    copy(__DIR__.'/.env.example', __DIR__.'/.env.install');

                    $result = update_env(__DIR__.'/.env.install', [
                        'APP_ENV' => 'production',
                        'APP_DEBUG' => 'false',
                        'DB_CONNECTION' => $databaseType,
                        'DB_HOST' => $host,
                        'DB_PORT' => $port,
                        'DB_DATABASE' => $database,
                        'DB_USERNAME' => $user,
                        'DB_PASSWORD' => $password,
                    ]);

                    if ($result === false) {
                        throw new RuntimeException('Unable to write .env.install');
                    }

                    send_json_response($data);
                } catch (Throwable $t) {
                    send_json_response(['message' => fix_utf8($t->getMessage())], 500);
                }
            }

            throw new RuntimeException('Unknown database type: '.$databaseType);
        }

        if ($action === 'config') {
            $name = request_input('name');
            $email = request_input('email');
            $password = request_input('password');
            $game = request_input('game');

            $locale = request_input('locale', 'en');

            if (! in_array($locale, $locales, true)) {
                send_json_response(['message' => 'Invalid locale: '.$locale], 422);
            }

            if (! in_array($game, $steamGames, true)) {
                if (empty($name) || empty($email) || empty($password)) {
                    send_json_response(['message' => 'Missing or invalid parameters.'], 422);
                }

                $game = request_input('minecraftPremium') ? 'mc-online' : 'mc-offline';
            } else {
                $profile = read_url(request_input('steamProfile').'?xml=1');

                if ($profile === null || strpos($profile, '<steamID64>') === false) {
                    send_json_response(['message' => 'Invalid Steam profile URL.'], 422);
                }

                preg_match('/<steamID64>(\d{17})<\/steamID64>/', $profile, $matches);

                $steamId = $matches[1];
                $steamKey = request_input('steamApiKey');

                $keyResponse = read_url('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002?steamids=76561198048368658&key='.$steamKey);

                if ($keyResponse === null || strpos($keyResponse, 'personaname') === false) {
                    send_json_response(['message' => 'Invalid Steam API key.'], 422);
                }
            }

            // Everything is good we can install :)

            $result = @update_env(__DIR__.'/.env.install', [
                    'APP_LOCALE' => $locale,
                    'APP_URL' => str_replace('install.php', '', request_url()),
                    'MAIL_MAILER' => 'array',
                    'AZURIOM_GAME' => $game,
                ] + (isset($steamKey) ? ['STEAM_KEY' => $steamKey] : []));

            if ($result === false) {
                throw new RuntimeException('Unable to write .env.install');
            }

            define('LARAVEL_START', microtime(true));

            require __DIR__.'/vendor/autoload.php';
            require __DIR__.'/bootstrap/app.php';

            if (! copy(__DIR__.'/.env.install', __DIR__.'/.env')) {
                throw new RuntimeException('Unable to copy .env');
            }

            try {
                $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

                $kernel->call('cache:clear');

                $kernel->call('key:generate');

                $kernel->call('migrate', ['--force' => true, '--seed' => true]);

                $kernel->call('storage:link', ! windows_os() ? ['--relative' => true] : []);

                if (isset($steamId, $steamKey)) {
                    $password = \Illuminate\Support\Str::random(32);

                    $user = \Azuriom\Models\User::create([
                        'name' => 'Admin',
                        'email' => 'admin@domain',
                        'password' => \Illuminate\Support\Facades\Hash::make($password),
                        'game_id' => $steamId,
                    ]);

                    $user->markEmailAsVerified();
                    $user->forceFill(['role_id' => 2])->save();

                    \Azuriom\Models\Setting::updateSettings('register', false);
                } else {
                    $kernel->call('user:create', [
                        '--name' => $name,
                        '--email' => $email,
                        '--password' => $password,
                        '--admin' => true,
                    ]);
                }
            } catch (Throwable $e) {
                // We remove the .env file because otherwise Azuriom
                // will think the site was correctly installed.
                @unlink(__DIR__.'/.env');

                throw $e;
            }

            @unlink(__DIR__.'/.env.install');
            @unlink(__DIR__.'/Azuriom.zip');

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
