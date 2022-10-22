/// <reference types="Cypress" />

describe("Intro test", () => {
    it("Manage my booking task", () => {
        cy.setCookie('__kwc_agreed', 'true')
        cy.getBookingToken().then((token) => { 
            cy.visit('https://www.kiwi.com/booking?token=' + token)
            cy.createNewReservation(token).then((link) => {
                cy.log(link)
                cy.visit(link)
                cy.url().should("include", "manage")
                cy.get("button[data-test='FlightsChange']").click()
                cy.contains("a", "Flexi Ticket").should("have.text", "Flexi Ticket").click()
                cy.get("div[data-test='ArticleContent_Text'] li:first-child").eq(2).should("contain.text", "If you change your trip, you’ll only pay the difference for the new booking. We’ll cover the rest.")
                cy.get("div[class*='DrawerClose'] div").eq(2).click()
                cy.get("input[data-test='search-origin']").type("VIE")
                cy.contains("Vienna International Airport VIE").click()
                cy.get("input[data-test='search-destination']").type("BCN")
                cy.contains("Barcelona–El Prat BCN").click()
                // cy.get("body").click(0, 0);
                // cy.get(div[datat-test*= 'CalendarDay']:first-child(1)").click()
                cy.getByData("ChangeAlternativesSearchForm-button").click()


                
            })
        })
    })



    
})