<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'

    export let show = true
    const dispatch = createEventDispatcher()
    let el: HTMLDivElement

    onMount(() => {
        if (el) document.body.append(el)
    })

    function onClose() {
        dispatch('close')
    }
</script>

<svelte:window
    on:keydown={e => {
        if (show && e.key === 'Escape') onClose()
    }}
/>
{#if show}
    <div
        bind:this={el}
        class="bg-black/50 fixed w-screen h-screen top-0 left-0 flex justify-center items-center flex-col"
        on:click|self={onClose}
    >
        <div class="bg-white py-6 px-8 rounded-lg relative">
            <span
                class="absolute inline-block leading-none p-2 bottom-[calc(100%+2px)] right-0 before:content-['X'] cursor-pointer text-xl text-gray-800"
                on:click={onClose}
            />
            <slot />
        </div>
    </div>
{/if}
