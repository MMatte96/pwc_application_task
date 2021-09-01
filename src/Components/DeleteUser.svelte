<script>
    const handleSubmit = async() =>{
    
        if(name.trim() !== ""){
        const resp = await window.fetch("http://www.userdatabase.com/users/" + name, {
            method: "DELETE"
        }).catch(() => {
            setError("Connection to Server was not possible!");
        })

        if(resp != undefined){
            if(resp.ok){
                setSuccess("User deleted successfully");
            }else{

                setError("User not deletable!");
            }
        }
    } else{
        setError("Id must be filled out!");
    }

    }
    let error = false;
    let success = false;
    let successMessage = "", errorMessage = "";

    let name = "";

    const setSuccess = (pSuccessMessage) => {
        success = true;
        error = false;
        successMessage = pSuccessMessage;
    }

    const setError = (pErrorMessage) => {
        error = true;
        success = false;
        errorMessage = pErrorMessage;
    }
</script>


<h1>Delete User</h1>
<form on:submit|preventDefault = {handleSubmit}>
<label>
    Name
    <input type = "text" bind:value = {name} />
</label>
<button>Delete User</button>
    <div id="messageArea" class:error class:success>
        {#if success}
            SUCCESS: {successMessage}
        {:else if error}
            ERROR: {errorMessage}
        {/if}
    </div>
</form>

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