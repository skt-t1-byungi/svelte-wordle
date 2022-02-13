<script lang="ts">
    import './main.css'
    import Board from './Board.svelte'
    import Keyboard from './Keyboard.svelte'
    import Modal from './Modal.svelte'
    import confetti from 'canvas-confetti'
    import { emit, state } from './store'
    const { status, isWin, answer } = state

    function start() {
        emit('start')
    }

    $: if ($status === 'end' && $isWin) {
        confetti()
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
    <Modal>
        <h1>Welcome <span class="font-present text-mulberry-600">WORDLE</span></h1>
        <p class="mb-4">Pleas press start</p>
        <button on:click={start}>start</button>
    </Modal>
{:else if $status === 'end'}
    {#if $isWin}
        <Modal>
            <h1>You <span class="font-present text-mulberry-600">Win</span></h1>
            <p class="mb-4">Answer: {$answer}</p>
            <button on:click={start}>restart</button>
        </Modal>
    {:else}
        <Modal>
            <h1>You <span class="font-present text-mulberry-600">Lose</span></h1>
            <p class="mb-4">Answer: {$answer}</p>
            <button on:click={start}>restart</button>
        </Modal>
    {/if}
{/if}

<style>
    header {
        text-shadow: 2px 1px 1px theme('colors.mulberry.500'), 4px 2px 1px theme('colors.mulberry.500'),
            6px 3px 1px theme('colors.mulberry.500');
    }
    button {
        @apply font-present underline decoration-orange-700 decoration-wavy decoration-2 text-xl uppercase p-3 bg-red-500 text-red-100 rounded-xl transition-[color] border-4 border-red-600;
    }
    button:hover {
        @apply text-red-300;
    }
    button:active {
        @apply scale-95;
    }
</style>
