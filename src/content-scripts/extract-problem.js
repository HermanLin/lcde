'use-strict';

/**
 * Extract the LC problem from the page
 * @returns {object} the LC Problem
 */
function extractProblem() {
    try {
        problemTitle = document.title.split(' - LeetCode')[0];
        problemElements = document.body.querySelectorAll('div');

        // regex for "<number>. <title>"
        titleRegex = new RegExp(`^\\d+\\.\\s+${problemTitle}$`);
        titleMatch = Array.from(problemElements)
            .find((elem) => titleRegex.test(elem.textContent.trim()))
            .textContent.split('.');

        problemNumber = titleMatch[0].trim();

        // difficulty will have an class of text-difficulty-<easy/medium/hard>
        problemDifficulty = document.body.querySelector(
            '[class*="text-difficulty-easy"], [class*="text-difficulty-medium"], [class*="text-difficulty-hard"]',
        ).textContent;

        // problem description at class="elfjS"
        problemDescription = document.body.querySelector('[data-track-load="description_content"]');

        stack = [{ node: problemDescription, parent: null }];
        description = null;

        while (stack.length > 0) {
            let { node, parent } = stack.pop();

            let value = node.nodeValue || node.textContent;
            value = value.replace(/\u00a0/g, '');

            nodeObj = {
                nodeName: node.nodeName,
                nodeType: node.nodeType,
                nodeValue: value,
                childNodes: [],
                hasPrev:
                    node.previousSibling && node.parentElement !== problemDescription
                        ? true
                        : false,
                hasNext: node.nextSibling ? true : false,
            };

            if (!parent) {
                description = nodeObj;
            } else {
                parent.childNodes.push(nodeObj);
            }

            for (let i = node.childNodes.length - 1; i >= 0; i--) {
                if (node.nodeType !== 3) stack.push({ node: node.childNodes[i], parent: nodeObj });
            }
        }

        browser.runtime.sendMessage({
            type: 'extractProblem-result',
            content: {
                link: document.URL,
                number: problemNumber,
                title: problemTitle,
                difficulty: problemDifficulty,
                description,
            },
        });
    } catch (error) {
        browser.runtime.sendMessage({
            type: 'extractProblem-error',
            content: {
                name: error.name,
                message: error.message,
            },
        });
    }
}
