import PocketBase from "pocketbase";
export const pb = new PocketBase('https://echosonore.perruchot.optimiseus.fr');


export async function getAllArtistes() {
    try {
        return await pb.collection('artiste').getFullList({ sort: 'nom' });
    } catch (e) {
        console.error("Erreur getAllArtistes :", e);
        return [];
    }
}

export async function getArtisteById(id) {
    try {
        return await pb.collection('artiste').getOne(id);
    } catch (e) {
        console.error("Erreur getArtisteById :", e);
        return null;
    }
}

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

export async function getAllScenes() {
    try {
        return await pb.collection('scenes').getFullList({ sort: 'nom' });
    } catch (e) {
        console.error("Erreur getAllScenes :", e);
        return [];
    }
}

export async function getSceneById(id) {
    try {
        return await pb.collection('scenes').getOne(id);
    } catch (e) {
        console.error("Erreur getSceneById :", e);
        return null;
    }
}

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

export async function getArtistesByDate(dateSelectionnee) {
    try {
        const records = await pb.collection('programmation').getFullList({
            filter: `date ~ "${dateSelectionnee}"`,
            expand: 'artiste',
        });
        const artistes = records.flatMap(reg => reg.expand?.artiste || []);
        return Array.from(new Map(artistes.map(a => [a.id, a])).values());
    } catch (e) {
        console.error("Erreur getArtistesByDate :", e);
        return [];
    }
}

export async function getProgrammationByScene(id) {
    try {
        return await pb.collection('programmation').getFullList({
            filter: `scene = "${id}"`,
            expand: 'artiste',
            sort: 'date',
        });
    } catch (e) { 
        console.error('Erreur getProgrammationByScene :', e);
        return [];
    }
}


export async function getAllArtistesSortedByDate() {
    try {
        const records = await pb.collection('programmation').getFullList({
            sort: 'date',
            expand: 'artiste',
        });
        return records; 
    } catch (e) {
        console.error("Erreur getAllArtistesSortedByDate :", e);
        return [];
    }
}

export async function getArtistesBySceneId(id) {
    return await getProgrammationByScene(id); 
}

export async function getArtistesBySceneNom(nomScene) {
    try {
        const scene = await pb.collection('scenes').getFirstListItem(`nom="${nomScene}"`);
        return await getArtistesBySceneId(scene.id);
    } catch (e) {
        console.error("Erreur getArtistesBySceneNom :", e);
        return [];
    }
}


export async function ajouterArtiste(nom, genre) {
    const data = { nom, genre };

    try {
        const record = await pb.collection('artiste').create(data);
        console.log("Artiste créé avec l'ID :", record.id);
        return record;
    } catch (error) {
        console.error("Erreur d'ajout :", error);
        return null;
    }
}

export async function sendContact(data) {
    try {
        await pb.collection('messages').create(data);
        return true;
    } catch (e) {
        console.error("Erreur lors de l'envoi du message :", e);
        return false;
    }
}