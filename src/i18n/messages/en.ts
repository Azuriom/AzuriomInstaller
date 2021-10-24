export default {
  title: 'Installation',
  loading: 'Loading...',
  continue: 'Continue',
  error: 'An error occurred: {error}',
  welcome: 'Azuriom is the <strong>next generation</strong> game CMS, it\'s <strong>free</strong> and <strong>open-source</strong>, and is a <strong>modern, reliable, fast and secure</strong> alternative to existing CMS so you can have the <strong>best web experience possible</strong>.',
  copyright: 'Copyright &copy; 2019-{year} <a href="https://azuriom.com" target="_blank" rel="noopener noreferrer">Azuriom</a> - All rights reserved.',
  unknown: 'Unknown',

  help: {
    cUrl60: 'You can follow the steps in the <a href="https://azuriom.com/docs/faq" target="_blank" rel="noopener noreferrer">documentation</a> to solve this issue. Path of the the php.ini: <code>{path}</code>',
  },

  requirements: {
    php: 'PHP {version} or higher',
    writable: 'Write permission',
    rewrite: 'URL rewrite enabled',
    extension: 'Extension {extension}',
    function: 'Function {function} enabled',

    help: {
      writable: 'You can try this command to grant write permission: <code>{command}</code>.',
      rewrite: 'You can follow the instructions in <a href="https://azuriom.com/docs/installation" target="_blank" rel="noopener noreferrer">our documentation</a> to enable URL rewriting.',
      htaccess: 'The file <code>.htaccess</code> or <code>public/.htaccess</code> is missing. Make sure you have enabled hidden files and that the file is present.',
      extension: 'You can try this command to install the missing PHP extensions: <code>{command}</code>.<br>Once done, restart Apache or Nginx.',
      function: 'You need to enable this function in the php.ini file of PHP by editing the value of <code>disable_functions</code>.',
    },

    missing: 'Your server doesn\'t have the necessary requirements to install Azuriom.',
    recheck: 'Recheck',
    success: 'Your server has the prerequisites to install Azuriom, you can continue the installation !',
  },

  download: {
    title: 'Download',
    legal: 'By continuing the installation, you accept <a href="https://azuriom.com/terms" target="_blank" rel="noopener noreferrer">Azuriom\'s TOS</a>.',
    go: 'Download',
  },
};
