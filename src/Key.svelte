<script lang="ts">
    import cx from 'clsx'
    import { createEventDispatcher } from 'svelte'
    import { ALPHA_STATUS } from './const'

    export let key: string
    export let status = ALPHA_STATUS.NONE
    let pressing = false

    const dispatch = createEventDispatcher()
</script>

<svelte:window
    on:keydown={e => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
            dispatch('press')
            pressing = true
        }
    }}
    on:keyup={e => {
        if (e.key.toLowerCase() === key.toLowerCase() && pressing) {
            pressing = false
        }
    }}
/>
<span
    class={cx(
        'px-3 py-2 inline-block text-xs uppercase rounded cursor-pointer font-present text-slates-700',
        {
            [ALPHA_STATUS.CORRECT]: 'bg-green-300',
            [ALPHA_STATUS.CONTAINS]: 'bg-orange-300',
            [ALPHA_STATUS.WRONG]: 'bg-white-linen-700',
            [ALPHA_STATUS.NONE]: 'bg-gray-300',
        }[status]
    )}
    class:pressing
    on:click={() => dispatch('press')}
>
    {#if $$slots.default}
        <slot />
    {:else}
        {key}
    {/if}
</span>

<style>
    span {
        text-shadow: 2px 2px 1px rgba(255, 255, 255, 0.6);
        box-shadow: 0 2px 1px theme('colors.gray.400'), 0 3px 1px 1px theme('colors.gray.400');
    }
    span:is(.pressing, :active) {
        @apply scale-90 bg-mulberry-300 text-mulberry-600;
    }
</style>
