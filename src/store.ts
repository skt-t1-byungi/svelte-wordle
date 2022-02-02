import { sample } from 'lodash-es'
import type { Readable } from 'svelte/store'
import { writable, derived, get } from 'svelte/store'
import { ALPHA_STATUS } from './const'
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
    isRight: derived([history, answer], ([$history, $answer]) => $history.at(-1)?.join('') === $answer),
}

export function start() {
    status.set('playing')
    history.set([])
    alphas.set([])
    answer.set(sample(dataset))
}

export function type(alpha: string) {
    assertPlaying()
    alphas.update(v => {
        if (v.length === 5) {
            v[4] = alpha
        } else {
            v.push(alpha)
        }
        return v
    })
}

export function del() {
    assertPlaying()
    alphas.update(v => v.slice(0, -1))
}

export function enter() {
    assertPlaying()
    const $alphas = get(alphas)
    if ($alphas.length < 5) {
        return
    }
    const word = $alphas.join('')
    if (word === get(answer)) {
        history.update(v => [...v, $alphas])
        alphas.set([])
        status.set('end')
        return
    }
    if (!dataset.includes(word)) {
        return
    }
    history.update(v => [...v, $alphas])
    alphas.set([])
    if (get(history).length === 6) {
        status.set('end')
    }
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
