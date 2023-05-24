describe('login', () => {

    beforeEach( () => {
    cy.visit('https://www.pipedrive.com/uk')
    const viewportWidth = 1280
    const viewportHeight = 720
    cy.viewport(viewportWidth, viewportHeight)
    cy.get("#onetrust-accept-btn-handler").should("be.visible")
    cy.get("#onetrust-accept-btn-handler").click()
  })


  it('Login element is present', () => {

     const loginLink = "https://app.pipedrive.com/auth/login"
     const tabTittle = "CRM-система та програма для керування воронкою продажів | Pipedrive"

    //check for DOM element parent structure
     cy.get('.puco-header__right-wrapper').children(".onscroll-fade").should('exist')
     cy.get('.onscroll-fade')
         .should('be.visible')
         .should('contain.text', 'Увійти')
         .should('have.attr', "href").should('equal', loginLink)
     cy.title().should('contain', tabTittle)
    })

  it('Clicking opens a correct tab', () =>{

      const loginTabURL = 'https://app.pipedrive.com/auth/login'
      const fieldHeight = "56px"
      const fieldWidth = "380px"
      const loginBtnTxt = "Log in"
          // const forgotPass = "https://app.pipedrive.com/auth/login/forgot_password"
      const tabTitle = "Log in"

      cy.get('.onscroll-fade').click()

      //Check that the correct tab is opened
      cy.url().should('equal', loginTabURL)
      cy.title().should("contain", tabTitle)
      //check the input fields be empty and have correct CSS values
      cy.get('#login').should('have.attr', 'value').should("equal", "")
      cy.get("#login").should("have.css", {
          "height": fieldHeight,
          "width": fieldWidth
      })

      cy.get('#password').should('have.attr', 'value').should("equal", "")
      cy.get("#password").should("have.css", {
          "height": fieldHeight,
          "width": fieldWidth
      })
      cy.get('.puco-input-group__suffix-text').should('be.visible').should("contain", "Forgot?")

      //Check that the login button is present and correct
      cy.get(".bt").should('contain.text', loginBtnTxt)
          .should("have.css", {
              "height": "50px",
              "width": "380px"
          })

      //Check for the checkbox not checked by default
      cy.get(".puco-checkbox-container").should("not.be.checked")

      //Check that there are 3 options to log in using other methods
      cy.get('.puco-button--width-full').should('have.length', 3);
      cy.get('.puco-button--width-full').eq(0).should('contain', 'Google')
      cy.get('.puco-button--width-full').eq(1).should('contain', 'LinkedIn')
      cy.get('.puco-button--width-full').eq(2).should('contain', 'SSO')

      //check for register link
      cy.get(".puco-link--gray").should("be.visible").should("contain", "Don't have an account?")

      //check for footer and header to be present
      cy.get(".puco-header__content").should("be.visible")
      cy.get(".puco-footer__bottom-wrapper").should("be.visible")
  })


})