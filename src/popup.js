import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
const api = 'https://autodialer-fi4z.onrender.com/'

async function createNewKey() {
    const res = await fetch(api + 'new');
    const key = await res.json();
    chrome.storage.local.set({ id: key.key });
    update();
}

async function update() {
    const key = await chrome.storage.local.get(['id']);
    document.getElementById('key').innerHTML = key.id;
}

async function checkOldKey() {
    const key = await chrome.storage.local.get(['id']);
    try {
        const res = await fetch(api + 'check/' + key.id);
        const data = await res.text();
        if (data !== 'ok') {
            chrome.storage.local.set({ id: 'Need to create' });
        }
    } catch {
        chrome.storage.local.set({ id: 'Need to create' });
    }
    update();
}

window.addEventListener("load",async () => {
    document.getElementById('btn').addEventListener("click", () => {
        createNewKey();
    })
    const key = await chrome.storage.local.get(['id']);
    document.getElementById("key").addEventListener("click", async () => { await navigator.clipboard.writeText(key.id)})
    checkOldKey();
})

