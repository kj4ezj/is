/* eslint {no-loss-of-precision:0, no-new-wrappers:0} */
const is = require('./is.js');

/* test fixtures */
const BIGINT = BigInt(81129638414606663681390495662081);
const FALSE = false;
const NEGATIVE_NUMBER = -1;
const POSITIVE_NUMBER = 18650;
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
            test('empty string literal', () => expect(is.nullOrEmpty(() => '')).toEqual(FALSE));
            test('empty string object', () => expect(is.nullOrEmpty(() => new String(''))).toEqual(FALSE));
            test('false', () => expect(is.nullOrEmpty(() => false)).toEqual(FALSE));
            test('negative number', () => expect(is.nullOrEmpty(() => NEGATIVE_NUMBER)).toEqual(FALSE));
            test('non-empty string', () => expect(is.nullOrEmpty(() => STRING)).toEqual(FALSE));
            test('null', () => expect(is.nullOrEmpty(() => null)).toEqual(FALSE));
            test('number literal', () => expect(is.nullOrEmpty(() => POSITIVE_NUMBER)).toEqual(FALSE));
            test('number object', () => expect(is.nullOrEmpty(() => new Number(POSITIVE_NUMBER))).toEqual(FALSE));
            test('true', () => expect(is.nullOrEmpty(() => true)).toEqual(FALSE));
            test('undefined', () => expect(is.nullOrEmpty(() => undefined)).toEqual(FALSE));
            test('whitespace', () => expect(is.nullOrEmpty(() => WHITESPACE)).toEqual(FALSE));
            test('zero literal', () => expect(is.nullOrEmpty(() => 0)).toEqual(FALSE));
            test('zero object', () => expect(is.nullOrEmpty(() => new Number(0))).toEqual(FALSE));
        });

        describe('given a literal', () => {
            test('bigint', () => expect(is.nullOrEmpty(BIGINT)).toEqual(false));
            test('empty string', () => expect(is.nullOrEmpty('')).toEqual(true));
            test('false', () => expect(is.nullOrEmpty(false)).toEqual(false));
            test('negative number', () => expect(is.nullOrEmpty(NEGATIVE_NUMBER)).toEqual(false));
            test('non-empty string', () => expect(is.nullOrEmpty(STRING)).toEqual(false));
            test('null', () => expect(is.nullOrEmpty(null)).toEqual(true));
            test('number', () => expect(is.nullOrEmpty(POSITIVE_NUMBER)).toEqual(false));
            test('true', () => expect(is.nullOrEmpty(true)).toEqual(false));
            test('undefined', () => expect(is.nullOrEmpty(undefined)).toEqual(true));
            test('whitespace', () => expect(is.nullOrEmpty(WHITESPACE)).toEqual(true));
            test('zero', () => expect(is.nullOrEmpty(0)).toEqual(false));
        });

        describe('given a primitive object', () => { // primitive objects are treated differently than primitive literals sometimes
            test('empty string', () => expect(is.nullOrEmpty(new String(''))).toEqual(true));
            test('false', () => expect(is.nullOrEmpty(new Boolean(false))).toEqual(false));
            test('negative number', () => expect(is.nullOrEmpty(new Number(NEGATIVE_NUMBER))).toEqual(false));
            test('non-empty string', () => expect(is.nullOrEmpty(new String(STRING))).toEqual(false));
            test('number', () => expect(is.nullOrEmpty(new Number(POSITIVE_NUMBER))).toEqual(false));
            test('true', () => expect(is.nullOrEmpty(new Boolean(true))).toEqual(false));
            test('whitespace', () => expect(is.nullOrEmpty(new String(WHITESPACE))).toEqual(true));
            test('zero', () => expect(is.nullOrEmpty(new Number(0))).toEqual(false));
        });
    });

    /* is.string() unit tests */
    describe('is.string()', () => {
        test('exists', () => expect(is.string).toBeTruthy());

        describe('given a function that returns', () => { // these should all be false, functions aren't strings
            test('empty string literal', () => expect(is.string(() => '')).toEqual(FALSE));
            test('empty string object', () => expect(is.string(() => new String(''))).toEqual(FALSE));
            test('false', () => expect(is.string(() => false)).toEqual(FALSE));
            test('negative number', () => expect(is.string(() => NEGATIVE_NUMBER)).toEqual(FALSE));
            test('non-empty string', () => expect(is.string(() => STRING)).toEqual(FALSE));
            test('null', () => expect(is.string(() => null)).toEqual(FALSE));
            test('number literal', () => expect(is.string(() => POSITIVE_NUMBER)).toEqual(FALSE));
            test('number object', () => expect(is.string(() => new Number(POSITIVE_NUMBER))).toEqual(FALSE));
            test('true', () => expect(is.string(() => true)).toEqual(FALSE));
            test('undefined', () => expect(is.string(() => undefined)).toEqual(FALSE));
            test('whitespace', () => expect(is.string(() => WHITESPACE)).toEqual(FALSE));
            test('zero literal', () => expect(is.string(() => 0)).toEqual(FALSE));
            test('zero object', () => expect(is.string(() => new Number(0))).toEqual(FALSE));
        });

        describe('given a literal', () => {
            test('bigint', () => expect(is.string(BIGINT)).toEqual(false));
            test('empty string', () => expect(is.string('')).toEqual(true));
            test('false', () => expect(is.string(false)).toEqual(false));
            test('negative number', () => expect(is.string(NEGATIVE_NUMBER)).toEqual(false));
            test('non-empty string', () => expect(is.string(STRING)).toEqual(true));
            test('null', () => expect(is.string(null)).toEqual(false));
            test('number', () => expect(is.string(POSITIVE_NUMBER)).toEqual(false));
            test('true', () => expect(is.string(true)).toEqual(false));
            test('undefined', () => expect(is.string(undefined)).toEqual(false));
            test('whitespace', () => expect(is.string(WHITESPACE)).toEqual(true));
            test('zero', () => expect(is.string(0)).toEqual(false));
        });

        describe('given a primitive object', () => { // primitive objects are treated differently than primitive literals sometimes
            test('empty string', () => expect(is.string(new String(''))).toEqual(true));
            test('false', () => expect(is.string(new Boolean(false))).toEqual(false));
            test('negative number', () => expect(is.string(new Number(NEGATIVE_NUMBER))).toEqual(false));
            test('non-empty string', () => expect(is.string(new String(STRING))).toEqual(true));
            test('number', () => expect(is.string(new Number(POSITIVE_NUMBER))).toEqual(false));
            test('true', () => expect(is.string(new Boolean(true))).toEqual(false));
            test('whitespace', () => expect(is.string(new String(WHITESPACE))).toEqual(true));
            test('zero', () => expect(is.string(new Number(0))).toEqual(false));
        });
    });
});
