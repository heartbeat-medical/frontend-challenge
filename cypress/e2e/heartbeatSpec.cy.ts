import patients from '../fixtures/patients.json';

describe('HeartBeat Basic Flow', () => {  
  it('allows a user to enter the home page ', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Welcome to Heartbeat 🏥' }).should('exist')
    cy.findByRole('heading', { name: 'Please load the patients using the button below or search' }).should('exist')
    cy.findByRole('button', { name: /load all patients/i }).should('exist')
    cy.findByRole('textbox').should('exist')
  })

  describe('successful returns from api', () => {
    beforeEach(() => {
        cy.intercept('/data/patients.json', { fixture: 'patients.json' }).as('getPatients')
    })

    it('loads the patients on button click', () => {
      cy.findByRole('button', { name: /load all patients/i }).click()
      cy.wait('@getPatients')
      cy.get('ul > li').contains(patients[0].name).should('exist')
      cy.get('ul > li').contains(patients[1].name).should('exist')
      cy.get('ul > li').should('have.length', patients.length)
    })
  
    it('searches a patient by name', () => {
      cy.findByRole('textbox').type(patients[0].name)
      cy.get('ul > li').contains(patients[1].name).should('exist')
      cy.get('ul > li').should('have.length', 1)
    })
  })
})
