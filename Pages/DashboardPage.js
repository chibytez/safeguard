class DashboardPage {

    dashboardHeader() {
        return cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module')
    }

    dashboardUrl() {
        return cy.url()
    }

    dashboardTitle() {
        return cy.title()
    }
}

export default new DashboardPage()