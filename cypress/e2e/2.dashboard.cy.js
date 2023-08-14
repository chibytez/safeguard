
describe('dashboard', () => {
    beforeEach(()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').clear().type('Admin')
        cy.get('[name="password"]').clear().type('admin123')
        cy.get('[type="submit"]').click()
    })

    it('should refresh dashboard page', () => {
        cy.intercept('GET','*web/index.php/api/v2/dashboard/employees/time-at-work*', {fixture: 'timeAtWork.json'}).as('getWorkTime')
        cy.intercept('GET','*web/index.php/api/v2/dashboard/employees/action-summary', {fixture: 'actionSummary.json'}).as('getActionSummary')
        cy.intercept('GET', '*web/index.php/api/v2/dashboard/shortcuts').as('getShortcut')
        cy.intercept('GET', '*web/index.php/api/v2/buzz/feed*').as('getFeed')
        cy.intercept('GET', '*web/index.php/api/v2/dashboard/employees/leave*').as('getLeaves')
        cy.intercept('GET', '*web/index.php/api/v2/dashboard/employees/subunit', { fixture: 'subUnit.json'}).as('getSubunit')
        cy.intercept('GET', '*web/index.php/api/v2/dashboard/employees/locations', { fixture: 'location.json'}).as('getLocations')


        cy.wait('@getWorkTime', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
            cy.wrap(interception.response.body.data.length).should('eq', 7)
            cy.wrap(interception.response.body.data[0].workDay.day).should('eq', 'Mon')
            cy.wrap(interception.response.body.data[0].workDay.date).should('eq', '2023-08-07')
        })

        cy.wait('@getActionSummary', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
            cy.wrap(interception.response.body.data.length).should('eq', 4)
            cy.wrap(interception.response.body.data[0].group).should('eq', 'Leave Requests To Approve')
            cy.wrap(interception.response.body.data[0].pendingActionCount).should('eq', 9)
        })

        cy.wait('@getShortcut', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
            cy.wrap(interception.response.body.data['leave.assign_leave']).should('be.true')
        })

        cy.wait('@getFeed', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
        })

        cy.wait('@getLeaves', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
        })

        cy.wait('@getSubunit', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
            cy.wrap(interception.response.body.data.length).should('eq', 6)
            cy.wrap(interception.response.body.data[0].subunit.name).should('eq', 'Engineering')
            cy.wrap(interception.response.body.data[0].count).should('eq', 11)
        })

        cy.wait('@getLocations', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
            cy.wrap(interception.response.body.data.length).should('eq', 4)
            cy.wrap(interception.response.body.data[0].location.name).should('eq', 'New York Sales Office')
            cy.wrap(interception.response.body.data[0].count).should('eq', 11)
        })
    })


})