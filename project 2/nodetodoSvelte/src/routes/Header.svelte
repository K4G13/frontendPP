<script>
    import { todos } from "$lib/todostore";
    $: todoCounter = $todos.filter((x)=>x.done===false).length;
</script>

<div class="flex justify-center w-full p-4 bg-orange-500 rounded-md">
    <h1 class="flex items-center gap-8 text-5xl">nodeTODO svelte
        <span class="bg-orange-400 rounded-xl font-semibold size-[80px] flex justify-center place-items-center">
            {todoCounter}
        </span>
    </h1>
</div>