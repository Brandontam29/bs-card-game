/// <reference types="cypress" />

import { add } from '../../../src/lib/utils';
import { className } from '../../../src/lib/className';

describe('Test functions in utils (/src/lib/utils)', () => {
    it('Add', () => {
        expect(add(1, 1)).to.equal(2);
    });

    it('Test className function', () => {
        const argument = [0, 1, '2', { 3: true, 4: false, 5: 1 }, [4, '5 6', '7 8', 3 * 3]];

        const invalidArgument = [
            {},
            [],
            [null, undefined],
            { 3: [], 4: false, 5: 1 },
            [{}, [], [], [], [], { null: null }],
            [[[]]],
            { 10: [] },
        ];

        expect(className(argument)).to.be.a('string');
        expect(className(argument)).to.equal('0 1 2 3 4 5 6 7 8 9');

        expect(className(invalidArgument)).to.be.a('string');
        expect(className(invalidArgument)).to.be.empty();
    });
});
