import { Quote } from '@/models/quote.model'

export const fetchRandomQuote = async () => {
  const response = await fetch(
    'https://us-central1-mql-playground.cloudfunctions.net/api/random-quote'
  )
  const quoteModel: Quote = await response.json()
  return quoteModel
}
