export default {
  title: 'Installation',
  loading: 'Loading...',
  continue: 'Continue',
  error: 'An error occurred: {error}',
  welcome: 'Azuriom is the <strong>next generation</strong> game CMS, it\'s <strong>free</strong> and <strong>open-source</strong>, and is a <strong>modern, reliable, fast and secure</strong> alternative to existing CMS so you can have the <strong>best web experience possible</strong>.',
  copyright: 'Copyright &copy; 2019-{year} <a href="https://azuriom.com" target="_blank" rel="noopener noreferrer">Azuriom</a> - All rights reserved.',
  unknown: 'Unknown',

  help: {
    cUrl60: 'You can follow the steps in the <a href="https://azuriom.com/docs/troubleshooting" target="_blank" rel="noopener noreferrer">documentation</a> to solve this issue. Path of the the php.ini: <code>{path}</code>',
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

  database: {
    title: 'Database',

    type: 'Type',
    host: 'Host',
    port: 'Port',
    database: 'Database',
    user: 'User',
    password: 'Password',

    sqlite: 'SQLite is not recommended and should only be used when it is not possible to do otherwise.',
  },

  config: {
    warn: 'Be careful, once the installation is finished it will not be possible to change the game without reinstalling Azuriom entirely!',

    game: {
      title: 'Select your game',
      change: 'Change game',
    },

    settings: {
      title: 'Settings',
      locale: 'Locale',
    },

    user: {
      title: 'Admin account',

      name: 'Name',
      email: 'E-Mail address',
      password: 'Password',
      passwordConfirm: 'Confirm password',
    },

    minecraft: {
      premium: 'Enabling username verification with Minecraft.net',
    },

    steam: {
      profile: 'Steam Profile URL',
      profileInfo: 'This Steam user will be admin on the site.',

      key: 'Steam API Key',
      keyInfo: 'You can find your Steam API Key on <a href="https://steamcommunity.com/dev/apikey" target="_blank" rel="noopener noreferrer">Steam</a>.',
    },

    install: 'Install',
  },

  installed: {
    thanks: 'Thanks for choosing Azuriom !',
    success: 'Your website has been successfully installed, you can now use your website and make something awesome !',
    go: 'Get started',
    support: 'If you appreciate Azuriom and the work we provides, please don\'t forget to <a href="https://azuriom.com/support-us" target="_blank" rel="noopener noreferrer">support us</a>.',
  },

  validation: {
    required: 'This field is required.',
    port: 'The port must be between 1 and 65535',
    email: 'This e-mail address is not valid.',
    password: 'The password must be at least 8 characters.',
    passwordConfirm: 'The password confirmation does not match.',
    steamProfile: 'The Steam Profile must be a valid URL.',
  },
};
