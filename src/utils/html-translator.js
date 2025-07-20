/**
 * Convert HTML into a Markdown string
 * @param {object} parentNode The node containing the problem
 * @returns {string} Markdown string
 */
function convertToMarkdownString(parentNode) {
    return Array.prototype.reduce.call(
        parentNode.childNodes,
        (output, node) => {
            return join(output, translateNode(node));
        },
        '',
    );
}

/**
 * Translate an HTMLElement into its corresponding Markdown string
 * @param {HTMLElement} node The HTML element to translate
 * @returns {string} The Markdown string
 */
function translateNode(node) {
    var output = '';

    switch (node.nodeName) {
        case 'P':
            for (let child of node.childNodes) {
                output += translateNode(child);
            }
            break;
        case 'SPAN':
        case 'BUTTON':
            for (let child of node.childNodes) {
                output += translateNode({
                    ...child,
                    hasPrev: node.hasPrev,
                    hasNext: node.hasNext,
                });
            }
            break;
        case '#text':
            output = node.nodeValue.trim();
            break;
        case 'STRONG':
            output = wrapValue(node.nodeValue, '**', node.hasPrev, node.hasNext);
            break;
        case 'PRE':
            output += '```\n';
            for (let child of node.childNodes) {
                output += child.nodeValue;
            }
            output.trimEnd();
            output += '```\n';
            break;
        case 'CODE':
            for (let child of node.childNodes) {
                output += translateNode(child);
            }
            output = wrapValue(output, '`', node.hasPrev, node.hasNext);
            break;
        case 'EM':
            for (let child of node.childNodes) {
                output += translateNode(child);
            }
            output = wrapValue(output, '_', node.hasPrev, node.hasNext);
            break;
        case 'SUP':
            output = '^' + node.nodeValue;
            break;
        case 'SUB':
            output = '_' + node.nodeValue;
            break;
        case 'UL':
            for (let child of node.childNodes) {
                if (child.nodeName === 'LI') {
                    output += '- ';
                    for (let grandchild of child.childNodes) {
                        output += translateNode(grandchild);
                    }
                    output += '\n';
                }
            }
            break;
    }

    return output;
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'extractProblem-result') {
        console.log('message receieved');
        const { link, number, title, difficulty, description } = message.content;
        const lcProblem = new LCProblem(link, number, title, difficulty, description);

        lcProblem.description = convertToMarkdownString(lcProblem.description);
        generateMarkdown(lcProblem);
    }
});

module.exports = { convertToMarkdownString, translateNode };
