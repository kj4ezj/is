const is = require('./is.js');

afterEach(() => {
    jest.clearAllMocks();
});

describe('is.js', () => {
    test('exists', () => expect(is).toBeTruthy());

    describe('is.nullOrEmpty()', () => {
        test('exists', () => expect(is.nullOrEmpty).toBeTruthy());
    });
});
