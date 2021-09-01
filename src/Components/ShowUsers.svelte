<script>
	const getAllUsers = async () => {

		const resp = await window.fetch("http://www.userdatabase.com/users").catch(() => {
			error = "There has been a problem with the connection to the Server. Please try again at a later time!";
		});

		if(resp != undefined){
			if(resp.ok){
				error = '';

				try{
					users = JSON.parse(await resp.text());
				}catch(err){
					error = err;
				}

			}else{
				users= [];
				error = "There has been a Problem. Users are not retrievable!";
			}
		}
	}

	let users = [];
	let error = '';

</script>

<h1>Show all Users</h1>
<button on:click={getAllUsers}>Show all Users</button>

{#if users}
	<ul id = "users">
		{#each users as user}
			<li>Name: {user.name} {user.lastname}</li>
		{/each}
	</ul>
{/if}
{#if error}
	<div class="error">{error}</div>
{/if}

<style>
	.error{
		width: fit-content;
		height: fit-content;
		border: 2px solid red;
		text-align: center;
		padding: 1em;
	}
</style>