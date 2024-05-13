// Useful functions and constants for managing the Sankey diagram
// Fonctions et constantes utiles pour la gestion du diagramme de Sankey

/* Defining constants */
/* Définition des constantes */
const TRANSITION_DURATION = "500";

const HIGHLIGHT_FONT_SIZE = "14px";
const DEFAULT_FONT_SIZE = "14px";

// Enum describing the various diagram states
// Enumération décrivant les différents états du diagramme
const CHART_STATES = {
    ONE: 'facs-to-broad-prospects',
    TWO: 'degrees-to-broad-prospects',
    THREE: 'facs-to-prospects',
    FOUR: 'degrees-to-prospects'
};

/**
 * Permet de définir le texte à afficher sur l'infobulle à côté d'un nœud, en fonction des informations associées.
 * @param node              - Le nœud mis en évidence
 * @returns {String}        - Le texte à afficher dans l'infobulle
 */
function getNodeTooltipText(node) {
    const nodeCategory = node.category;

    // Additional information on the prospects is displayed (if available).
    // Les informations supplémentaires concernant les débouchés sont affichées (si possible)
    if (nodeCategory === "débouché" && node.tooltip !== null) {
        return node.tooltip;
    }

    const facsCategories = ["fac", "facs"];

    return facsCategories.includes(nodeCategory) ? node.full_name : node.name;
}

/**
 * Permet de définir le texte à afficher sur l'infobulle d'un lien entre deux nœuds
 * @param link              - Le lien mis en évidence
 * @returns {String}        - Le texte à afficher dans l'infobulle
 */
function getLinkTooltipText(link) {
    return `${link.source.name} → ${link.target.name}`;
}

/**
 * Permet de récupérer l'identifiant unique d'un élément (spécifiquement les libellés ou les rectangles).
 * Prend l'identifiant de l'élément sous la forme "text/rect-<id>" et retourne uniquement <id>.
 * @param element       - L'élément HTML
 * @returns {String}    - Le nombre identifiant cet élément
 */
function getElementId(element) {
    const array = element.id.split("-");
    return array[1];
}

/**
 * Permet de lire un fichier JSON et de récupérer les données
 * @param {String} filePath         - Le chemin vers le fichier
 * @returns {Promise}
 */
function readJSONFile(filePath) {
    return new Promise((resolve, reject) => {
        // Use the built-in 'fetch' API to read the file
        fetch(filePath)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

/**
 * Permet d'ouvrir les fichiers pertinents et de récupérer les données
 * @param {String} fac              - La faculté
 * @param {String} broadProspect    - Le débouché large
 * @param {String | Number} year    - L'année d'obtention (paramètre)
 * @returns {object}
 */
async function getData(fac, broadProspect, year) {
    switch (year) {
        case "Toutes":
            if (fac.length === 0 && broadProspect.length === 0) {
                try {
                    const data = await readJSONFile('../data/Toutes-data.json');
                    return data["Facs-Debouches"];
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                    return {};
                }
            }

            if (fac.length > 0 && broadProspect.length === 0) {
                try {
                    const data = await readJSONFile('../data/Toutes-data.json');
                    return data["Diplomes-" + fac];
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                    return {};
                }
            }

            if (fac.length === 0 && broadProspect.length > 0) {
                try {
                    const data = await readJSONFile('../data/Toutes-data.json');
                    return data["Facs-" + broadProspect];
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                    return {};
                }
            }

            if (fac.length > 0 && broadProspect.length > 0) {
                try {
                    const data = await readJSONFile('../data/Toutes-data.json');
                    return data[fac + "-" + broadProspect];
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                    return {};
                }
            }
            return {}
        default:
            // Par défaut, c'est une année. On ouvre donc le fichier correspondant
            if (fac.length === 0 && broadProspect.length === 0) {
                try {
                    const data = await readJSONFile('../data/' + year +'-data.json');
                    return data["Facs-Debouches"];
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                    return {};
                }
            }

            if (fac.length > 0 && broadProspect.length === 0) {
                try {
                    const data = await readJSONFile('../data/' + year +'-data.json');
                    return data["Diplomes-" + fac];
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                    return {};
                }
            }

            if (fac.length === 0 && broadProspect.length > 0) {
                try {
                    const data = await readJSONFile('../data/' + year +'-data.json');
                    return data["Facs-" + broadProspect];
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                    return {};
                }
            }

            if (fac.length > 0 && broadProspect.length > 0) {
                try {
                    const data = await readJSONFile('../data/' + year +'-data.json');
                    return data[fac + "-" + broadProspect];
                } catch (error) {
                    console.error('Error reading JSON file:', error);
                    return {};
                }
            }
            break
    }
    return {}
}
