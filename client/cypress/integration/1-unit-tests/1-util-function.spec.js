/// <reference types="cypress" />

import { add } from '../../../src/lib/utils';
import { classNames } from '../../../src/lib/classNames';

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

        expect(classNames(argument)).to.be.a('string');
        expect(classNames(argument)).to.equal('0 1 2 3 4 5 6 7 8 9');

        expect(classNames(invalidArgument)).to.be.a('string');
        expect(classNames(invalidArgument)).to.be.empty();
    });
});
