<script lang="ts">
    import cx from 'clsx'
    import { createEventDispatcher } from 'svelte'
    import { ALPHA_STATUS } from './const'

    export let key: string
    export let status = ALPHA_STATUS.NONE

    const dispatch = createEventDispatcher()
</script>

<svelte:window
    on:keydown={e => {
        if (e.key.toLowerCase() === key.toLowerCase()) dispatch('press')
    }}
/>
<span
    class={cx(
        'px-3 py-2 inline-block text-sm uppercase rounded cursor-pointer font-present',
        {
            [ALPHA_STATUS.CORRECT]: 'bg-green-300 hover:bg-green-400',
            [ALPHA_STATUS.CONTAINS]: 'bg-orange-300 hover:bg-orange-400',
            [ALPHA_STATUS.WRONG]: 'bg-gray-400 hover:bg-gray-500',
            [ALPHA_STATUS.NONE]: 'bg-gray-300 hover:bg-gray-400',
        }[status]
    )}
    on:click={() => dispatch('press')}
>
    {#if $$slots.default}
        <slot />
    {:else}
        {key}
    {/if}
</span>
