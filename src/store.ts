import { sample } from 'lodash-es'
import type { Readable } from 'svelte/store'
import { writable, derived, get } from 'svelte/store'
import { ALPHA_STATUS } from './const'
import { createNanoEvents } from 'nanoevents'
import dataset from './dataset.json'

const status = writable<'before' | 'playing' | 'end'>('before')
const history = writable<string[][]>([])
const alphas = writable<string[]>([])
const answer = writable<string>('abcde')

export const state = {
    status: toReadOnly(status),
    history: toReadOnly(history),
    alphas: toReadOnly(alphas),
    answer: toReadOnly(answer),
    isWin: derived([history, answer], ([$history, $answer]) => $history.at(-1)?.join('') === $answer),
}

type Events = {
    start(): void
    type(alpha: string): void
    del(): void
    enter(): void
    end(win: boolean): void
    wrong(): void
    next(): void
}
const ee = createNanoEvents<Events>()

ee.on('start', () => {
    status.set('playing')
    history.set([])
    alphas.set([])
    answer.set(sample(dataset))
})
ee.on('type', alpha => {
    assertPlaying()
    alphas.update(v => {
        if (v.length === 5) {
            v[4] = alpha
        } else {
            v.push(alpha)
        }
        return v
    })
})
ee.on('del', () => {
    assertPlaying()
    alphas.update(v => v.slice(0, -1))
})
ee.on('enter', () => {
    assertPlaying()
    const $alphas = get(alphas)
    if ($alphas.length < 5) {
        return
    }
    const word = $alphas.join('')
    if (word === get(answer)) {
        history.update(v => [...v, $alphas])
        dispatch('end', true)
        return
    }
    if (!dataset.includes(word)) {
        dispatch('wrong')
        return
    }
    history.update(v => [...v, $alphas])
    alphas.set([])
    if (get(history).length === 6) {
        dispatch('end', false)
        return
    }
    dispatch('next')
})
ee.on('end', () => {
    assertPlaying()
    alphas.set([])
    status.set('end')
})

export function dispatch<K extends keyof Events>(name: K, ...args: Parameters<Events[K]>) {
    return ee.emit(name, ...args)
}

export function wait<K extends keyof Events>(name: K) {
    return new Promise<Parameters<Events[K]>[0]>((resolve: Events[K]) => ee.on(name, resolve))
}

export function getAlphaStatus(alpha: string, index: number) {
    const $answer = get(answer)
    return alpha === $answer[index]
        ? ALPHA_STATUS.CORRECT
        : $answer.includes(alpha)
        ? ALPHA_STATUS.CONTAINS
        : ALPHA_STATUS.WRONG
}

function toReadOnly<T>({ subscribe }: Readable<T>) {
    return { subscribe }
}

function assertPlaying() {
    if (get(status) !== 'playing') {
        throw new Error('not playing')
    }
}
