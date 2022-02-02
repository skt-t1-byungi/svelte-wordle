<script lang="ts" context="module">
    type Cell = {
        alpha?: string
        status: typeof ALPHA_STATUS
    }
    const EMPTY_ROWS: Cell[][] = Array(6).fill(Array(5).fill({ status: 'none' }))
</script>

<script lang="ts">
    import cx from 'clsx'
    import { defaults } from 'lodash-es'
    import { getAlphaStatus, state } from './store'
    import { ALPHA_STATUS } from './const'
    const { history, alphas, answer } = state

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
</script>

<div class="grid gap-y-4 gap-x-2 grid-cols-5">
    {#each rows as row}
        {#each row as cell}
            <span
                class={cx(
                    'aspect-square rounded flex items-center justify-center uppercase box-border border-4 border-gray-300',
                    {
                        [ALPHA_STATUS.CORRECT]: 'bg-green-300 border-green-400',
                        [ALPHA_STATUS.CONTAINS]: 'bg-orange-300 border-orange-400',
                        [ALPHA_STATUS.WRONG]: 'bg-gray-300',
                    }[String(cell.status)]
                )}
            >
                {cell.alpha ?? ''}
            </span>
        {/each}
    {/each}
</div>
