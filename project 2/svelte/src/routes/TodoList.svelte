<script>
    import TodoListElement from "./TodoListElement.svelte";
    import { todos } from "$lib/todostore";
    import { onMount } from "svelte";
    import {axios,endpoint} from '$lib';
    
    onMount(async () => {
        // @ts-ignore
        $todos = await axios.get(endpoint).then(res => res.data)
    });

    // @ts-ignore
    async function delTodo(event){
        const id = event.detail.id;
        // @ts-ignore
        await axios.delete(`${endpoint}/${id}`)
        $todos = $todos.filter(todo => todo.id !== id);     
    }

    // @ts-ignore
    async function handleToggle(event){
        const targetId = event.detail.id;
        const targetIndex = $todos.findIndex(x=>x.id===targetId);
        // @ts-ignore
        await axios.patch(`${endpoint}/${targetId}`,{done:!$todos[targetIndex].done})
        $todos[targetIndex].done = !$todos[targetIndex].done
    }

</script>


<div class="w-[600px] pb-20">

    <ul class="flex flex-col gap-2">
        {#each $todos as todoItem}        
            <TodoListElement {todoItem} on:delete={delTodo} on:toggle={handleToggle}/>  
        {/each}
    </ul>
    
</div>