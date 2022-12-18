const is = require('./is.js');

afterEach(() => {
    jest.clearAllMocks();
});

describe('is.js', () => {
    test('exists', () => expect(is).toBeTruthy());

    describe('is.nullOrEmpty()', () => {
        test('exists', () => expect(is.nullOrEmpty).toBeTruthy());

        describe('given', () => {
            test('null', () => expect(is.nullOrEmpty(null)).toEqual(true));
        });

        describe('given a function that returns', () => {
            test('null', () => expect(is.nullOrEmpty(() => null)).toEqual(false));
        });
    });

    describe('is.string()', () => {
        test('exists', () => expect(is.string).toBeTruthy());

        describe('given', () => {
            test('null', () => expect(is.string(null)).toEqual(false));
        });

        describe('given a function that returns', () => {
            test('null', () => expect(is.string(() => null)).toEqual(false));
        });
    });
});
