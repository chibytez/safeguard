class LoginPage {

    launchUrl(value) {
        return  cy.visit(value)
    }

    inputUsername(value) {
        return  cy.get('[name="username"]').clear().type(value)
    }

    inputPassword(value) {
        return cy.get('[name="password"]').clear().type(value)
    }

    submitLogin() {
        return cy.get('[type="submit"]').click()
    }

    requiredError() {
        return cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
    }

    credentialError () {
        return cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
    }
}

export default new LoginPage()