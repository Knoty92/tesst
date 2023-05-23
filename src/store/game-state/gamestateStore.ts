import { defineStore } from 'pinia'
import { Phases } from '@/enums/phases.enum'
import { Quote } from '@/models/quote.model'
import StoreType from '../storeType.enum'
import { GameSettings } from '@/models/gameSettings.model'
import { Player } from '@/models/player.model'
import { PyramidLetterGroup } from '@/models/pyramidLetterGroup.model'

export const gamestate = defineStore(StoreType.gamestate, {
  state: () => {
    return {
      players: [
        {
          id: '0',
          points: 0,
          name: 'Zahy',
          selectedLetter: '',
          latestPoints: null,
        },
        {
          id: '1',
          points: 0,
          name: 'Knoty',
          selectedLetter: '',
          latestPoints: null,
        },
      ],
      settings: {
        spaceBetween: 100,
        maxPoints: 50,
        bounds: [0, 0],
        appHeight: 0,
        appWidth: 0,
        speed: 0.03,
      } as GameSettings,
      pyramidLetterGroups: [
        {
          points: 8,
          numOfLettersInPyramid: 1,
          letters: ['Á', 'Č', 'Ď', 'É', 'Í', 'Ň', 'Ó', 'Ř', 'Š', 'Ť', 'Ž'],
          availableLetters: [],
          playedLetters: [],
          usedQuoteLetters: [],
          unusedQuoteLetters: [],
        },
        {
          points: 4,
          numOfLettersInPyramid: 2,
          letters: ['Z', 'J', 'C', 'B', 'H', 'G', 'Q', 'W', 'X'],
          availableLetters: [],
          playedLetters: [],
          usedQuoteLetters: [],
          unusedQuoteLetters: [],
        },
        {
          points: 2,
          numOfLettersInPyramid: 3,
          letters: ['M', 'P', 'S', 'L', 'R', 'D', 'F'],
          availableLetters: [],
          playedLetters: [],
          usedQuoteLetters: [],
          unusedQuoteLetters: [],
        },
        {
          points: 1,
          numOfLettersInPyramid: 4,
          letters: ['A', 'E', 'O', 'U', 'Y', 'N', 'T', 'I', 'V', 'K'],
          availableLetters: [],
          playedLetters: [],
          usedQuoteLetters: [],
          unusedQuoteLetters: [],
        },
      ] as PyramidLetterGroup[],
      quote: {
        text: '',
        author: '',
      } as Quote,
      uniqueLettersInQuote: [] as string[],
      alreadyPlayedLettersInQuote: [] as string[],
      timer: 10,
      thisPlayerId: '',
      currentPlayer: {
        id: '',
        name: ''
      } as Player,
      phase: 'LOBBYLIST' as keyof typeof Phases,
    }
  },

  getters: {
    parsedQuote: (state) =>
      state.quote.text
        .toUpperCase()
        .split('')
        .filter((l: string) => l !== ' '),
    thisPlayer: (state) =>
      state.players.find((p) => p.id == state.thisPlayerId) ?? state.players[0],
  },
})
