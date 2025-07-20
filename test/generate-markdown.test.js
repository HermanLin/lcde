const { describe, expect } = require('@jest/globals');
const { generateMarkdown } = require('../src/utils/generate-markdown');

global.Blob = jest.fn((content, options) => {
    return { content, options };
});

global.URL.createObjectURL = jest.fn(() => 'mockedURL');
global.URL.revokeObjectURL = jest.fn();
global.document.createElement = jest.fn(() => ({
    setAttribute: jest.fn(),
    click: jest.fn(),
}));

describe('generateMarkdown', () => {
    const content = {
        link: 'link.com',
        number: 1,
        title: 'Foobar',
        difficulty: 'Easy',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };

    const blobExpected = [
        '[link](link.com)\n\n',
        '# 1: Foobar\n\n',
        '**Easy**\n\n',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ];

    beforeAll(() => {
        generateMarkdown(content);
    });

    test('should generate a Blob with the correct content', () => {
        expect(Blob).toHaveBeenCalledWith(blobExpected, { type: 'text/markdown' });
    });

    test('should create a URL with the Blob', () => {
        expect(URL.createObjectURL).toHaveBeenCalledWith(
            expect.objectContaining({
                content: blobExpected,
                options: { type: 'text/markdown' },
            }),
        );
    });

    test('should create an anchor element', () => {
        expect(document.createElement).toHaveBeenCalledWith('a');
    });

    test('should revoke the URL after it is used', () => {
        expect(URL.revokeObjectURL).toHaveBeenCalledWith('mockedURL');
    });
});
