class TimeSheetPage {
    timeSheetPage() {
        return cy.get('a[href*="/web/index.php/time/viewTimeModule"]').click()
    }

    headerTitle() {
        return   cy.get(".oxd-text.oxd-text--h6.orangehrm-main-title")
    }

    employeeTimeSheetPage() {
        return cy.get('.oxd-button.oxd-button--medium.oxd-button--text.oxd-table-cell-action-space')
    }

    appointmentOptions() {
        return cy.get('.oxd-topbar-body-nav-tab-item').eq(1).click()
    }

    employeeRecords() {
        return cy.get('.oxd-topbar-body-nav-tab-link').eq(2).click()
    }
}

export default new TimeSheetPage()