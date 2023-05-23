import { gamestate } from '@/store/game-state/gamestateStore'

import { PyramidLetterGroup } from '@/models/pyramidLetterGroup.model'
import { Player } from '@/models/player.model'
import { Phases } from '@/enums/phases.enum'

let pointBase = -4

export const addPoints = (player: Player, points: number) => {
  player.points += points
  if (player.points > gamestate().settings.maxPoints) {
    player.points = gamestate().settings.maxPoints
  }

  if (player.points < 0) {
    player.points = 0
  }
}

export const getPyramid = () => {
  let atLeastOneLetter = false
  gamestate().pyramidLetterGroups.forEach((group: PyramidLetterGroup) => {
    for (let x = 1; x <= group.numOfLettersInPyramid; x++) {
      group.usedQuoteLetters = group.letters.filter(
        (l: string) => gamestate().parsedQuote.includes(l) && !group.playedLetters.includes(l)
      )
      group.unusedQuoteLetters = group.letters.filter(
        (l: string) =>
          !gamestate().parsedQuote.includes(l) ||
          (gamestate().parsedQuote.includes(l) && !group.playedLetters.includes(l))
      )

      if (
        (Math.floor(Math.random() * (group.points - 1 + 2) + 1) === group.points &&
          group.usedQuoteLetters.length) ||
        !group.unusedQuoteLetters.length
      ) {
        const l = group.usedQuoteLetters[Math.floor(Math.random() * group.usedQuoteLetters.length)]
        group.availableLetters.push(l)
        group.playedLetters.push(l)
        atLeastOneLetter = true
      } else {
        const ul =
          group.unusedQuoteLetters[Math.floor(Math.random() * group.unusedQuoteLetters.length)]
        group.availableLetters.push(ul)
        group.playedLetters.push(ul)
      }
    }
  })

  if (!atLeastOneLetter) {
    const avaiblableLetterGroup = gamestate().pyramidLetterGroups.find(
      (group: PyramidLetterGroup) => group.usedQuoteLetters.length
    )
    if (!avaiblableLetterGroup) return console.error('No avaiblableLetterGroup was found!')

    const randomIndex = Math.floor(
      Math.random() * (avaiblableLetterGroup.numOfLettersInPyramid - 1 + 1)
    )

    avaiblableLetterGroup.availableLetters[randomIndex] = avaiblableLetterGroup.usedQuoteLetters[0]
  }

  return gamestate().pyramidLetterGroups
}

export const startRound = (text: string) => {
  gamestate().quote.text = text
  gamestate().uniqueLettersInQuote = gamestate().parsedQuote.filter((v, i, a) => a.indexOf(v) == i)
  gamestate().timer = 10
}

export const secondTicker = () => {
  const ticker = setInterval(() => {
    if (gamestate().timer >= -13) {
        gamestate().timer -= 1
    }

    if (gamestate().timer === -3) {
        gamestate().phase = Phases.RESULT

        gamestate().alreadyPlayedLettersInQuote.push(gamestate().thisPlayer.selectedLetter)
        const selectedLetterGroup =
        gamestate().pyramidLetterGroups.find((pg: PyramidLetterGroup) =>
            pg.letters.includes(gamestate().thisPlayer.selectedLetter)
        ) ?? null
        const numOfLettersInQuote = gamestate().parsedQuote.filter(
        (l: string) => l === gamestate().thisPlayer.selectedLetter
        ).length

        if (selectedLetterGroup) {
        if (gamestate().uniqueLettersInQuote.includes(gamestate().thisPlayer.selectedLetter)) {
            pointBase = selectedLetterGroup.points * numOfLettersInQuote
        } else {
            pointBase = selectedLetterGroup.points * -1
        }
        }

        addPoints(gamestate().thisPlayer as Player, pointBase)

        if ((gamestate().players as Player[]).some((p) => p.points >= gamestate().settings.maxPoints)) {
        clearInterval(ticker)
        return
        }
    }

    if (gamestate().timer === -5) {
        (gamestate().thisPlayer as Player).latestPoints  = pointBase
    }

    if (gamestate().timer === -10) {
        gamestate().timer = 11
        gamestate().phase = Phases.PYRAMID

        resetRound()
    }
    }, 1000)
}

export const resetRound = () => {
  gamestate().uniqueLettersInQuote = gamestate().uniqueLettersInQuote.filter(
    (l: string) => l !== gamestate().thisPlayer.selectedLetter
  )

  gamestate().pyramidLetterGroups.forEach((pg: PyramidLetterGroup) => {
    pg.availableLetters = []
    pg.playedLetters = []
  })

  ;(gamestate().players as Player[]).forEach((p) => {
    p.selectedLetter = ''
    p.latestPoints = null
  })

  pointBase = -4

  console.log('Played letters:')
  console.log(gamestate().alreadyPlayedLettersInQuote)
  console.log('------------')
  console.log('------------')
  console.log('Still available letters:')
  console.log(gamestate().uniqueLettersInQuote)
  console.log('------------')
  console.log('------------')
}
