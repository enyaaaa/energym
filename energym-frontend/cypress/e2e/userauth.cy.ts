import cypress from "cypress";

declare global {
  namespace Cypress {
    interface Chainable {
      userlogin(email: string, password: string): Chainable<void>;
      userSignup(
        username: string,
        email: string,
        password: string,
        confirm_password: string
      ): Chainable<void>;
      userlogout(): Chainable<void>;
    }
  }
}

describe("Auth", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/login");
  });

  it("userSignup", () => {
    cy.get("#create_account").click();
    cy.get("#username").type("enya");
    cy.get("#name").type("enya");
    cy.get("#email").type("enya@gmail.com");
    cy.get("#mobile").type("93457342");
    cy.get("#password").type("12345678");
    cy.get("#confirmpassword").type("12345678");
    cy.get("#register").click();
  });

  it("userLogin", () => {
    cy.get("#email").type("enya@gmail.com");
    cy.get("#password").type("12345678");
    cy.get("#signin").click();

    cy.contains("Logged in Successfully").should("be.visible");
  });

  it("userEdit", () => {
    cy.get("#email").type("enya@gmail.com");
    cy.get("#password").type("12345678");
    cy.get("#signin").click();

    cy.get(".css-3a5bz2").click();
    cy.contains("edit").click();
    cy.get("#username").type("aa");
    cy.contains("update").click();
    cy.contains(".css-41aesz").click();

    cy.contains("Profile Updated Successfully").should("be.visible");
  });

  it("userlogout", () => {
    cy.get("#email").type("enya@gmail.com");
    cy.get("#password").type("12345678");
    cy.get("#signin").click();

    cy.get(".css-3a5bz2").click();
    cy.contains("logout").click();
    cy.contains(".css-41aesz").click();
    

    cy.contains("Logout Successfully").should("be.visible");
  })
})