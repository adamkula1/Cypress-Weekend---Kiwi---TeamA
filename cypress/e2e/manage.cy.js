/// <reference types="Cypress" />

describe("Intro test", () => {
    it("Manage my booking task", () => {
        cy.setCookie('__kwc_agreed', 'true')
        cy.getBookingToken().then((token) => { 
        cy.visit('https://www.kiwi.com/booking?token=' + token)
        cy.createNewReservation(token).then((link) => {
                cy.log(link)
                cy.visit(link)
        // cy.visit("https://www.kiwi.com/en/manage/293961932/901bbb7f-6e10-47ba-835e-bc8ac378a4ad")
                cy.url().should("include", "manage")
                cy.get("button[data-test='FlightsChange']").click()
                cy.contains("a", "Flexi Ticket").should("have.text", "Flexi Ticket").click()
                cy.get("div[data-test='ArticleContent_Text'] ul").last().should("contain.text", "If you change your trip, you'll only pay the difference for the new booking. We'll cover the rest.")
                cy.get("div[class*='DrawerClose'] div").eq(2).click()
                cy.get("input[data-test='search-origin']").type("VIE").should('have.value', "VIE")
                cy.get('.ModalSimplePicker').find('.SimplePickerPlaceRow.selected').click()
                cy.get("input[data-test='search-destination']").type("BCN").should('have.value', 'BCN')
                cy.get('.ModalSimplePicker').find('.SimplePickerPlaceRow.selected').click()
                cy.get(".SearchField-head").click()
                cy.get('div[data-test="CalendarDay active not-selected"]').contains('.day-number', 15).click()
                cy.get('input[name="search-outboundDate"]').should('include.value', 15)
                cy.getByData("ChangeAlternativesSearchForm-button").click() 
                //cy.get('.JourneyInfo button',{ timeout: 15000 }).first().click({force:true})
                cy.get("[data-test='ItineraryGuarantee']").find('span').should("include.text", "Kiwi.com Guarantee")
                cy.get('[data-test="JourneyBookingButton-Itinerary-bookingBtn"]').click()
                cy.get("div[data-test='changeConfirmation-NewItinerary'] span[class='TripPlace from'] span[class='code']").should("have.text", "VIE")
                cy.get("div[data-test='changeConfirmation-NewItinerary'] span[class='TripPlace to'] span[class='name']").should("have.text", "Barcelona")
                cy.get('[data-test="ChangeConfirmation-CheckoutBtn"]').should('be.disabled')
                //cy.get('input[type="checkbox"]').check({force: true}).should('be.checked')
                cy.get('[data-test="ChangeConfirmation-CheckoutBtn"]').contains('Confirm change').click()
                // cy.get("h2[id='1-523']").should("have.text", "Thanks for your request")
                cy.contains('button', 'Return to your trip').click()
                cy.reload()
                cy.getByData('BookingStatusBadge-changeInProgress').should("contain.text", 'Change in progress')
                .trigger('mouseover').invoke('show')
                cy.contains("We're processing your requested itinerary change and we'll let you know as soon as it's done.")           
                cy.get("[data-test='AdditionalServiceStatus-change_flights']").should("contain", "Processing")        
                cy.get("div[data-test='processing'] ").should("contain", "Change in progress").trigger('mouseover').invoke('show')
                cy.contains("You've paid for this service. We'll let you know as soon as it has been processed.")
                cy.get("div[data-test='Journey-toggle'] ").click()           
                cy.get("div[data-test='ItineraryGuarantee']").should("contain", "Kiwi.com Guarantee")
                cy.get("div[data-test='BookingBagsOverview']").eq(1).should("contain", "Processing")           
            })                              
        })
    })
})