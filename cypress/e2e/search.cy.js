describe("First part", () => {
    beforeEach(() => {
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("https://www.kiwi.com/en/cheap-flights/")
    })

    it("Manage my booking task", () => {
        cy.getByData("PictureCard").should("have.length", 30)

        cy.getByData("PictureCard").eq(0).click()

        cy.get('div[data-test*="SearchFormModesPicker"]').click()

        cy.getByData("ModePopupOption-oneWay").click()

        cy.getByData("PassengersField", { timeout: 2000 }).click()

        cy.getByData("BagsPopup-cabin").find('[aria-label="increment"]').click()

        cy.getByData("PassengersFieldFooter-done").click()

        //
    })
})
