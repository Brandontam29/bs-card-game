/// <reference types="cypress" />

import { add } from '../../../src/lib/utils';

describe('Test functions in utils (/src/lib/utils)', () => {
    it('Testing true epxect to be true', () => {
        expect(true).to.equal(true);
    });

    it('Add', () => {
        expect(add(1, 1)).to.equal(2);
    });
});
