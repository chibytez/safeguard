import loginPage from "../../Pages/LoginPage"
import TestConstants from "../fixtures/testData/testConstants.json"
import timeSheet from "../../Pages/TimeSheetPage"

describe("Timesheet Page", () => {
    beforeEach(() => {
        loginPage.launchUrl('/')
        loginPage.inputUsername(TestConstants.validUsername)
        loginPage.inputPassword(TestConstants.ValidPassword)
        loginPage.submitLogin()
    })

    it("should be able to view Time sheet Page ", () => {
        timeSheet.timeSheetPage()
        cy.intercept('GET', '*web/index.php/api/v2/time/employees/timesheets/list*', {fixture: 'list.json'}).as('getList')

        cy.wait('@getList', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
            cy.wrap(interception.response.body.data.length).should('eq', 12)
            cy.wrap(interception.response.body.data[0].employee.lastName).should('eq', TestConstants.ListLastName)
            cy.wrap(interception.response.body.data[0].employee.firstName).should('eq', TestConstants.ListFirstName)
            cy.wrap(interception.response.body.data[0].status.id).should('eq', TestConstants.ListId)
        })
        timeSheet.headerTitle().eq(1).should('be.visible').and('have.text', TestConstants.PendingAction)

    })

    it('should view employee timesheet', () => {

        timeSheet.timeSheetPage()
        timeSheet.employeeTimeSheetPage().eq(1).click({force:true})

        cy.intercept('GET', '*web/index.php/api/v2/time/timesheets/default*').as('getDefault')
        cy.intercept('GET', '*web/index.php/api/v2/leave/workweek*').as('getWeekweek')

        cy.wait('@getDefault', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
        })

        cy.wait('@getWeekweek', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
        })
        timeSheet.headerTitle().should('be.visible').and('include.text', TestConstants.TimeSheetTitle)

    })

    it('should view employee appointment records', () => {
        timeSheet.timeSheetPage()
        timeSheet.appointmentOptions()
        timeSheet.employeeRecords()
        cy.intercept('GET', '*web/index.php/api/v2/attendance/employees/summary*', {fixture: 'summary.json'}).as('getSummary')

        cy.wait('@getSummary', { timeout: 10000}).then(interception =>{
            cy.wrap(interception.response.statusCode).should('eq', 200)
            cy.wrap(interception.response.body.data.length).should('eq', 46)
            cy.wrap(interception.response.body.data[0].lastName).should('eq', TestConstants.SummaryLastName)
            cy.wrap(interception.response.body.data[0].firstName).should('eq', TestConstants.SummaryFirstName)
        }) 

    })
})