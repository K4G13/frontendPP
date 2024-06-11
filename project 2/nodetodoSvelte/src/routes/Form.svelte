<script>
    import { todos } from "$lib/todostore";
    import {axios,endpoint} from '$lib';

    let newTitle = "";
    async function addTodo() {
        if(newTitle==="") return;
        // @ts-ignore
        const res = await axios.post(endpoint,{title:newTitle}).then(res => res.data);
        $todos = [...$todos,{ id:res.id ,title: res.title, done: res.done}];
        newTitle = "";
    }
    
</script>

<div class="w-[600px] flex justify-center">
    <form class="flex gap-2">

        <input bind:value={newTitle}
        class="bg-transparent border-[2px] border-orange-500 rounded-md w-[530px] py-2 text-white text-center" type="text">

        <button on:click={addTodo}
        class="px-4 bg-orange-500 rounded-md">Add</button>

    </form>
</div>