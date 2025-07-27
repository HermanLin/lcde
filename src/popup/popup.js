'use strict';

document.addEventListener('DOMContentLoaded', async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const lcdeButton = document.getElementById('lcde-button');
    const urlCheck = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['../content-scripts/verify-url.js'],
    });

    const problemAvailable = urlCheck[0]?.result;
    if (problemAvailable) {
        lcdeButton.disabled = false;
        lcdeButton.addEventListener('click', async () => {
            onClick(tab.id);
            setTimeout(function () {
                window.close();
            }, 100);
        });
    } else {
        const resultEl = document.getElementById('lcde-result');
        resultEl.textContent = 'Problem description unavailable';
    }
});

async function onClick(tabId) {
    await browser.scripting.executeScript({
        target: { tabId },
        func: extractProblem,
    });
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'extractProblem-error') {
        alert(JSON.stringify(message.content));
    }
});
