import loginPage from "../../Pages/LoginPage"
import dashboardPage from "../../Pages/DashboardPage"
import TestConstants from "../fixtures/testData/testConstants.json"

describe('Login', () => {
  beforeEach("visit url", () => {
    loginPage.launchUrl('/')
  })

  it('should not login a user without a password', () => {
      loginPage.inputUsername(TestConstants.validUsername)
      loginPage.submitLogin()
      loginPage.requiredError().should('be.visible').and('have.text', TestConstants.RequiredError)
      dashboardPage.dashboardHeader().should('not.exist')
  })

  it('should not login with no username', () => {
      loginPage.inputPassword(TestConstants.ValidPassword)
      loginPage.submitLogin()
      loginPage.requiredError().should('be.visible').and('have.text', TestConstants.RequiredError)
      dashboardPage.dashboardHeader().should('not.exist')
  })

  it('should not login with invalid username', () => {
    loginPage.inputUsername(TestConstants.InvalidUsername)
    loginPage.inputPassword(TestConstants.ValidPassword)
    loginPage.submitLogin()
    loginPage.credentialError().should('be.visible').and('have.text', TestConstants.InvalidCredentialError)
    dashboardPage.dashboardHeader().should('not.exist')
  })

  it('should not login with invalid password', () => {
    loginPage.inputUsername(TestConstants.validUsername)
    loginPage.inputPassword(TestConstants.InvalidCredentialError)
    loginPage.submitLogin()
    loginPage.credentialError().should('be.visible').and('have.text', TestConstants.InvalidCredentialError)
    dashboardPage.dashboardHeader().should('not.exist')
  })

  it('should login with a valid username and password', () => {
    loginPage.inputUsername(TestConstants.validUsername)
    loginPage.inputPassword(TestConstants.ValidPassword)
    loginPage.submitLogin()
    dashboardPage.dashboardHeader().should('be.visible').and('have.text', TestConstants.DashboardHeader)
    dashboardPage.dashboardUrl().should('include', '/dashboard/index')
    dashboardPage.dashboardTitle().should('contain', TestConstants.DashboardTitle)
  })


})