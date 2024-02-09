const api = 'https://autodialer-fi4z.onrender.com/api/'
const target = document.querySelector('html');
const observer = new MutationObserver(() => { findMatchesInTextNodes(document.body) });
observer.observe(target, { characterData: true, subtree: true, attributes: true });
const phoneRegex = /(?:\+\d{1,3}[\s-]?)\(?\d{2,4}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}(?![\s\/])\b/m;


async function setElement() {
    const key = await chrome.storage.local.get(['id']);
    const elements = document.querySelectorAll('.lrd-db--phone__link');
    if (elements.length !== 0) {
        elements.forEach((i) => {
            let link = ''
            if (i.hasAttribute("data")) {
                link = i.getAttribute("data")
            } else {
                link = i.href.split(':')[1];
                i.setAttribute("data", link);
                i.removeAttribute('href');
            }
            i.onclick = async () => {
                const res = await fetch(api + 'set/' + key.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: link })
                })
            }
        })
    } else {
        setTimeout(() => { setElement() }, 500)
    }
}

async function sendData(link) {
    const key = await chrome.storage.local.get(['id']);
    const res = await fetch(api + 'set/' + key.id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: link })
    })
}


function findMatchesInTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        var matches = node.textContent.match(phoneRegex);
        if (matches !== null) {
            node.parentNode.onclick = () => {
                sendData(matches[0]);
            }
            node.parentNode.style.backgroundColor = "rgba(252,127,3,0.5)"
            if (node.parentNode.nodeName.toLowerCase() === 'a') {
                node.parentNode.removeAttribute('href')
            }
        }
    } else {
        node.childNodes.forEach(findMatchesInTextNodes);
    }
}


