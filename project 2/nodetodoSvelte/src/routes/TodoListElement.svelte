<script>  
    export let todoItem = {id:undefined, title:undefined, done:undefined};  
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();    

</script>


<li class="flex gap-2 cursor-pointer">

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span on:click={() => dispatch('toggle',{id:todoItem.id})}
    class:opacity-20={todoItem.done}
    class="w-full min-h-[50px] p-3 bg-orange-400 rounded-md font-medium overflow-x-auto" >
        {todoItem.title}
    </span>
    
    <button on:click={() => dispatch('delete',{id:todoItem.id})}
    class="bg-orange-500 rounded-md min-w-[50px] h-[50px] text-center font-bold">X</button>
    
</li>