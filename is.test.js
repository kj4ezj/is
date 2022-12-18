const is = require('./is.js');

afterEach(() => {
    jest.clearAllMocks();
});

describe('is.js', () => {
    test('exists', () => expect(is).toBeTruthy());

    describe('is.nullOrEmpty()', () => {
        test('exists', () => expect(is.nullOrEmpty).toBeTruthy());

        describe('given', () => {
        });

        describe('given a function that returns', () => {
        });
    });

    describe('is.string()', () => {
        test('exists', () => expect(is.string).toBeTruthy());

        describe('given', () => {
        });

        describe('given a function that returns', () => {
        });
    });
});
