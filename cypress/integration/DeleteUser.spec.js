describe("Component DeleteUser", () => {
    it("should show success message if API states successful addition", () => {
        cy.visit("/users/delete");
        cy.get("input").type("Michael Matte");

        cy.intercept( "DELETE", "http://www.userdatabase.com/users/*",
        {
            statusCode: 200,
        }).as("APIRequest");

        cy.get("button").click();
        cy.wait("@APIRequest")

        cy.get("div[id = 'messageArea']").should("have.text", "SUCCESS: User deleted successfully");
    })

    it("should show error message if API states unsuccessful deletion", () => {
        cy.visit("/users/delete");
        cy.get("input").type("Michael Matte");

        cy.intercept( "DELETE", "http://www.userdatabase.com/users/*",
        {
            statusCode: 404,
        }).as("APIRequest");

        cy.get("button").click();
        cy.wait("@APIRequest")

        cy.get("div[id = 'messageArea']").should("have.text", "ERROR: User not deletable!");
    })

    it("should show error message if ID is not filled out", () => {
        cy.visit("/users/delete");
        cy.get("input").should("have.value", "");

        cy.get("button").click();

        cy.get("div[id = 'messageArea']").should("have.text", "ERROR: Id must be filled out!");
    })

    it("should show error message in case of network error", () => {
        cy.visit("/users/delete");
        cy.get("input").type("Michael Matte");

        cy.intercept( "DELETE", "http://www.userdatabase.com/users/*",
        {
            forceNetworkError: true
        }).as("APIRequest");

        cy.get("button").click();
        cy.wait("@APIRequest")

        cy.get("div[id = 'messageArea']").should("have.text", "ERROR: Connection to Server was not possible!");
    })
});