/// <reference types="cypress" />

describe("Render Patient Search", () => {

    it('Load all patients', () => {
        cy.visit('/');
        cy.get('button').click();
        cy.wait(3000);
        cy.get('ul').should('exist');
    });
    

    it('Type "Job" to search Steve jobs', () => {
        cy.visit('/');
        cy.get('input').type('Jo');
        cy.wait(3000);
        cy.get('ul').should('exist');
        cy.get('ul > li').contains('Jo').should('exist');;
    });

    it('Type "Judith Faulkner" to search Steve jobs', () => {
        cy.visit('/');
        cy.get('input').type('Judith Faulkner');
        cy.wait(3000);
        cy.get('ul').should('exist');
        cy.get('ul > li').contains('Judith Faulkner').should('exist');;
    });

    it('Type "J" to search all records includes letter "J"', () => {
        cy.visit('/');
        cy.get('input').type('J');
        cy.wait(3000);
        cy.get('ul').should('exist');
        cy.get('ul > li').contains('J').should('exist');;

    });

    it('Type "Ju" to search "Judith Faulkner"', () => {
        cy.visit('/');
        cy.get('input').type('Ju');
        cy.wait(3000);
        cy.get('ul').should('exist');
        cy.get('ul > li').contains('Ju').should('exist');

    });

    it('Type "empty space"', () => {
        cy.visit('/');
        cy.get('input').type(' ');
        cy.wait(3000);
        cy.get('ul').should('not.exist');
    });

    

});