<script lang="ts">
    import './main.css'
    import Board from './Board.svelte'
    import Keyboard from './Keyboard.svelte'
    import Modal from './Modal.svelte'
    import { emit, state } from './store'
    const { status, isWin, answer } = state

    function start() {
        emit('start')
    }
</script>

<main class="text-center max-w-xl mx-auto select-none">
    <header class="font-present text-6xl mb-8 mt-6 text-mulberry-400 tracking-widest">wordle</header>
    <div class="w-3/5 mx-auto mb-10">
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

<style>
    header {
        text-shadow: 2px 1px 1px theme('colors.mulberry.500'), 4px 2px 1px theme('colors.mulberry.500'),
            6px 3px 1px theme('colors.mulberry.500');
    }
</style>
