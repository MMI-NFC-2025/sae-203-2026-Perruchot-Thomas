import { 
    getArtistesByDate, getAllScenes, getAllArtistes,
    getArtisteById, getSceneById, getArtistesBySceneId,
    getArtistesBySceneNom, saveArtiste, saveScene
} from './backend.mjs';

const hr = "---------------------------------------------";

// --- FONCTIONS DE TEST ---

async function t1_artistesParDate() {
    const data = await getArtistesByDate();
    console.log("TEST 1 : Artistes par date de représentation");
    data.forEach(a => console.log(`- ${a.nom}`));
}

async function t2_toutesLesScenes() {
    const data = await getAllScenes();
    console.log("TEST 2 : Scènes triées par nom");
    console.table(data.map(s => ({ nom: s.nom })));
}

async function t3_artistesAlphabetique() {
    const data = await getAllArtistes();
    console.log("TEST 3 : Artistes par ordre alphabétique");
    console.table(data.map(a => ({ nom: a.nom })));
}

async function t4_artisteId(id) {
    const data = await getArtisteById(id);
    console.log("TEST 4 : Infos complètes Artiste");
    console.log(JSON.stringify(data, null, 2));
}

async function t5_sceneId(id) {
    const data = await getSceneById(id);
    console.log("TEST 5 : Infos complètes Scène");
    console.log(JSON.stringify(data, null, 2));
}

async function t6_artistesParSceneId(id) {
    const data = await getArtistesBySceneId(id);
    console.log("TEST 6 : Programmation Scène par ID");
    data.forEach(p => console.log(`${p.date} : ${p.expand.artiste.map(a => a.nom).join(', ')}`));
}

async function t7_artistesParSceneNom(nom) {
    const data = await getArtistesBySceneNom(nom);
    console.log(`TEST 7 : Programmation Scène par Nom (${nom})`);
    data.forEach(p => console.log(`${p.date} : ${p.expand.artiste.map(a => a.nom).join(', ')}`));
}

async function t8_save() {
    const newArt = await saveArtiste({ nom: "Artiste Test", style_artiste: "Dub" });
    console.log("TEST 8 : Sauvegarde réussie. ID créé :", newArt.id);
}

// --- EXÉCUTION (Décommentez pour tester) ---

// await t1_artistesParDate();
// await t2_toutesLesScenes();
// await t3_artistesAlphabetique();
// await t4_artisteId("4cv7iu1vp1eip8r"); // ID de Dawa Hifi
// await t5_sceneId("e6057f703o3lbai");
// await t7_artistesParSceneNom("SCÈNE UBUNTU");
// await t8_save();