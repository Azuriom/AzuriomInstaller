export default {
  title: '安装',
  loading: '加载中...',
  continue: '继续',
  error: '发生错误: {error}',
  welcome:
    'Azuriom 是 <strong>新一代</strong> 游戏 CMS, 它是<strong>免费</strong>和<strong>开源</strong>的，是现有CMS的一个<strong>现代、可靠、快速和安全</strong>的替代方案，因此你可以拥有<strong>最好的网络体验</strong>.',
  copyright:
    '版权所有 &copy; 2019-{year} <a href="https://azuriom.com" target="_blank" rel="noopener noreferrer">Azuriom</a> - 保留所有权利.',
  unknown: '未知',

  help: {
    cUrl60:
      '您可以跟随 <a href="https://azuriom.com/docs/faq" target="_blank" rel="noopener noreferrer">文档</a> 中的步骤解决这个问题. php.ini 路径: <code>{path}</code>',
  },

  requirements: {
    php: 'PHP {version} 或更高',
    writable: '写权限',
    rewrite: 'URL 重写',
    extension: '拓展 {extension}',
    function: '启用函数 {function}',

    help: {
      writable: '您可以尝试使用此命令来授予写权限: <code>{command}</code>.',
      rewrite:
        '您可以按照 <a href="https://azuriom.com/docs/installation" target="_blank" rel="noopener noreferrer">我们的文档</a> 中的说明来启用 URL 重写.',
      htaccess:
        '文件 <code>.htaccess</code> 或 <code>public/.htaccess</code> 缺失. 确保你已经启用了隐藏文件显示，并且确认该文件是存在的.',
      extension:
        '您可以尝试使用此命令来安装 PHP 拓展: <code>{command}</code>.<br>完成后重启 Apache 或 Nginx.',
      function:
        '你需要在 PHP 的 php.ini 文件中通过编辑 <code>disable_functions</code> 的值来启用这个功能.',
    },

    missing: '你的服务器不具备安装 Azuriom 的必要条件.',
    recheck: '重新检查',
    success: '你的服务器具备安装 Azuriom 的先决条件，你可以继续安装了!',
  },

  download: {
    title: '下载',
    legal:
      '继续安装即表示你接受 <a href="https://azuriom.com/terms" target="_blank" rel="noopener noreferrer">Azuriom 服务条款</a>.',
    go: '下载',
  },
}
