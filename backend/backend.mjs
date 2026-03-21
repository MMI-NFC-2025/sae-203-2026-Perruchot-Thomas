import PocketBase from "pocketbase";
const pb = new PocketBase('http://127.0.0.1:8090');

// --- ARTISTES ---

/** Liste de tous les artistes triés par ordre alphabétique */
export async function getAllArtistes() {
    try {
        return await pb.collection('artiste').getFullList({
            sort: 'nom',
        });
    } catch (e) {
        console.error("Erreur getAllArtistes :", e);
        return [];
    }
}

/** Infos d'un artiste par son ID */
export async function getArtisteById(id) {
    try {
        return await pb.collection('artiste').getOne(id);
    } catch (e) {
        console.error("Erreur getArtisteById :", e);
        return null;
    }
}

/** Ajouter ou modifier un artiste */
export async function saveArtiste(artisteData) {
    try {
        if (artisteData.id) {
            return await pb.collection('artiste').update(artisteData.id, artisteData);
        } else {
            return await pb.collection('artiste').create(artisteData);
        }
    } catch (e) {
        console.error("Erreur saveArtiste :", e);
        return null;
    }
}


// --- SCÈNES ---

/** Liste de toutes les scènes triées par nom */
export async function getAllScenes() {
    try {
        return await pb.collection('scenes').getFullList({
            sort: 'nom',
        });
    } catch (e) {
        console.error("Erreur getAllScenes :", e);
        return [];
    }
}

/** Infos d'une scène par son ID */
export async function getSceneById(id) {
    try {
        return await pb.collection('scenes').getOne(id);
    } catch (e) {
        console.error("Erreur getSceneById :", e);
        return null;
    }
}

/** Ajouter ou modifier une scène */
export async function saveScene(sceneData) {
    try {
        if (sceneData.id) {
            return await pb.collection('scenes').update(sceneData.id, sceneData);
        } else {
            return await pb.collection('scenes').create(sceneData);
        }
    } catch (e) {
        console.error("Erreur saveScene :", e);
        return null;
    }
}


// --- PROGRAMMATION & FILTRAGE ---

/** Liste des artistes filtrés par date (évite les doublons d'artistes) */
export async function getArtistesByDate(dateSelectionnee) {
    try {
        const records = await pb.collection('programmation').getFullList({
            filter: `date ~ "${dateSelectionnee}"`,
            expand: 'artiste',
        });
        // On récupère tous les artistes du champ expand et on élimine les doublons avec une Map
        const artistes = records.flatMap(reg => reg.expand?.artiste || []);
        return Array.from(new Map(artistes.map(a => [a.id, a])).values());
    } catch (e) {
        console.error("Erreur getArtistesByDate :", e);
        return [];
    }
}

/** Récupère toute la programmation d'une scène spécifique avec les artistes */
export async function getProgrammationByScene(sceneId) {
    try {
        return await pb.collection('programmation').getFullList({
            filter: `scene = "${sceneId}"`,
            expand: 'artiste',
            sort: 'date',
        });
    } catch (e) {
        console.error("Erreur getProgrammationByScene :", error);
        return [];
    }
}