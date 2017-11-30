import React from 'react'

function StockQuote({
  symbol, // NFLX
  companyName, // Netflix Inc.
  primaryExchange, // Nasdaq Global Select
  latestPrice, // 188.15
  latestSource, // Close
  week52High, // 204.38
  week52Low, // 113.95
  logoImageURL
}) {
  return (
    <div>
      <h2>{ symbol }: { companyName }</h2>
      <h3>{ latestPrice } ({ latestSource })</h3>
      { !!logoImageURL &&
        <img src={ logoImageURL } />
      }
      <dl>
        <dt>Week 52 high</dt>
        <dd>{ week52High }</dd>

        <dt>Week 52 low</dt>
        <dd>{ week52Low }</dd>

        <dt>Exchange</dt>
        <dd>{ primaryExchange }</dd>
      </dl>
    </div>
  )
}

export default StockQuote