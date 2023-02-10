import cypress from "cypress"

describe('Auth', () => {

    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/instructorlogin')
    })

    it('instructor signup', () => {
        cy.get("#create_account").click()
        cy.get("#username").type('test')
        cy.get("#name").type('test')
        cy.get("#email").type('test@gmail.com')
        cy.get("#mobile").type('93693648')
        cy.get("#password").type('12345678')
        cy.get("#confirmpassword").type('12345678')
        cy.get("#register").click()
    })

    it('instructor login', () => {
        cy.get("#email").type('test@gmail.com')
        cy.get("#password").type('12345678')
        cy.get("#signin").click()
    })

    it('edit user profile', () => {
        cy.contains(".chakra-avatar__img css-3a5bz2").click()
    })
    
})