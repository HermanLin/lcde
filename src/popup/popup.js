'use strict';

const lcdeButton = document.getElementById('lcde-button');
lcdeButton.addEventListener('click', () => {
    onClick();

    setTimeout(function () {
        window.close();
    }, 100);
});

async function onClick() {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    const results = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractProblem,
    });
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'extractProblem-error') {
        alert(JSON.stringify(message.content));
    }
});
