import {render, fireEvent} from "@testing-library/svelte";
import { tick } from "svelte";
import DeleteUsers from "../Components/DeleteUser.svelte";

let cont, button, txtId, messageArea;

beforeEach(() => {
    const {container} = render(DeleteUsers);
    cont = container;
    button = cont.querySelector("button");
    txtId = cont.querySelector("input");
    messageArea = cont.querySelector("#messageArea");
    window.fetch = jest.fn();
})

const assertStartState = () =>{
    expect(messageArea.innerHTML).toBe("");
}

const fetchOkResponse =  Promise.resolve({ok: true});
const fetchNotOkResponse = Promise.resolve({ok: false});
const fetchExceptionResponse = () => Promise.reject("ApiNotReachable");


describe("Component DeleteUsers", () => {
    it("should display success message if API returns success for deleting user", async() =>{
        window.fetch.mockImplementation(() => {return fetchOkResponse;});
        assertStartState();

        await fireEvent.input(txtId, {target : {value: "Michael Matte"}});
        await fireEvent.click(button);
        await tick();
        await tick();
        
        
        expect(messageArea.innerHTML).toBe("SUCCESS: User deleted successfully");
    });
    it("should display error message if API returns failure for deleting user", async() =>{
        window.fetch.mockImplementation(() => {return fetchNotOkResponse;});
        assertStartState();

        await fireEvent.input(txtId, {target: {value: "Michael Matte"}});
        await fireEvent.click(button);
        await tick();
        await tick();
        expect(messageArea.innerHTML).toBe("ERROR: User not deletable!");
    });
    it("should display error message if API can not be reached", async ()=>{
        window.fetch.mockImplementation(() => {return fetchExceptionResponse();});
        assertStartState();

        await fireEvent.input(txtId, {target: {value: "Michael Matte"}});
        await fireEvent.click(button);
        await tick();
        await tick();
        expect(messageArea.innerHTML).toBe("ERROR: Connection to Server was not possible!")
    });
    it("should display error message if ID was not given in text input", async () =>{
        assertStartState();
        await fireEvent.click(button);
        await tick();
        await tick();
        expect(messageArea.innerHTML).toBe("ERROR: Id must be filled out!")
    })
});