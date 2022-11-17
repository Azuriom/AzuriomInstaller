export default {
    title: 'Installation',
    loading: 'Laden...',
    continue: 'Fortfahren',
    error: 'Ein Fehler ist aufgetreten: {error}',
    welcome:
      "Azuriom ist das <strong>Spiel-CMS der nächsten Generation</strong>, es ist <strong>kostenlos</strong> und <strong>open-source</strong>. Es ist eine <strong>moderne, zuverlässige, schnelle und sichere</strong> Alternative zu bestehenden CMS, damit du das <strong>bestmögliche Web-Erlebnis</strong> hast.",
    copyright:
      'Copyright &copy; 2019-{year} <a href="https://azuriom.com" target="_blank" rel="noopener noreferrer">Azuriom</a> - Alle Rechte vorbehalten.',
    unknown: 'Unbekannt',
  
    help: {
      cUrl60:
        'Du kannst die Schritte in der <a href="https://azuriom.com/docs/faq" target="_blank" rel="noopener noreferrer">Dokumentation</a> befolgen, um dieses Problem zu lösen. Pfad der php.ini: <code>{path}</code>',
    },
  
    requirements: {
      php: 'PHP {version} oder höher',
      writable: 'Schreibrechte',
      rewrite: 'URL-Rewrite aktiviert',
      extension: 'Erweiterung {extension}',
      function: 'Funktion {function} aktiviert',
  
      help: {
        writable:
          'Du kannst diesen Befehl ausprobieren, um Schreibrechte zu erteilen: <code>{command}</code>.',
        rewrite:
          'Du kannst den Anweisungen in <a href="https://azuriom.com/docs/installation" target="_blank" rel="noopener noreferrer">unserer Dokumentation</a> folgen, um das URL-Rewriting zu aktivieren.',
        htaccess:
          'Die Datei <code>.htaccess</code> oder <code>public/.htaccess</code> fehlt. Vergewissere dich, dass du versteckte Dateien aktiviert hast und dass die Datei vorhanden ist.',
        extension:
          'Du kannst diesen Befehl ausprobieren, um die fehlenden PHP-Erweiterungen zu installieren: <code>{command}</code>.<br>Nachdem du das getan hast, starte Apache oder Nginx neu.',
        function:
          'Du musst diese Funktion in der php.ini-Datei von PHP aktivieren, indem du den Wert von <code>disable_functions</code> änderst.',
      },
  
      missing:
        "Dein Server hat nicht die nötigen Voraussetzungen, um Azuriom zu installieren.",
      recheck: 'Neu prüfen',
      success:
        'Dein Server hat die Voraussetzungen für die Installation von Azuriom, du kannst die Installation fortsetzen!',
    },
  
    download: {
      title: 'Herunterladen',
      info: 'Azuriom kann jetzt heruntergeladen werden. Dieser Vorgang kann ein paar Minuten dauern.',
      go: 'Herunterladen',
    },
}