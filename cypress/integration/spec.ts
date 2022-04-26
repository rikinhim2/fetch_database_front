// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Hello world test', () => {
  it('shows learn link', () => {
    cy.visit('http://localhost:3000');
    cy.get('a').should('have.text', 'hello world!');
  });
});
