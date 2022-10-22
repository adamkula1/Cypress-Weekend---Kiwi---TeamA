// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getByData", (selector) => {
    return cy.get(`[data-test=${selector}]`)
})

Cypress.Commands.add('getBookingToken', () => {
    const options = {
        method: 'GET',
        url: 'https://api.skypicker.com/flights',
        qs: {
            partner: 'cypress',
            flyFrom: 'LHR',
            to: 'DXB',
            depart_after: "2022-11-15",
            maxstopovers: 0,
            adult_hold_bag: 1
        }
    }
    cy.request(options).then((response) => {
        expect(response.status).to.eq(200)
        return response.body.data[0].booking_token
    })
})

Cypress.Commands.add('createNewReservation', (bookingToken) => {
    const options = {
        method: 'POST',
        url: 'https://qaa-be.platform-prod.skypicker.com/booking/create_booking?confirm=true',
        qs: {
            confirm: true,
        },
        timeout: 60000,
        body: 
        {
            "booking_ancillaries": {
              "fare_type": "flexi",
              "guarantee": true,
              "service_package": "premium"
            },
            "booking_passengers": [
              {
                "birthday": "1988-04-21",
                "category": "adult",
                "document_expiry": "2023-12-31",
                "document_number": "12345678XY",
                "email": "test@kiwi.com",
                "name": "TEST",
                "nationality": "gb",
                "passenger_ancillaries": {
                  "axa_insurance": "basic",
                  "hand_baggage": true,
                  "hold_baggage": true,
                  "priority_boarding": false
                },
                "phone": "+44 55555555",
                "surname": "TEST",
                "title": "mr"
              }
            ],
            "booking_token": bookingToken
          }
    }
    cy.request(options).then((response) => {
        expect(response.status).to.eq(200)
        return response.body.mmb_link
    })
})
