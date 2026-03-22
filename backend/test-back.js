import { 
    getArtistesByDate, getAllScenes, getAllArtistes,
    getArtisteById, getSceneById, getArtistesBySceneId,
    getArtistesBySceneNom, saveArtiste, saveScene
} from './backend.mjs';


async function t1_artistesParDate() {
    const data = await getArtistesByDate(""); 
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
    
    data.forEach(p => {
        const noms = Array.isArray(p.expand.artiste) 
            ? p.expand.artiste.map(a => a.nom).join(', ') 
            : p.expand.artiste.nom;
        console.log(`${p.date} : ${noms}`);
    });
}

async function t7_artistesParSceneNom(nom) {
    const data = await getArtistesBySceneNom(nom);
    console.log(`TEST 7 : Programmation Scène par Nom (${nom})`);
    data.forEach(p => {
        const noms = Array.isArray(p.expand.artiste) 
            ? p.expand.artiste.map(a => a.nom).join(', ') 
            : p.expand.artiste.nom;
        console.log(`${p.date} : ${noms}`);
    });
}

async function t8_save() {
    const newArt = await saveArtiste({ nom: "Artiste Test", style_artiste: "Dub" });
    console.log("TEST 8 : Sauvegarde réussie. ID créé :", newArt.id);
}


console.log(hr);
await t1_artistesParDate();
console.log(hr);
await t2_toutesLesScenes();
console.log(hr);
await t3_artistesAlphabetique();
console.log(hr);
await t4_artisteId("nnd4p6m68gmqxd0");
console.log(hr);
await t5_sceneId("d93yeldcupcmmu9"); 
console.log(hr);
await t6_artistesParSceneId("d93yeldcupcmmu9");
console.log(hr);
await t7_artistesParSceneNom("SCÈNE UBUNTU");
console.log(hr);
await t8_save();
console.log(hr);



async function test() {
    console.log("--- Début du test ---");
    const dateATester = "2026-10-31";  
    const artistes = await getArtistesByDate(dateATester);
    
    console.log(`Test pour la date : ${dateATester}`);
    console.log(`Nombre d'artistes trouvés : ${artistes.length}`);
    
    if (artistes.length > 0) {
        artistes.forEach(a => {
            console.log(`- Artiste trouvé : ${a.nom} (Genre : ${a.genre})`);
        });
    } else {
        console.log("Aucun artiste trouvé. Vérifiez vos API Rules ou le format de la date.");
    }
    console.log("--- Fin du test ---");
}

await test();