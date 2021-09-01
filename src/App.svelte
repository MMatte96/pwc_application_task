<script>
	import { Router, Route } from "svelte-routing";
    import Nav from "./Components/Nav.svelte";
    import ShowUsers from "./Components/ShowUsers.svelte";
    import AddUser from "./Components/AddUser.svelte";
    import DeleteUser from "./Components/DeleteUser.svelte";
    const url = "";
</script>

<main>
    <Nav/>
    <Router url={url}>
        <Route path="users"><ShowUsers></ShowUsers></Route>
        <Route path="users/add" component="{AddUser}"/>
        <Route path="users/delete" component="{DeleteUser}"/>
    </Router>
</main>