/* eslint {no-new-wrappers:0} */
const is = require('./is.js');

/* test fixtures */
const STRING = 'The quick brown fox jumps over the lazy dog';
const WHITESPACE = '  \v  \t \r\n    \n\f ';

/* test cases */
afterEach(() => {
    jest.clearAllMocks();
});

describe('is.js', () => {
    test('exists', () => expect(is).toBeTruthy());

    /* is.nullOrEmpty() unit tests */
    describe('is.nullOrEmpty()', () => {
        test('exists', () => expect(is.nullOrEmpty).toBeTruthy());

        describe('given a function that returns', () => { // these should all be false, functions are non-empty for our purposes
            test('empty string literal', () => expect(is.nullOrEmpty(() => '')).toEqual(false));
            test('empty string object', () => expect(is.nullOrEmpty(() => new String(''))).toEqual(false));
            test('false', () => expect(is.nullOrEmpty(() => false)).toEqual(false));
            test('non-empty string', () => expect(is.nullOrEmpty(() => STRING)).toEqual(false));
            test('null', () => expect(is.nullOrEmpty(() => null)).toEqual(false));
            test('true', () => expect(is.nullOrEmpty(() => true)).toEqual(false));
            test('undefined', () => expect(is.nullOrEmpty(() => undefined)).toEqual(false));
            test('whitespace', () => expect(is.nullOrEmpty(() => WHITESPACE)).toEqual(false));
        });

        describe('given a literal', () => {
            test('empty string', () => expect(is.nullOrEmpty('')).toEqual(true));
            test('false', () => expect(is.nullOrEmpty(false)).toEqual(false));
            test('non-empty string', () => expect(is.nullOrEmpty(STRING)).toEqual(false));
            test('null', () => expect(is.nullOrEmpty(null)).toEqual(true));
            test('true', () => expect(is.nullOrEmpty(true)).toEqual(false));
            test('undefined', () => expect(is.nullOrEmpty(undefined)).toEqual(true));
            test('whitespace', () => expect(is.nullOrEmpty(WHITESPACE)).toEqual(true));
        });

        describe('given a primitive object', () => { // primitive objects are treated differently than primitive literals sometimes
            test('empty string', () => expect(is.nullOrEmpty(new String(''))).toEqual(true));
            test('false', () => expect(is.nullOrEmpty(new Boolean(false))).toEqual(false));
            test('non-empty string', () => expect(is.nullOrEmpty(new String(STRING))).toEqual(false));
            test('true', () => expect(is.nullOrEmpty(new Boolean(true))).toEqual(false));
            test('whitespace', () => expect(is.nullOrEmpty(new String(WHITESPACE))).toEqual(true));
        });
    });

    /* is.string() unit tests */
    describe('is.string()', () => {
        test('exists', () => expect(is.string).toBeTruthy());

        describe('given a function that returns', () => { // these should all be false, functions aren't strings
            test('empty string literal', () => expect(is.string(() => '')).toEqual(false));
            test('empty string object', () => expect(is.string(() => new String(''))).toEqual(false));
            test('false', () => expect(is.string(() => false)).toEqual(false));
            test('non-empty string', () => expect(is.string(() => STRING)).toEqual(false));
            test('null', () => expect(is.string(() => null)).toEqual(false));
            test('true', () => expect(is.string(() => true)).toEqual(false));
            test('undefined', () => expect(is.string(() => undefined)).toEqual(false));
            test('whitespace', () => expect(is.string(() => WHITESPACE)).toEqual(false));
        });

        describe('given a literal', () => {
            test('empty string', () => expect(is.string('')).toEqual(true));
            test('false', () => expect(is.string(false)).toEqual(false));
            test('non-empty string', () => expect(is.string(STRING)).toEqual(true));
            test('null', () => expect(is.string(null)).toEqual(false));
            test('true', () => expect(is.string(true)).toEqual(false));
            test('undefined', () => expect(is.string(undefined)).toEqual(false));
            test('whitespace', () => expect(is.string(WHITESPACE)).toEqual(true));
        });

        describe('given a primitive object', () => { // primitive objects are treated differently than primitive literals sometimes
            test('empty string', () => expect(is.string(new String(''))).toEqual(true));
            test('false', () => expect(is.string(new Boolean(false))).toEqual(false));
            test('non-empty string', () => expect(is.string(new String(STRING))).toEqual(true));
            test('true', () => expect(is.string(new Boolean(true))).toEqual(false));
            test('whitespace', () => expect(is.string(new String(WHITESPACE))).toEqual(true));
        });
    });
});
