import AddUser from "../Components/AddUser.svelte";
import {render, fireEvent} from "@testing-library/svelte";
import { tick } from "svelte";

let button, inputName, inputLastName, cont, messageArea;
beforeEach(() => {
    const {container} = render(AddUser);
    cont = container;
    button = cont.querySelector("button");
    inputName = cont.querySelector("#txtName");
    inputLastName = cont.querySelector("#txtLastName");
    messageArea = cont.querySelector("#messageArea");
    window.fetch = jest.fn();
});

const assertStartState = () => {
    expect(messageArea.innerHTML).toBe("");
}

const exampleUser = {name: "Name", lastname: "LastName"};

const fetchOkResponse =  Promise.resolve({ok: true});
const fetchNotOkResponse = Promise.resolve({ok: false});
const fetchErrorResponse = () => Promise.reject("ApiNotReachable");



describe("Component AddUser", () => {
    it("should add User if form is filled out", async () =>{
        window.fetch.mockImplementation(() => {return fetchOkResponse;});
        assertStartState();

        await fireEvent.input(inputName, {target: {value: exampleUser.name}});
        await fireEvent.input(inputLastName, {target: {value: exampleUser.lastname}});
        await fireEvent.click(button);

        await tick();
        await tick();
        expect(window.fetch).toBeCalledTimes(1);
        expect(messageArea.innerHTML).toBe("SUCCESS: User: " + exampleUser.name + " " + exampleUser.lastname + " added successfully")
    });
    it("should display error Message if one of the input elements is empty", async () =>{
        assertStartState();

        await fireEvent.input(inputName, {target: {value: ""}});
        await fireEvent.input(inputLastName, {target: {value: exampleUser.lastname}});
        await fireEvent.click(button);

        await tick();
        await tick();

        expect(window.fetch).toBeCalledTimes(0);
        expect(messageArea.innerHTML).toBe("ERROR: Users data must be filled out completely!");
    });
    it("should display error message if connection to the API was not possible", async () =>{
        window.fetch.mockImplementation(() => {return fetchErrorResponse();});
        assertStartState();
        
        await fireEvent.input(inputName, {target: {value: exampleUser.name}});
        await fireEvent.input(inputLastName, {target: {value: exampleUser.lastname}});
        await fireEvent.click(button);

        await tick();
        await tick();

        expect(window.fetch).toBeCalledTimes(1);
        expect(messageArea.innerHTML).toBe("ERROR: Connection to Server was not possible!");
    });
    it("should display error message if request has been denied by the API", async () => {
        window.fetch.mockImplementation(() => {return fetchNotOkResponse;});
        assertStartState();
        
        await fireEvent.input(inputName, {target: {value: exampleUser.name}});
        await fireEvent.input(inputLastName, {target: {value: exampleUser.lastname}});
        await fireEvent.click(button);
        
        await tick();
        await tick();

        expect(window.fetch).toBeCalledTimes(1);
        expect(messageArea.innerHTML).toBe("ERROR: User could not be added!");
    })
})