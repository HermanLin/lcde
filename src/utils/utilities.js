'use strict';

/**
 * Wrapper for LeetCode problems
 */
class LCProblem {
    /**
     * @param {string} link The link to the LC problem
     * @param {number} number The problem number
     * @param {string} title The problem title
     * @param {string} difficulty The problem difficulty
     * @param {string} description The problem description
     */
    constructor(link, number, title, difficulty, description) {
        this.link = link;
        this.number = number;
        this.title = title;
        this.difficulty = difficulty;
        this.description = description;
    }
}

/**
 * Combine two strings together with newlines between
 * @param {string} output The precombined string
 * @param {string} toJoin The string to join
 * @returns {string} The joined string
 */
function join(output, toJoin) {
    if (toJoin) return output + '\n\n' + toJoin;
    return output;
}

/**
 * Wrap a value according to its neighbors
 * @param {string} value
 * @param {string} wrapper
 * @param {boolean} hasPrev
 * @param {boolean} hasNext
 * @returns {string} The wrapped value
 */
function wrapValue(value, wrapper, hasPrev, hasNext) {
    var output = '';

    if (hasPrev) output += ' ';
    output += wrapper + value + wrapper;
    if (hasNext) output += ' ';

    return output;
}

module.exports = { LCProblem, join, wrapValue };
