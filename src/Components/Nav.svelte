<script>
    import {Router, Link} from "svelte-routing";

    let navpoints = [
        {text: "Show all Users", link: "users"},
        {text: "Add new User", link: "users/add"},
        {text: "Delete User", link: "users/delete"}
    ];

    const url = "";
</script>

<Router url={url}>
    <ul>
        {#each navpoints as point}
            <li><Link to= {point.link}>{point.text}</Link></li>
        {/each}
    </ul>
</Router>

<style>
    ul{
        list-style-type: none;
        margin: 0;
        margin-bottom: 2em;
        padding: 0;
        overflow: hidden;
    }

    li{
        float:left;
        margin-left: 1em;
    }
</style>