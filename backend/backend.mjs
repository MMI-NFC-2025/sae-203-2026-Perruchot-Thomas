import PocketBase from "pocketbase";
const pb = new PocketBase('http://127.0.0.1:8090');

// 1. Liste des artistes triés par date de représentation
export async function getArtistesByDate() {
    const records = await pb.collection('programmation').getFullList({
        sort: 'date',
        expand: 'artiste',
    });
    return records.flatMap(reg => reg.expand?.artiste || []);
}

// 2. Liste de toutes les scènes triées par nom
export async function getAllScenes() {
    return await pb.collection('scenes').getFullList({
        sort: 'nom',
    });
}

// 3. Liste de tous les artistes triés par ordre alphabétique
export async function getAllArtistes() {
    return await pb.collection('artiste').getFullList({
        sort: 'nom',
    });
}

// 4. Infos d'un artiste par son ID
export async function getArtisteById(id) {
    return await pb.collection('artiste').getOne(id);
}

// 5. Infos d'une scène par son ID
export async function getSceneById(id) {
    return await pb.collection('scenes').getOne(id);
}

// 6. Artistes d'une scène par son ID, triés par date
export async function getArtistesBySceneId(sceneId) {
    return await pb.collection('programmation').getFullList({
        filter: `scene = "${sceneId}"`,
        sort: 'date',
        expand: 'artiste',
    });
}

// 7. Artistes d'une scène par son NOM, triés par date
export async function getArtistesBySceneNom(nomScene) {
    return await pb.collection('programmation').getFullList({
        filter: `scene.nom = "${nomScene}"`,
        sort: 'date',
        expand: 'artiste',
    });
}

// 8. Ajouter ou modifier un artiste ou une scène
export async function saveArtiste(artisteData) {
    if (artisteData.id) {
        return await pb.collection('artiste').update(artisteData.id, artisteData);
    } else {
        return await pb.collection('artiste').create(artisteData);
    }
}

export async function saveScene(sceneData) {
    if (sceneData.id) {
        return await pb.collection('scenes').update(sceneData.id, sceneData);
    } else {
        return await pb.collection('scenes').create(sceneData);
    }
}