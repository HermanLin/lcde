'use strict';

/**
 * Save the LeetCode problem content into a Markdown file.
 * Then, download the Markdown file automatically.
 *
 * @param {LCProblem} content The LeetCode problem
 */
function generateMarkdown(content) {
    const blobContent = [];
    blobContent.push(`[link](${content.link})\n\n`);
    blobContent.push(`# ${content.number}: ${content.title}\n\n`);
    blobContent.push(`**${content.difficulty}**\n\n`);
    blobContent.push(content.description);

    const blob = new Blob(Object.values(blobContent), { type: 'text/markdown' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `description.md`;

    a.click();

    URL.revokeObjectURL(url);
}

module.exports = { generateMarkdown };
