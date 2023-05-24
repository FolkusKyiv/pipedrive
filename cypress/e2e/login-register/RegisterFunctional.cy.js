import faker from 'faker';
describe('Functional Tests for registration', () => {

  beforeEach(() => {
    cy.visit('https://www.pipedrive.com/uk')
    const viewportWidth = 1280
    const viewportHeight = 720
    cy.viewport(viewportWidth, viewportHeight)
    cy.get("#onetrust-accept-btn-handler").should("be.visible")
    cy.get("#onetrust-accept-btn-handler").click()
    cy.get('.onscroll-fade').click()
    cy.get(".header-register-button").should("be.visible").click()
    cy.get(".puco-spacing--bottom-xl-m .puco-checkbox-container").as("TOSandPN")
  })
  const noEmail= "Email is required"
  const incorrectEmail = "Please add a valid email address"
  const registerURL = "https://www.pipedrive.com/en/register"
  const fontWeight700 = "700"
  const fontLineHeight25 = "25px"
  const fontFamily = "Inter, sans-serif"
  const fontColor = "rgb(199, 32, 27)"
  const fontSize12="12px"
  const fontSize14="14px"
  const h3TextAlign = "center"
  const h3TextColor = "rgb(25, 36, 53)"
  const h3LineHeight = "44px"
  const h3FontSize = "34px"

  it(  "Submit with no TOS and PN agreement", () =>{

    //Try to click register without submitting
    cy.get(".puco-button--primary").click()
    cy.get("@TOSandPN").should("contain", "This option is required")
        .should("be.visible")
        .should('have.css', {
          "font-size": fontSize12,
          "font-color": fontColor,
          "line-height": fontLineHeight25,
          "font-family": fontFamily,
          "font-weight": fontWeight700
        })
  })

  it("Submit no email", () => {

    //Sending no email, trying to register
    cy.get("@TOSandPN").children().eq(1).click()
    cy.get(".puco-button--primary").click()
    cy.get(".puco-input--prefix").should("have.css","border", "1px solid rgb(255, 85, 80)")
    cy.get(".puco-input-wrapper").should("contain", noEmail)
        .should("be.visible")
        .should('have.css', {
          "font-size": fontSize14,
          "font-color": fontColor,
          "line-height": fontLineHeight25,
          "font-family": fontFamily,
          "font-weight": fontWeight700
        }) //and so on...
    cy.url().should("equal", registerURL)
  })

  it("Submit invalid email", () => {

    //Sending and invalid email
    cy.get("@TOSandPN").children().eq(1).click()
    cy.get('.puco-input-label').type("abcd")
    cy.get(".puco-button--primary").click()
    cy.get(".puco-input-wrapper").should("contain", incorrectEmail)
        .should("be.visible")
        .should('have.css', {
          "font-size": fontSize14,
          "font-color": fontColor,
          "line-height": fontLineHeight25,
          "font-family": fontFamily,
          "font-weight": fontWeight700
        })
    cy.url().should("equal", registerURL)
  })

  it("Submit existing email",  () => {

    //Trying to register with an existing account
    cy.get("@TOSandPN").children().eq(1).click()
    cy.get('.puco-input-label').type("abdulah@ukr.net")
    cy.get(".puco-button--primary").click()
    cy.get(".puco-signup-modal__header").should("exist").should("be.visible")
        .should("contain.text", "This email is already in use")
        .should('have.css', {
          "text-align": h3TextAlign,
          "font-size": h3FontSize,
          "font-color": h3TextColor,
          "line-height": h3LineHeight,
          "font-family": fontFamily,
          "font-weight": "bold" //and so on...
        })
    cy.url().should("equal", registerURL)
  })

  it("Register via a valid email", () => {

      //Registering using a fake valid email

      let validEmail;
      validEmail = faker.internet.email()
        cy.get("@TOSandPN").children().eq(1).click()
        cy.get('.puco-input-label').type(validEmail)
    })


})