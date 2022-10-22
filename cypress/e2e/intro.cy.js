describe("Intro test", () => {
    it("Check everything works", () => {
        cy.visit("https://code.kiwi.com/cypressweekend/")
        cy.log("YAAY! IT WORKS!")
        cy.log('ahoj')
        cy.log("test first branche")
    })
})