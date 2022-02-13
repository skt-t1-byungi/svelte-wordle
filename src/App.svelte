<script lang="ts">
    import './main.css'
    import Board from './Board.svelte'
    import Keyboard from './Keyboard.svelte'
    import Modal from './Modal.svelte'
    import { dispatch, state } from './store'
    const { status, isWin, answer } = state

    function start() {
        dispatch('start')
    }
</script>

<main class="text-center max-w-xl mx-auto select-none">
    <h1 class="font-present text-6xl mb-6 mt-4 text-white-linen-800">wordle</h1>
    <div class="w-3/5 mx-auto mb-4">
        <Board />
    </div>
    <div>
        <Keyboard />
    </div>
</main>

{#if $status === 'before'}
    <Modal on:close={start}>
        <div>
            <h1>Welcome Worlde</h1>
            <button on:click={start}>start</button>
        </div>
    </Modal>
{:else if $status === 'end'}
    {#if $isWin}
        <Modal on:close={start}>
            <div>
                <h1>Win</h1>
                <p>Answer: {$answer}</p>
                <button on:click={start}>restart</button>
            </div>
        </Modal>
    {:else}
        <Modal on:close={start}>
            <div>
                <h1>Lose</h1>
                <p>Answer: {$answer}</p>
                <button on:click={start}>restart</button>
            </div>
        </Modal>
    {/if}
{/if}
