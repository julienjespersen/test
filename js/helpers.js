// Various useful functions
// Diverses fonctions utiles

/**
 * Retourne une chaîne de caractère générée de longueur 'length' de manière aléatoire
 * @param length        La longueur désirée
 * @return {string}     La chaîne de caractère aléatoire
 */
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

/**
 * Prend un élément HTML et supprime tous ses descendants
 * @param parent        Le nœud parent
 * @return {void}
 * */
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * Prend un lien YouTube et retourne l'identifiant de la vidéo
 * @param {string} url          L'url YouTube
 * @return {string}             Une chaîne de caractère correspondant à l'identifiant du lien YouTube
 * */
function getVideoID(url) {

    if (!url)
        return "";

    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        // L'URL fournie est une URL YouTube
        return match[2];
    }

    // L'URL fournie n'est pas une URL YouTube
    return url;
}
