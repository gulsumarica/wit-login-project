import { errorMessages } from "../../src/components/Login";

describe("submit when the successful form is filled out", () => {
  it("i can open the success page", () => {
    cy.visit("http://localhost:5174/");
    cy.get(`[data-cy="ad-input"]`).type("Gülsüm");
    cy.get(`[data-cy="soyad-input"]`).type("Arıca");
    cy.get(`[data-cy="email-input"]`).type("gulsum@gmail.com");
    cy.get(`[data-cy="password-input"]`).type("12345678Aa@");
    cy.get(`[data-cy="submit-button"]`).click();

    cy.url().should("include", "/Success");
  });
});

describe("errors", () => {
  it("the wrong firstname", () => {
    cy.visit("http://localhost:5174/");
    cy.get(`[data-cy="ad-input"]`).type("Gü");
    cy.get(`[data-cy="error-message"]`).should(
      "contain",
      "Adınızı en az 3 karakter giriniz"
    );
  });
  it("the wrong lastname", () => {
    cy.visit("http://localhost:5174/");
    cy.get(`[data-cy="soyad-input"]`).type("Ar");
    cy.get(`[data-cy="error-message"]`).should(
      "contain",
      "Soyadınızı en az 3 karakter giriniz"
    );
  });
  it("the wrong lastname", () => {
    cy.visit("http://localhost:5174/");
    cy.get(`[data-cy="email-input"]`).type("gulsum@");
    cy.get(`[data-cy="error-message"]`).should(
      "contain",
      "Geçerli bir email giriniz"
    );
  });
  it("the wrong password", () => {
    cy.visit("http://localhost:5174/");
    cy.get(`[data-cy="password-input"]`).type("123");
    cy.get(`[data-cy="error-message"]`).should(
      "contain",
      "En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf, en az 1 sembol ve en az 1 rakam içermelidir"
    );
  });
});
