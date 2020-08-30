export default {
    title: 'Installation',
    loading: 'Chargement...',
    continue: 'Continuer',
    error: 'Une erreur est survenue : {error}',
    welcome: 'Azuriom est un CMS de jeux <strong>dernière génération</strong>, <strong>gratuit et open-source</strong>, qui a pour objectif d\'être une alternative <strong>moderne, fiable, rapide et sécurisée</strong> par rapport aux CMS existants afin de vous proposer <strong>la meilleure expérience web</strong> possible pour votre serveur.',
    copyright: 'Copyright &copy; 2019-{year} <a href="https://azuriom.com" target="_blank" rel="noopener">Azuriom</a> - Tous droits réservés.',

    requirements: {
        php: 'PHP {version} ou plus récent',
        writable: 'Droits en écriture',
        rewrite: 'Réécriture d\'URL activée',
        extension: 'Extension {extension}',

        help: {
            writable: 'Vous pouvez essayer de faire cette commande pour autoriser l\'écriture : <code>{command}</code>.',
            rewrite: 'Vous pouvez suivre les instructions dans <a href="https://azuriom.com/docs/installation" target="_blank" rel="noopener noreferrer">notre documentation</a> pour activer la réécriture d\'URL.',
            htaccess: 'Le fichier <code>.htaccess</code> or <code>public/.htaccess</code> est manquant. Assurez vous d\'avoir activé les fichiers cachés et que le fichier est bien présent.',
            extension: 'Vous pouvez essayer de faire cette commande pour installer les extensions PHP manquantes : <code>{command}</code><br>Une fois fait, redémarrez Apache ou Nginx.',
        },

        missing: 'Votre serveur n\'a pas les pré-requis nécessaires pour installer Azuriom.',
        recheck: 'Revérifier',
        success: 'Votre serveur a les pré-requis pour installer Azuriom, vous pouvez continuer l\'installation !',
    },

    download: {
        title: 'Téléchargement',
        legal: 'En continuant l\'installation, vous acceptez <a href="https://azuriom.com/terms" target="_blank" rel="noopener noreferrer">les CGU d\'Azuriom</a>.',
        go: 'Télécharger',
    },

    database: {
        title: 'Base de données',

        type: 'Type',
        host: 'Adresse',
        port: 'Port',
        database: 'Base de données',
        user: 'Utilisateur',
        password: 'Mot de passe',

        sqlite: 'SQLite n\'est pas recommandé et ne doit être utilisé que lorsqu\'il n\'est pas possible de faire autrement.',
    },

    config: {
        warn: 'Attention, une fois l\'installation terminée, il ne sera pas possible de changer le jeu sans réinstaller entièrement Azuriom !',

        game: {
            title: 'Sélectionner le jeu',
            change: 'Changer de jeu',
        },

        settings: {
            title: 'Paramètres',
            locale: 'Langue',
        },

        user: {
            title: 'Compte admin',

            name: 'Pseudo',
            email: 'Adresse E-Mail',
            password: 'Mot de passe',
            passwordConfirm: 'Confirmer le mot de passe',
        },

        steam: {
            profile: 'URL du profil Steam',
            profileInfo: 'Ce compte Steam sera admin sur le site.',

            key: 'Clé API Steam',
            keyInfo: 'Vous pouvez obtenir votre clé d\'API Steam sur <a href="https://steamcommunity.com/dev/apikey" target="_blank" rel="noopener noreferrer">Steam</a>.',
        },

        minecraft: {
            premium: 'Activer la vérification des pseudos avec Minecraft.net',
        },

        install: 'Installer',
    },

    installed: {
        thanks: 'Merci d\'avoir choisi Azuriom !',
        success: 'Votre site web a été installé avec succès, vous pouvez maintenant utiliser votre site web et en faire quelque chose de génial !',
        go: 'Commencer',
        support: 'Si vous appréciez Azuriom et le travail que nous fournissons, vous pouvez <a href="https://azuriom.com/support-us" target="_blank" rel="noopener noreferrer">nous soutenir</a>.',
    },

    validation: {
        required: 'Ce champ est obligatoire.',
        port: 'Le port doit être compris entre 1 et 65535',
        email: 'Cette adresse e-mail n\'est pas valide.',
        password: 'Le mot de passe doit comporter au moins 8 caractères.',
        passwordConfirm: 'La confirmation du mot de passe ne correspond pas.',
        steamProfile: 'Le profil Steam doit être une URL valide.',
    },
};
