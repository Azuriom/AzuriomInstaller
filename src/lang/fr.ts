export default {
  title: 'Installation',
  loading: 'Chargement...',
  continue: 'Continuer',
  error: 'Une erreur est survenue : {error}',
  welcome:
    "Azuriom est un CMS de jeux <strong>dernière génération</strong>, <strong>gratuit et open-source</strong>, qui a pour objectif d'être une alternative <strong>moderne, fiable, rapide et sécurisée</strong> par rapport aux CMS existants afin de vous proposer <strong>la meilleure expérience web</strong> possible pour votre serveur.",
  copyright:
    'Copyright &copy; 2019-{year} <a href="https://azuriom.com" target="_blank" rel="noopener noreferrer">Azuriom</a> - Tous droits réservés.',
  unknown: 'Inconnu',

  help: {
    cUrl60:
      'Vous pouvez suivre les étapes dans la <a href="https://azuriom.com/docs/faq" target="_blank" rel="noopener noreferrer">documentation</a> pour corriger ce problème. Chemin du fichier php.ini : <code>{path}</code>',
  },

  requirements: {
    php: 'PHP {version} ou plus récent',
    writable: 'Droits en écriture',
    rewrite: "Réécriture d'URL activée",
    extension: 'Extension {extension}',
    function: 'Fonction {function} activée',

    help: {
      writable:
        "Vous pouvez essayer de faire cette commande pour autoriser l'écriture : <code>{command}</code>.",
      rewrite:
        'Vous pouvez suivre les instructions dans <a href="https://azuriom.com/docs/installation" target="_blank" rel="noopener noreferrer">notre documentation</a> pour activer la réécriture d\'URL.',
      htaccess:
        "Le fichier <code>.htaccess</code> or <code>public/.htaccess</code> est manquant. Assurez-vous d'avoir activé les fichiers cachés et que le fichier est bien présent.",
      extension:
        'Vous pouvez essayer de faire cette commande pour installer les extensions PHP manquantes : <code>{command}</code><br>Une fois fait, redémarrez Apache ou Nginx.',
      function:
        'Vous devez activer cette fonction dans le fichier php.ini de PHP en modifiant la valeur de <code>disable_functions</code>.',
    },

    missing:
      "Votre serveur n'a pas les pré-requis nécessaires pour installer Azuriom.",
    recheck: 'Revérifier',
    success:
      "Votre serveur a les pré-requis pour installer Azuriom, vous pouvez continuer l'installation !",
  },

  download: {
    title: 'Téléchargement',
    legal:
      'En continuant l\'installation, vous acceptez <a href="https://azuriom.com/terms" target="_blank" rel="noopener noreferrer">les CGU d\'Azuriom</a>.',
    go: 'Télécharger',
  },
}
