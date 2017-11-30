import React from 'react'

function SymbolHistory({
  symbolHistory,
  onChooseSymbol
}) {
  return (
    <div>
      <h2>History</h2>
      <ul>
      {
        symbolHistory.map((symbol, index) => (
          <li key={ `${symbol}-${index}` }>
            <button
              onClick={
                () => {
                  onChooseSymbol(symbol)
                }
              }
            >
              { symbol }
            </button>
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default SymbolHistory