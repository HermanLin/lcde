const { describe, expect } = require('@jest/globals');
const { join, wrapValue } = require('../src/utils/utilities');

describe('join', () => {
    it('joined string separated by two newline chars', () => {
        const a = 'foo';
        const b = 'bar';

        expect(join(a, b)).toBe('foo\n\nbar');
    });
});

describe('wrapValue', () => {
    const wrapper = '_';
    const value = 'foobar';

    it('basic wrap', () => {
        expect(wrapValue(value, wrapper, false, false)).toBe('_foobar_');
    });

    it('wrap with left space', () => {
        expect(wrapValue(value, wrapper, true, false)).toBe(' _foobar_');
    });

    it('wrap with right space', () => {
        expect(wrapValue(value, wrapper, false, true)).toBe('_foobar_ ');
    });

    it('wrap with space on both ends', () => {
        expect(wrapValue(value, wrapper, true, true)).toBe(' _foobar_ ');
    });
});
