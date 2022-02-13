<script context="module" lang="ts">
    const LAYOUT = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map(str => str.split(''))
</script>

<script lang="ts">
    import { ALPHA_STATUS } from './const'
    import Key from './Key.svelte'
    import { dispatch, state, getAlphaStatus } from './store'

    const { status, history } = state

    $: isPlaying = $status === 'playing'
    $: statusMap = $history.reduce((o, alphas) => {
        alphas.forEach((alpha, i) => {
            o[alpha] = Math.max(o[alpha] ?? 0, getAlphaStatus(alpha, i))
        })
        return o
    }, {})
</script>

{#each LAYOUT as cols, i}
    <div class="space-y-2 space-x-1 ">
        {#if i === 2}
            <Key key="Enter" on:press={() => isPlaying && dispatch('enter')} />
        {/if}
        {#each cols as key}
            <Key
                {key}
                on:press={() => isPlaying && dispatch('type', key)}
                status={statusMap[key] ?? ALPHA_STATUS.NONE}
            />
        {/each}
        {#if i === 2}
            <Key key="Backspace" on:press={() => isPlaying && dispatch('del')}>Back</Key>
        {/if}
    </div>
{/each}
