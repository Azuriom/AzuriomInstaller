<?php

use PhpCsFixer\Config;
use PhpCsFixer\Finder;

$finder = Finder::create()
    ->in(__DIR__.'/backend');

return (new Config())
    ->setFinder($finder)
    ->setRiskyAllowed(true)
    ->setRules([
        '@PSR2' => true,
        '@PhpCsFixer' => true,
        '@PhpCsFixer:risky' => true,
        '@PHPUnit75Migration:risky' => true,

        'not_operator_with_successor_space' => true,

        // Override some rules from @PhpCsFixer preset
        'blank_line_before_statement' => [
            'statements' => ['declare', 'return', 'throw', 'try'],
        ],
        'increment_style' => ['style' => 'post'],
        'native_constant_invocation' => false,
        'native_function_invocation' => false,
        'no_extra_blank_lines' => true,
        'phpdoc_align' => false,
        'phpdoc_order' => false,
        'protected_to_private' => false,
        'single_line_comment_style' => false,
        'yoda_style' => [
            'always_move_variable' => false,
            'equal' => false,
            'identical' => false,
            'less_and_greater' => false,
        ],
    ]);
