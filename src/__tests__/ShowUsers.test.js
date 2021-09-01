import {render, fireEvent} from "@testing-library/svelte";
import { tick } from "svelte";
import ShowUsers from "../components/ShowUsers";

const exampleUsers = [
    {name: "Name1", lastname: "Lastname1"},
    {name: "Name2", lastname: "Lastname2"},
    {name: "Name3", lastname: "Lastname3"},
    {name: "Name4", lastname: "Lastname4"}
];

const fetchOkResponse =  Promise.resolve({ok: true, text: () => JSON.stringify(exampleUsers)});
const fetchNotOkResponse = Promise.resolve({ok: false});
const fetchErrorResponse = () => Promise.reject("ApiNotReachable");

let button, cont;

beforeEach(() => {
    const {container} = render(ShowUsers);
    cont = container;
    button = cont.querySelector("button");
    
    window.fetch = jest.fn();
});

const assertStartState = () => {
    let ul = cont.querySelector("ul");
    let errorDiv = cont.querySelector("div .error");

    expect(window.fetch).toBeCalledTimes(0);
    expect(ul.innerHTML).toBe("");
    expect(errorDiv).toBeNull();
}

describe("Component ShowUsers", () => {
    it("should show all returned User", async() => {
        window.fetch.mockImplementation(() => {return fetchOkResponse;});
        
        assertStartState()

        await fireEvent.click(button);
        let resultHtml = '<ul id="users">';
        for(let user of exampleUsers){
            resultHtml += '<li>Name: ' + user.name + ' ' + user.lastname + '</li>';
        }
        resultHtml += '</ul>'

        await tick();
        await tick();

        const ul = cont.querySelector("ul");
        const errorDiv = cont.querySelector("div .error");

        expect(window.fetch).toBeCalledTimes(1)
        expect(ul).toContainHTML(resultHtml); 
        expect(errorDiv).toBeNull();       
    });

    it("should show error message when retrieving users was not possible", async () => {
        window.fetch.mockImplementation(() => {return fetchNotOkResponse;});

        assertStartState();

        await fireEvent.click(button);
    
        await tick();
        await tick();

        const errorDiv = cont.querySelector("div .error");
        const ul = cont.querySelector("ul");

        expect(window.fetch).toBeCalledTimes(1)
        expect(errorDiv).not.toBeNull();
        expect(ul.innerHTML).toBe("");
        expect(errorDiv.innerHTML).toBe("There has been a Problem. Users are not retrievable!");
    })

    it("should show error message when API call was not possible", async () => {
        window.fetch.mockImplementation(() => {return fetchErrorResponse();});
        assertStartState();
        
        await fireEvent.click(button);

        await tick();
        await tick();

        const errorDiv = cont.querySelector("div .error");
        const ul = cont.querySelector("ul");

        expect(window.fetch).toBeCalledTimes(1);
        expect(errorDiv).not.toBeNull();
        expect(ul.innerHTML).toBe("");
        expect(errorDiv.innerHTML).toBe("There has been a problem with the connection to the Server. Please try again at a later time!");
    })
});
