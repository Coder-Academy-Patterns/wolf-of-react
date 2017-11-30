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

export function loadNewsForStock(symbol) {
  return api.get(`/stock/${symbol}/news/last/10`)
  .then((res) => res.data)
}

export function load6MonthHistoryForStock(symbol) {
  return api.get(`/stock/${symbol}/chart/6m`)
  .then((res) => res.data)
}
