
describe('Login', () => {
  beforeEach('passes', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('should not login a user without a password', () => {
      cy.get('[name="username"]').clear().type('Admin')
      cy.get('[type="submit"]').click()
      cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('be.visible').and('have.text', 'Required')
      cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('not.exist')
  })

  it('should not login with no username', () => {
    cy.get('[name="password"]').clear().type('admin123')
    cy.get('[type="submit"]').click()
      cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('be.visible').and('have.text', 'Required')
      cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('not.exist')
  })

  it('should not login with invalid username', () => {
    cy.get('[name="username"]').clear().type('Test')
    cy.get('[name="password"]').clear().type('admin123')
    cy.get('[type="submit"]').click()
    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').should('be.visible').and('have.text', 'Invalid credentials')
    cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('not.exist')
  })

  it('should not login with invalid password', () => {
    cy.get('[name="username"]').clear().type('Admin')
    cy.get('[name="password"]').clear().type('adm123')
    cy.get('[type="submit"]').click()
    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').should('be.visible').and('have.text', 'Invalid credentials')
    cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('not.exist')
  })

  it('should login with a valid username and password', () => {
    cy.get('[name="username"]').clear().type('Admin')
    cy.get('[name="password"]').clear().type('admin123')
    cy.get('[type="submit"]').click()
    cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('be.visible').and('have.text', 'Dashboard')
    //cy.get('.oxd-userdropdown-name').should('be.visible').and('have.text', 'Paul Collings')
    cy.url().should('include', '/dashboard/index')
    cy.title().should('contain', 'OrangeHRM')
  })


})