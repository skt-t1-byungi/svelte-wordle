<script lang="ts" context="module">
    type Cell = {
        alpha?: string
        status: typeof ALPHA_STATUS
    }
    const EMPTY_ROWS: Cell[][] = Array(6).fill(Array(5).fill({ status: ALPHA_STATUS.NONE }))
</script>

<script lang="ts">
    import cx from 'clsx'
    import { defaults } from 'lodash-es'
    import { getAlphaStatus, state, wait } from './store'
    import { ALPHA_STATUS } from './const'
    import delay from 'delay'
    import { onDestroy } from 'svelte'
    import { aico } from 'aico'
    const { history, alphas } = state

    $: rows = defaults(
        [
            ...$history.map(alphas =>
                alphas.map((alpha, i) => ({
                    alpha,
                    status: getAlphaStatus(alpha, i),
                }))
            ),
            defaults(
                $alphas.map(alpha => ({ alpha, status: ALPHA_STATUS.NONE })),
                EMPTY_ROWS[0]
            ),
        ],
        EMPTY_ROWS
    ).slice(0, 6) as Cell[][]

    let shakeRow = -1
    const loop = aico(function* (signal) {
        while (true) {
            yield wait('wrong')
            shakeRow = $history.length
            yield delay(500, { signal })
            shakeRow = -1
        }
    })
    onDestroy(() => loop.abort())
</script>

<div class="grid gap-y-4 gap-x-2 grid-cols-5">
    {#each rows as row, rowIdx}
        {#each row as cell}
            <span
                class={cx(
                    'aspect-square rounded flex items-center justify-center uppercase box-border shadow-inner font-present text-lg transition-all duration-50',
                    {
                        [ALPHA_STATUS.CORRECT]: 'bg-green-300 text-green-600',
                        [ALPHA_STATUS.CONTAINS]: 'bg-orange-300 text-orange-500',
                        [ALPHA_STATUS.WRONG]: 'bg-white-linen-700 text-white-linen-600',
                        [ALPHA_STATUS.NONE]: 'bg-lochinvar-300 text-lochinvar-600 ',
                    }[String(cell.status)]
                )}
                class:shake={shakeRow === rowIdx}
            >
                {cell.alpha ?? ''}
            </span>
        {/each}
    {/each}
</div>

<style>
    .shake {
        animation: shake 0.5s 1;
        @apply bg-red-300 text-red-600;
    }
    @keyframes shake {
        10%,
        30%,
        50%,
        70%,
        90% {
            transform: translate(-10px, 0);
        }
        20%,
        40%,
        60%,
        80%,
        100% {
            transform: translate(10px, 0);
        }
    }
</style>
