<script lang="ts">
    import './main.css'
    import { sample } from 'lodash-es'
    let answer = sample(['value', 'aimer'])
    const board = Array.from({ length: 6 }, () => Array(5).fill(null))
</script>

<main>
    <h1>wordle</h1>
    <ul class="list-none">
        {#each board as chars}
            <li class="space-x-2">
                {#each chars as char}
                    <span class="bg-gray-300 w-10 h-10 inline-block">{char ?? ''}</span>
                {/each}
            </li>
        {/each}
    </ul>
</main>
