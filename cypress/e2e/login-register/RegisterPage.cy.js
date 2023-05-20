describe('Register Page UI', () => {

  beforeEach(() => {
    cy.visit('https://www.pipedrive.com/uk')
    const viewportWidth = 1280
    const viewportHeight = 720
    cy.viewport(viewportWidth, viewportHeight)
    cy.get("#onetrust-accept-btn-handler").should("be.visible")
    cy.get("#onetrust-accept-btn-handler").click()
  })
  it("Registration page UI and  DOM  check",
      () => {
        const registerBtnTxt = "Try it free";
        const registerLink = "https://www.pipedrive.com/en/register"
        const loginTabURL = 'https://app.pipedrive.com/auth/login'
        const fieldHeight = "56px"
        const fieldWidth = "420px"
        const fontFamily = "Inter, sans-serif"
        const fontWeight400 = '400'
        const fontWeight700 = "700"
        const fontLineHeight22 = "22px"
        const listOfLanguages = ["English (US)", "Čeština", "Deutsch", "Eesti", "Español (España)",
          "Español (América Latina)", "Français", "Bahasa Indonesia", "Italiano", "Japanese (日本語)",
          "Korean (한국어)", "Latviešu valoda", "Nederlands", "Norsk", "Polski", "Português (BR)", "Русский",
          "Suomi", "Svenska", "Türkçe", "Українська", "Chinese (繁體中文)"]
        const listOfLanguagesLinks = ["/en/register", "/cs/register", "/de/register", "/et/register",
          "/es-es/register", "/es/register", "/fr/register", "/id/register", "/it/register", "/ja/register",
          "/ko/register", "/lv/register", "/nl/register", "/nb/register", "/pl/register", "/pt/register",
          "/ru/register", "/fi/register", "/sv/register", "/tr/register", "/uk/register", "/zh-hant/register",]
        const h3LineHeight = "44px"
        const h3FontSize = "34px"
        const fontSize12 = "12px"
        const fontSize14 = "14px"
        const h3TextAlign = "center"
        const h3TextColor = "rgb(25, 36, 53)"
        const fontcolor1 = "rgb(25, 36, 53)"
        const fontColor2 = "rgb(101, 110, 122)"
        const colorWhite = "rgb(255, 255, 255)"
        const tOSandPN =["https://www.pipedrive.com/en/terms-of-service",
          "https://www.pipedrive.com/en/privacy"]

        const expectedLinksFooter = [
          {
            url: 'https://www.pipedrive.com/en/terms-of-service',
            text: 'Terms of Service'
          },
          {
            url: 'https://www.pipedrive.com/en/privacy',
            text: 'Privacy Notice'
          },
          {
            url: 'https://www.pipedrive.com/en/cookie-notice',
            text: 'Cookie Notice'
          },
          {
            url: 'https://www.pipedrive.com/en/sitemap',
            text: 'Site map'
          }
        ]

        cy.get('.onscroll-fade').click()

        cy.get(".header-register-button").should("be.visible").should("contain.text", registerBtnTxt)
            .click()
        cy.url().should("equal", registerLink)
        cy.title().should("contain", "Free trial of Pipedrive - sign up | Pipedrive")

        //header

        //logo on the left
        cy.get(".puco-header__content").children()
            .should("exist").should("be.visible")
            .should('have.length', 3)
            .eq(0).should("have.css", {
          "height": "32px",
          "width": "172.922px"
        })

        //artifact -- Menu from the landing page
        cy.get(".puco-header__content").children().eq(1)
            .should("exist")
            .should("have.css", 'visibility', "hidden") //a-ha, an artifact

        //menu on the right

        //Language dropdown
        cy.get(".puco-header__content").children().eq(2).children()
            .should("exist")
            .should("have.length", 2)
            .eq(0).children().should("have.length", 2)
            .eq(1).as('languageDropdown').should("have.css", "visibility", "hidden")
        cy.get(".puco-header__content").children().eq(2).children().first()
            .children().eq(0).trigger('mouseover')
        cy.get("@languageDropdown").should('be.visible')
            .children().first().children().as("languages")

        //Checking the contents of language dropdowns
        cy.get('@languages').each(($a, index) => {
          cy.wrap($a).then(($a) => {
            const expectedLink = listOfLanguagesLinks[index]
            const expectedText = listOfLanguages[index]

            const actualLink = $a.attr('href')
            expect(actualLink).to.eq(expectedLink)
            cy.wrap($a)
                .children().first()
                .invoke('text')
                .then((text) => {
                  expect(text).to.contain(expectedText)
                })
          })


        });

        //Log in button
        cy.get(".puco-header__content").children().eq(2).children().eq(1)
            .should("exist").should("be.visible")
            .should("have.attr", "href", loginTabURL)
            .should("contain", "Log in")

        //body
        //body container dimensions and bg colour
        cy.get(".register_registerBlock__zt6_U .puco-container__content")
            .should("exist").should("be.visible")
            .should("have.css", {
              "width": "1200px",
              "height": "673px"
            }).parent().should("have.css", "background-color", colorWhite)

        // h3 header in the main container
        cy.get(".puco-signup-modal__header").should("exist").should("be.visible")
            .should('have.css', {
              "text-align": h3TextAlign,
              "font-size": h3FontSize,
              "font-color": h3TextColor,
              "line-height": h3LineHeight,
              "font-family": fontFamily,
              "font-weight": "bold" //and so on...
            })
            .should("contain.text", "Try Pipedrive free for 14 days")

        //header bottom text
        cy.get(".puco-text--weight-normal.puco-text--align-horizontal-xl-center").should("exist")
            .should("be.visible")
            .should("have.css", {
              "text-align": h3TextAlign,
              "font-size": fontSize14,
              "font-color": fontColor2,
              "line-height": "24px",
              "font-family": fontFamily,
              "font-weight": fontWeight400 //and so on...
            })
            .should("contain.text", "Full access. No credit card needed.")

        //email field
        cy.get(".puco-input-group").children().should("exist").should("be.visible")
            .should("have.length", 3)
        //check for it to be empty and css values
        cy.get(".puco-input--prefix").should('have.attr', 'value').should("equal", "")
        cy.get(".puco-input--prefix").should("have.css", {
          "height": fieldHeight,
          "width": fieldWidth
        })
        //check text and its behaviour
        cy.get(".puco-input-label").should("exist").should("be.visible")
            .should("contain.text","Work email")
            .should("have.css",  {
              "font-family" : fontFamily,
              "font-color" : fontColor2,
              "font-size" : fontSize12,
              "position": "absolute",
            })
        cy.get('.puco-input-label').type("abcd")
        //check for letterbox icon
        cy.get(".puco-input-group").children().eq(2)
            .should('have.attr', "xmlns", "http://www.w3.org/2000/svg")


        //first checkbox
        cy.get(".puco-spacing--bottom-xl-s").should("exist").should("be.visible")
            .should("not.be.checked")
            .should("contain.text", 'Get helpful tips, product updates and exclusive offers via email')
        // I could not find a way to verify that the checkbox is indeed checked after click
        // cy.get(".puco-spacing--bottom-xl-s").click().children().first()
        // .children().eq(1).should("be.checked").click().should("not.be.checked")
        cy.get(".puco-spacing--bottom-xl-s").children().first().children().eq(2)
            .children().first().children().first().children().first()
            .should('have.css', {
              "color": fontcolor1,
              "font-weight": fontWeight400,
              "font-size": fontSize12,
              "line-height": fontLineHeight22,
              "font-family": fontFamily //and so on....
            })
        //second checkbox
        cy.get('.puco-spacing--bottom-xl-m').should("exist").should("be.visible")
            .should("not.be.checked")
            .should("contain.text", "By signing up, you accept our Terms of Service and Privacy Notice.")
        cy.get(".puco-spacing--bottom-xl-m").children().first().children().eq(2)
            .children().first().children().first().as("TOSandPN")
        cy.get("@TOSandPN").should('have.css', {
          "color": fontcolor1,
          "font-weight": fontWeight400,
          "font-size": fontSize12,
          "line-height": fontLineHeight22,
          "font-family": fontFamily //and so on....
        })
        //check for the correct Terms of Service and Privacy Notice
        cy.get("@TOSandPN").children().eq(0).should("have.attr", "href",tOSandPN[0])
        cy.get("@TOSandPN").children().eq(1).should('have.attr', "href",tOSandPN[1])

        //continue button
        cy.get(".puco-button--primary").should("exist").should("be.visible")
        cy.get(".puco-button--primary").children().first().should('have.css', {
          //"align-items": h3TextAlign,
          "font-size": "22px",
          "color": colorWhite,
          "line-height": "32px",
          "font-family": fontFamily,
          "font-weight": fontWeight700,
          "cursor"  : "pointer"//and so on...
        })

        //under button text
        cy.get(".puco-signup-modal__footer").should("exist").should("be.visible")
            .children().first().as("btnFooterTxt").should("contain", "Already have an account? ")
        cy.get("@btnFooterTxt").children().first().should("have.attr", "href",loginTabURL)
            .should("contain.text", "Log in")

        //separator text
        cy.get(".puco-separator__text").should("exist").should("be.visible")
            .should("contain.text", "or access quickly")
            .should("have.css",{
              "color": fontColor2,
              "font-weight": fontWeight700,
              "font-size": fontSize14,
              "line-height": "25px",
              "font-family": fontFamily
            })

        //bottom buttons
        cy.get(".puco-button--size-m").should("exist").should("be.visible")
            .eq(0)
            .should("have.attr",  "href", "https://app.pipedrive.com/auth/google/login")
            .should("have.css", {
              "font-size": fontSize14,
              "color": fontColor2,
              "line-height": "24px",
              "font-family": fontFamily,
              "font-weight": fontWeight700,
              "cursor"  : "pointer",
              "align-items" : "center"
            })
            .children().eq(1).should("contain.text", "Google")

        cy.get(".puco-button--size-m").eq(1)
            .should("have.attr",  "href", "https://app.pipedrive.com/auth/linkedin/login")
            .should("have.css", {
              "font-size": fontSize14,
              "color": fontColor2,
              "line-height": "24px",
              "font-family": fontFamily,
              "font-weight": fontWeight700,
              "cursor"  : "pointer",
              "align-items" : "center"
            })
            .children().eq(1).should("contain.text", "LinkedIn")

        //footer
        cy.get(".puco-footer").should("exist").should("be.visible")
        cy.get('.puco-footer__bottom-links').children('a').should('have.length', 4)
        cy.get('.puco-footer__text').should('have.text', 'Pipedrive is a Web-based Sales CRM.')

        cy.get('.puco-footer__bottom-links')
            .find('a')
            .each(($link, index) => {
              const expectedLink = expectedLinksFooter[index]
              cy.wrap($link).should('have.attr', 'href', expectedLink.url)
              cy.wrap($link).should('have.text', expectedLink.text)
            })
        cy.get('span.puco-text--weight-normal').eq(5).should('have.text', '© 2023 Pipedrive');



        //cy.visit(loginTabURL)


      })
})