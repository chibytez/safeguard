

describe("Time Page", () => {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').clear().type('Admin')
        cy.get('[name="password"]').clear().type('admin123')
        cy.get('[type="submit"]').click()
    })

    it("should be able to view Time sheet Page ", () => {
        cy.get('a[href*="/web/index.php/time/viewTimeModule"]').click()

        cy.intercept('GET', '*web/index.php/api/v2/time/employees/timesheets/list*', {fixture: 'list.json'}).as('getList')

        cy.wait('@getList', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
            cy.wrap(interception.response.body.data.length).should('eq', 12)
            cy.wrap(interception.response.body.data[0].employee.lastName).should('eq', 'Collings')
            cy.wrap(interception.response.body.data[0].employee.firstName).should('eq', 'Paul')
            cy.wrap(interception.response.body.data[0].status.id).should('eq', 'SUBMITTED')
        })

        cy.get(".oxd-text.oxd-text--h6.orangehrm-main-title").eq(1).should('be.visible').and('have.text', 'Timesheets Pending Action')

    })

    it('should view employee timesheet', () => {

        cy.get('a[href*="/web/index.php/time/viewTimeModule"]').click()
        cy.get('.oxd-button.oxd-button--medium.oxd-button--text.oxd-table-cell-action-space').eq(1).click({force:true})

        cy.intercept('GET', '*web/index.php/api/v2/time/timesheets/default*').as('getDefault')
        cy.intercept('GET', '*web/index.php/api/v2/leave/workweek*').as('getWeekweek')

        cy.wait('@getDefault', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
        })

        cy.wait('@getWeekweek', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
        })
        cy.get('.oxd-text.oxd-text--h6.orangehrm-main-title').should('be.visible').and('include.text', 'Timesheet')

    })

    it('should view employee appointment records', () => {
        cy.get('a[href*="/web/index.php/time/viewTimeModule"]').click()
        cy.get('.oxd-topbar-body-nav-tab-item').eq(1).click()
        cy.get('.oxd-topbar-body-nav-tab-link').eq(2).click()

        cy.intercept('GET', '*web/index.php/api/v2/attendance/employees/summary*', {fixture: 'summary.json'}).as('getSummary')

        cy.wait('@getSummary', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
            cy.wrap(interception.response.body.data.length).should('eq', 46)
            cy.wrap(interception.response.body.data[0].lastName).should('eq', 'Adalwin')
            cy.wrap(interception.response.body.data[0].firstName).should('eq', 'Odis')
        }) 

    })
})