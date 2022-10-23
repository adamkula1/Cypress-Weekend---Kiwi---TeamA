describe("Search task", () => {
    beforeEach(() => {
        cy.setCookie("__kwc_agreed", "true")
    })

    it("Search task first part", () => {
        cy.visit("https://www.kiwi.com/en/cheap-flights/")

        cy.get('[class*="PictureCardContent"]')
            .should("have.length", 30)
            .should("be.visible")
            .eq(0)
            .click()

        cy.get('div[data-test*="SearchFormModesPicker"]').click()

        cy.get('p[data-test*="ModePopup-iconDone"]').eq(1).click()

        cy.get('[data-test*="PassengersField"] svg')
            .eq(2)
            .click({ force: true })

        cy.get('[data-test*="BagsPopup-cabin"] svg').eq(2).click()

        cy.get('[data-test*="PassengersFieldFooter-done"]')
            .click()
            .log("Done button")

        cy.get('a[data-test*="LandingSearchButton"]').click().log("search")

        cy.get('div[data-test="PlacePickerInputPlace"]')
            .eq(0)
            .should("contain.text", "London")
            .log("origin verified1")

        cy.get('span[class*="ResultCardItineraryPlacestyled"]')
            .should("contain.text", "London")
            .log("origin verified2")

        cy.get('div [data-test="PlacePickerInputPlace"]')
            .eq(1)
            .should("contain.text", "Lisbon")
            .log("destination verified1")

        cy.get('span[class*="ResultCardItineraryPlacestyled"]')
            .eq(1)
            .should("contain.text", "Lisbon")
            .log("destination verified2")

        cy.get('div[data-test="StopCountBadge-0"]').should(
            "contain.text",
            "Direct"
        )

        cy.get('div[data-test="ResultCardBadge-CabinBags"]').should(
            "be.visible"
        )

        cy.get('div[data-test="ResultCardBadge-CabinBags"]')
            .children(1)
            .should("contain.text", "10 kg")
    })

    it("Search task second part", () => {
        let transport
        cy.request(
            "GET",
            "https://www.kiwi.com/en/search/results/prague-czechia/vienna-austria/anytime/anytime?sortBy=price."
        ).then((res) => {
            expect(res.status).equal(200)
            transport = "&transport=aircraft%2Cbus"
            cy.visit(
                "https://www.kiwi.com/en/search/results/prague-czechia/vienna-austria/anytime/anytime?sortBy=price." +
                    transport
            )
        })
        cy.getByData("SearchDateInput").contains("Return").click()
        cy.getByData("DayContentContainer").last().click()
        cy.getByData("SearchFormDoneButton").click({ force: true })
        cy.getByData("ResultCardWrapper").eq(0).trigger("mouseover")
        cy.getByData("PopupShareButton").invoke("show").first().click()
        cy.getByData("ShareSheetModalInputField").should("be.visible")
        cy.get("[aria-label='whatsapp']")
            .should("be.visible")
            .should("have.text", "WhatsApp")
        cy.get("[aria-label='facebookmessenger']")
            .should("be.visible")
            .should("have.text", "Messenger")
        cy.get("[aria-label='telegram']")
            .should("be.visible")
            .should("have.text", "Telegram")
        cy.get("[aria-label='viber']")
            .should("be.visible")
            .should("have.text", "Viber")
        cy.get("[aria-label='email']")
            .should("be.visible")
            .should("have.text", "Email")
        cy.contains("Copy").click()
        cy.get('div[class*="ToastMessage"]')
            .should("be.visible")
            .should("contain.text", "Link copied")
    })
})
