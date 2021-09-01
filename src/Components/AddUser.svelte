<script>

export const user = {
    name: "",
    lastname: ""
}

let error=false, errorMessage = "", success = false, successMessage = "";
const formSubmit = async () =>{
    error = false;
    success = false;

    if(valideUser()){
        const response = await window.fetch("http://www.userdatabase.com/users", 
        {
            method: "POST", 
            headers: {
            "Content-Type" : "json"
            },
            body: JSON.stringify(user)
        }).catch(() => {
            setError("Connection to Server was not possible!")
        });

        if(response != undefined){
            if(response.ok){
                setSuccess("User: " + user.name + " " + user.lastname + " added successfully");
            }else{
                setError("User could not be added!");
            }
        }

    }else{
        setError("Users data must be filled out completely!");
    }
}

const setError = (pErrorMessage) => {
    error = true;
    success = false;
    errorMessage = pErrorMessage;
}

const setSuccess = (pSuccessMessage) => {
    user.name = "";
    user.lastname = "";
    error = false;
    success = true;
    successMessage = pSuccessMessage;
}

const valideUser = () =>{
    return user.name.trim() !== "" && user.lastname.trim() !== "";
}

</script>
<h1>Add User</h1>
<form on:submit|preventDefault = {formSubmit}>
    <label>
        Name
        <input type="text" id="txtName" bind:value={user.name} />
    </label>
    <label>
        Last Name
        <input type="text" id="txtLastName" bind:value={user.lastname} />
    </label>
    <button id="buttonSubmit">Add User</button>
</form>
<div id="messageArea" class:error class:success>
{#if success}
    SUCCESS: {successMessage}
{:else if error}
    ERROR: {errorMessage}
{/if}
</div>

<style>

    #messageArea{
        width: fit-content;
        height: fit-content;
        text-align: center;
        margin-top: 2em;
        padding: 1em;
    }

    .success{
        border: 2px solid green;        
    }

    .error{
        border: 2px solid red;
    }
</style>