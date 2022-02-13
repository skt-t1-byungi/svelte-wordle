<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'
    import { fade, fly } from 'svelte/transition'

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
        transition:fade
        bind:this={el}
        class="bg-black/30 fixed w-screen h-screen top-0 left-0 flex justify-center items-center flex-col"
        on:click|self={onClose}
    >
        <div
            transition:fly={{ y: 10 }}
            class="bg-mulberry-200 border-white-linen-500 text-orange-800 py-8 relative text-xl border-8 rounded-2xl  min-w-[350px] text-center drop-shadow-2xl"
        >
            <slot />
        </div>
    </div>
{/if}
