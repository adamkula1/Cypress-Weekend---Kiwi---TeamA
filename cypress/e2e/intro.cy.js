/// <reference types="Cypress" />

describe("Intro test", () => {
    it("Manage my booking task", () => {
        cy.setCookie('__kwc_agreed', 'true')
        cy.getBookingToken().then((token) => { 
            cy.visit('https://www.kiwi.com/booking?token=' + token)
            cy.createNewReservation(token).then((link) => {
                cy.log(link)
                cy.visit(link)
            })
        })
    })
})