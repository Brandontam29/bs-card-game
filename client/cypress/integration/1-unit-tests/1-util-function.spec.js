/// <reference types="cypress" />

import { add, capitalize } from '../../../src/lib/utils';
import { classNames } from '../../../src/lib/classNames';

describe('Test functions in utils (/src/lib/utils)', () => {
    it('Add', () => {
        expect(add(1, 1)).to.equal(2);
    });

    it('Test className function', () => {
        const argument = [0, 1, '2', { 3: true, 4: false, 5: 1 }, [4, '5 6', '7 8', 3 * 3]];

        const invalidArgument = [
            '',
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

    it('Test capitalize()', () => {
        const upperStr = 'QUEEN';
        const lowerStr = 'queen';

        const digit = 9;
        const number = 33;

        const invalidArgument = null;

        expect(capitalize(upperStr)).to.be.equal('Queen');
        expect(capitalize(lowerStr)).to.equal('Queen');

        expect(capitalize(digit)).to.be.equal(digit);
        expect(capitalize(number)).to.equal(number);
        expect(capitalize(invalidArgument)).to.equal('Error');
    });
});
