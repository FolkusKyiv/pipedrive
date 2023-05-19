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
      cy.get("#login").should("have.css", "height", fieldHeight)
      cy.get("#login").should("have.css", "width", fieldWidth)

      cy.get('#password').should('have.attr', 'value').should("equal", "")
      cy.get("#password").should("have.css", "height", fieldHeight)
      cy.get("#password").should("have.css", "width", fieldWidth)
      cy.get('.puco-input-group__suffix-text').should('be.visible').should("contain", "Forgot?")

      //Check that the login button is present and correct
      cy.get(".bt").should('contain.text', loginBtnTxt)
          .should("have.css", "height", "50px")
          .should("have.css", "width", "380px")

      //Check for the checkbox not checked by default
      cy.get(".puco-checkbox-container").should("not.be.checked")

      //Check that there are 3 options to log in using other methods
      cy.get('.puco-button--width-full').should('have.length', 3);
      cy.get('.puco-button--width-full').eq(0).should('contain', 'Google');
      cy.get('.puco-button--width-full').eq(1).should('contain', 'LinkedIn');
      cy.get('.puco-button--width-full').eq(2).should('contain', 'SSO');

      //check for register link
      cy.get(".puco-link--gray").should("be.visible").should("contain", "Don't have an account?")

      //check for footer and header to be present
      cy.get(".puco-header__content").should("be.visible")
      cy.get(".puco-footer__bottom-wrapper").should("be.visible")
  })

   it( "Registration page UI and  DOM  check", () => {
       const registerBtnTxt = "Try it free";
       const registerLink = "https://www.pipedrive.com/en/register"
       const loginTabURL = 'https://app.pipedrive.com/auth/login'
       const fieldHeight = "56px"
       const fieldWidth = "420px"
       const fontFamily = "Inter, sans-serif"
       const colourVar = "rgb(25, 36, 53)"
       const fontWeight400 = '400'
       const fontSize12 = "12px"
       const fontLineHeight22 = "22px"
       const listOfLanguages = ["English (US)", "Čeština", "Deutsch", "Eesti", "Español (España)",
       "Español (América Latina)", "Français", "Bahasa Indonesia", "Italiano", "Japanese (日本語)", "Korean (한국어)",
       "Latviešu valoda", "Nederlands", "Norsk", "Polski", "Português (BR)", "Русский", "Suomi", "Svenska",
       "Türkçe", "Українська", "Chinese (繁體中文)"]
       const listOfLanguagesLinks = ["/en/register","/cs/register", "/de/register", "/et/register",
       "/es-es/register", "/es/register", "/fr/register", "/id/register", "/it/register", "/ja/register",
       "/ko/register", "/lv/register", "/nl/register", "/nb/register", "/pl/register", "/pt/register",
       "/ru/register", "/fi/register", "/sv/register", "/tr/register", "/uk/register", "/zh-hant/register",]

      cy.get('.onscroll-fade').click()
      cy.get(".header-register-button").should("be.visible").should("contain.text", registerBtnTxt)
          .click()
      cy.url().should("equal", registerLink)
      cy.title().should("contain","Free trial of Pipedrive - sign up | Pipedrive")

       //header

       //logo on the left
      cy.get(".puco-header__content").children().should('have.length', 3)
          .eq(0).should("have.css",{
              "height" : "32px",
               "width" : "172.922px"
          })

       //artifact -- Menu from the landing page
      cy.get(".puco-header__content").children().eq(1).should("have.css", 'visibility', "hidden") //a-ha, an artifact

       //menu on the right

       //Language dropdown
      cy.get(".puco-header__content").children().eq(2).children().should("have.length",  2)
           .eq(0).children().should("have.length", 2)
           .eq(1).as('languageDropdown').should("have.css", "visibility",  "hidden")
      cy.get(".puco-header__content").children().eq(2).children().first().children().eq(0).trigger('mouseover')
      cy.get("@languageDropdown").should('be.visible')
           .children().first().children().as("languages")


      cy.get('@languages').each(($a, index) => {
           cy.wrap($a).then(($a) => {
               const expectedLink = listOfLanguagesLinks[index];
               const expectedText = listOfLanguages[index];

               const actualLink = $a.attr('href');
               expect(actualLink).to.eq(expectedLink);
           cy.wrap($a)
               .children().first()
               .invoke('text')
               .then((text) => {
                   expect(text).to.contain(expectedText);
               })
           })


      });

       //Log in button
       cy.get(".puco-header__content").children().eq(2).children().eq(1)
           .should("have.attr", "href",  loginTabURL  )
           .should("contain",  "Log in")

       //body
       //body container dimensions and bg colour
      cy.get(".register_registerBlock__zt6_U .puco-container__content").should("have.css", {
          "width" : "1200px",
          "height" : "673px"
      }).parent().should("have.css", "background-color", "rgb(255, 255, 255)")
       //email field
      cy.get(".puco-input--prefix").should('have.attr', 'value').should("equal", "")
      cy.get(".puco-input--prefix").should("have.css", "height", fieldHeight)
      cy.get(".puco-input--prefix").should("have.css", "width", fieldWidth)
        //first checkbox
      cy.get(".puco-spacing--bottom-xl-s").should("not.be.checked")
          .should("contain.text", 'Get helpful tips, product updates and exclusive offers via email')
       // I could not find a way to verify that the checkbox is indeed checked after click
          // cy.get(".puco-spacing--bottom-xl-s").click().children().first().children().eq(1).should("be.checked").click().should("not.be.checked")
      cy.get(".puco-spacing--bottom-xl-s").children().first().children().eq(2)
          .children().first().children().first().children().first()
          .should('have.css',{
              "color": colourVar,
              "font-weight": fontWeight400,
              "font-size": fontSize12,
              "line-height": fontLineHeight22,
              "font-family": fontFamily //and so on....
          })
          //second checkbox
       cy.get('.puco-spacing--bottom-xl-m').should("not.be.checked")
           .should("contain.text", "By signing up, you accept our Terms of Service and Privacy Notice.")
       cy.get(".puco-spacing--bottom-xl-m").children().first().children().eq(2)
           .children().first().children().first()
           .should('have.css',{
               "color": colourVar,
               "font-weight": fontWeight400,
               "font-size": fontSize12,
               "line-height": fontLineHeight22,
               "font-family": fontFamily //and so on....
           })
//footer
      //cy.visit(loginTabURL)


   })
})