const is = require('./is.js');

afterEach(() => {
    jest.clearAllMocks();
});

describe('is.js', () => {
    test('exists', () => expect(is).toBeTruthy());

    describe('is.nullOrEmpty()', () => {
        test('exists', () => expect(is.nullOrEmpty).toBeTruthy());

        describe('given', () => {
            test('false', () => expect(is.nullOrEmpty(false)).toEqual(false));
            test('null', () => expect(is.nullOrEmpty(null)).toEqual(true));
            test('undefined', () => expect(is.nullOrEmpty(undefined)).toEqual(true));
        });

        describe('given a function that returns', () => {
            test('false', () => expect(is.nullOrEmpty(() => false)).toEqual(false));
            test('null', () => expect(is.nullOrEmpty(() => null)).toEqual(false));
            test('undefined', () => expect(is.nullOrEmpty(() => undefined)).toEqual(false));
        });
    });

    describe('is.string()', () => {
        test('exists', () => expect(is.string).toBeTruthy());

        describe('given', () => {
            test('false', () => expect(is.string(false)).toEqual(false));
            test('null', () => expect(is.string(null)).toEqual(false));
            test('undefined', () => expect(is.string(undefined)).toEqual(false));
        });

        describe('given a function that returns', () => {
            test('false', () => expect(is.string(() => false)).toEqual(false));
            test('null', () => expect(is.string(() => null)).toEqual(false));
            test('undefined', () => expect(is.string(() => undefined)).toEqual(false));
        });
    });
});
