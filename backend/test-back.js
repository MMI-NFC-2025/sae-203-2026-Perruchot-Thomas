import { 
    getAllArtistes, getArtisteById, saveArtiste,
    getAllScenes, getSceneById, saveScene,
    getArtistesByDate, getProgrammationByScene,
    getAllArtistesSortedByDate, getArtistesBySceneId,
    getArtistesBySceneNom, ajouterArtiste, sendContact
} from './backend.mjs';

async function test1_getAllArtistes() {
    console.log((await getAllArtistes()).length);
}

async function test2_getArtisteById() {
    const a = await getAllArtistes();
    if (a.length) console.log((await getArtisteById(a[0].id))?.nom);
    else console.log('e');
}

async function test3_saveArtiste() {
    const s = await saveArtiste({ nom: "Artiste de Test", genre: "Test" });
    console.log(s?.id || 'e');
}

async function test4_getAllScenes() {
    console.log((await getAllScenes()).length);
}

async function test5_getSceneById() {
    const s = await getAllScenes();
    if (s.length) console.log((await getSceneById(s[0].id))?.nom);
    else console.log('e');
}

async function test6_saveScene() {
    const s = await saveScene({ nom: "Scène de Test" });
    console.log(s?.id || 'e');
}

async function test7_getArtistesByDate() {
    console.log((await getArtistesByDate("2026-10-31")).length);
}

async function test8_getProgrammationByScene() {
    const s = await getAllScenes();
    if (s.length) console.log((await getProgrammationByScene(s[0].id)).length);
    else console.log('e');
}

async function test9_getAllArtistesSortedByDate() {
    console.log((await getAllArtistesSortedByDate()).length);
}

async function test10_getArtistesBySceneId() {
    const s = await getAllScenes();
    if (s.length) console.log((await getArtistesBySceneId(s[0].id)).length);
    else console.log('e');
}

async function test11_getArtistesBySceneNom() {
    const s = await getAllScenes();
    if (s.length) console.log((await getArtistesBySceneNom(s[0].nom)).length);
    else console.log('e');
}

async function test12_ajouterArtiste() {
    const a = await ajouterArtiste("Artiste Rapide", "Electro");
    console.log(a?.id || 'e');
}

async function test13_sendContact() {
    console.log(await sendContact({ nom: "Test", email: "test@test.fr", message: "Ceci est un test" }));
}

// await test1_getAllArtistes();
// await test2_getArtisteById();
// await test3_saveArtiste();
// await test4_getAllScenes();
// await test5_getSceneById();
// await test6_saveScene();
// await test7_getArtistesByDate();
// await test8_getProgrammationByScene();
// await test9_getAllArtistesSortedByDate();
// await test10_getArtistesBySceneId();
// await test11_getArtistesBySceneNom();
// await test12_ajouterArtiste();
// await test13_sendContact();