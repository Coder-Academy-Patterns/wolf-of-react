import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
})

export function loadQuoteForStock(symbol) {
  return api.get(`/stock/${symbol}/quote`)
    .then((res) => res.data)
}

export function loadLogoURLForStock(symbol) {
  return api.get(`/stock/${symbol}/logo`)
    .then((res) => res.data.url)
}
