const api = 'https://autodialer-fi4z.onrender.com/api/'

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "autoDialer",
        title: "Send data to phone",
        type: 'normal',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener(async (item, tab) => {
    const tld = item.menuItemId;
    if (tld === 'autoDialer') {
        console.log("Selected data: " + item.selectionText)
        const key = await chrome.storage.local.get(['id']);
        const res = await fetch(api + 'set/' + key.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: item.selectionText })
        })
    }
});
