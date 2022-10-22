/// <reference types="Cypress" />
const serverId = 'a0eytoem'
const testEmail = `COKOLIV@${serverId}.mailosaur.net`

describe("Intro test", () => {
    it("Mailosaur task", () => {
        cy.flightReservation().then((bookingID) => {
            console.log(bookingID)
            cy.mailosaurGetMessagesBySubject(serverId, "progress").then((result) => {
                cy.mailosaurGetMessageById(result.items[0].id).then((message) => {
                    cy.writeFile('index.html', message.html.body)
                    cy.visit('index.html')
                    cy.get('a[class*="t-badge__inner"]').first().should('have.text', 'Saver Ticket')
                    cy.get('a[class*="t-badge__inner"]').last().should('have.text', 'Basic Services')
                    cy.get('.u-no-break-spaces').last().should('contain.text', 'Processing')
                    cy.get('img[alt="App Store"]').click()
                    cy.url().should('contain', 'apple')
                    cy.go('back')
                    cy.get('img[alt="Google Play"]').click()
                    cy.url().should('contain', 'play.google')
                    cy.go('back')
                    cy.contains('a[class="t-btn"]', 'Manage my booking').click()
                    cy.url().should('contain', 'kiwi.com')
                    cy.url().should('contain', 'manage')
                }) 
            })
        })
    })
})