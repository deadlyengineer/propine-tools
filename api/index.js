import fetch from 'node-fetch'

import { crypto_url, crypto_key } from '../constants/index.js'

// fetch token price from crypto api
export const convertCurrency = (_from, _to) => {
  let url = new URL(crypto_url)
  url.search = new URLSearchParams({
    fsym: _from,
    tsyms: _to,
    api_key: crypto_key,
  }).toString()

  /// fetch and return price
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Wrong response')
      }
    })
    .then((response) => {
      if (response.Response == 'Error') {
        throw new Error(response.Message)
      }
      return response[_to]
    })
    .catch(() => {
      return 0
    })
}
