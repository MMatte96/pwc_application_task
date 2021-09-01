
const exampleUsers = [
    {name: "Name1", lastname: "Lastname1"},
    {name: "Name2", lastname: "Lastname2"},
    {name: "Name3", lastname: "Lastname3"},
    {name: "Name4", lastname: "Lastname4"}
];

describe("Component ShowUser", () => {
    it("should show all returned Users from API", () => {
        cy.visit("/users");

        cy.intercept( "GET", "http://www.userdatabase.com/users",
        {
            statusCode: 200,
            body: JSON.stringify(exampleUsers)

        }).as("APIRequest");

        cy.get("button").click();
        cy.wait("@APIRequest");

        cy.get("ul[id = 'users']").children().should('have.length', 4);
        cy.get("ul[id = 'users']").contains("Name: Name1 Lastname1").should("have.text", "Name: " +  exampleUsers[0].name + " " + exampleUsers[0].lastname)
                                .next().should("have.text", "Name: " +  exampleUsers[1].name + " " + exampleUsers[1].lastname)
                                .next().should("have.text", "Name: " +  exampleUsers[2].name + " " + exampleUsers[2].lastname)
                                .next().should("have.text", "Name: " +  exampleUsers[3].name + " " + exampleUsers[3].lastname);

    }),
    it("should show error message if no Users are Returned", () => {
        cy.visit("/users");
        cy.intercept( "GET", "http://www.userdatabase.com/users",
        {
            statusCode: 404

        }).as("APIRequest");

        cy.get("button").click();
        cy.wait("@APIRequest");

        cy.get("div").should("have.text", "There has been a Problem. Users are not retrievable!");

    })

    it("should show error message in case of network error", () => {
        cy.visit("/users");
        cy.intercept( "GET", "http://www.userdatabase.com/users",
        {
            forceNetworkError: true
        }).as("APIRequest");

        cy.get("button").click();
        cy.wait("@APIRequest");

        cy.get("div").should("have.text", "There has been a problem with the connection to the Server. Please try again at a later time!");

    })
});