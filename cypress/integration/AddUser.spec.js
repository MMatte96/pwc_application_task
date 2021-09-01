describe("Component AddUser", () => {
    it("should show success message if API states successful addition", () => {
        cy.visit("/users/add");
        cy.get("input[id = 'txtName']").type("Michael");
        cy.get("input[id = 'txtLastName']").type("Matte");

        cy.intercept( "POST", "http://www.userdatabase.com/users",
        {
            ok: true,
            statusCode: 200,
        }).as("APIRequest");

        cy.get("button").click();
        cy.wait("@APIRequest")

        cy.get("div[id = 'messageArea'").should("have.text", "SUCCESS: User: Michael Matte added successfully");

    }),
    it("should show error message if API states unsuccessful addition", () => {
        cy.visit("/users/add");
        cy.get("input[id = 'txtName']").type("Michael");
        cy.get("input[id = 'txtLastName']").type("Matte");
        cy.intercept( "POST", "http://www.userdatabase.com/users",
        {
           statusCode: 404
        }).as("APIRequest");

        cy.get("button").click();
        cy.wait("@APIRequest")

        cy.get("div[id = 'messageArea']").should("have.text", "ERROR: User could not be added!");

    }),
    it("should show error message in case of network error", () => {
        cy.visit("/users/add");
        cy.get("input[id = 'txtName']").type("Michael");
        cy.get("input[id = 'txtLastName']").type("Matte");
        cy.intercept( "POST", "http://www.userdatabase.com/users",
        {
            forceNetworkError: true
        }).as("APIRequest");

        cy.get("button").click();
        cy.wait("@APIRequest")

        cy.get("div[id = 'messageArea']").should("have.text", "ERROR: Connection to Server was not possible!");
    })
});