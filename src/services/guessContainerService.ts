import { fetchRandomQuote } from "@/providers/guessProvider"
import { gamestate } from "@/store/game-state/gamestateStore"
import { startRound } from "./gamestateService"

const getRandomQuoteAndStartGame = async () => {
    const quote = await fetchRandomQuote()

    const state = gamestate()
    state.quote = { text: quote.text.slice(1, -2), author: quote.author }
    startRound(quote.text)
}

export default { getRandomQuoteAndStartGame }