import React from 'react'

function StockHistoricalTable({
  title,
  dailyData
}) {
  return (
    <div>
      <h2>{ title }</h2>
      <table>
        <thead>
          <th>Open</th>
          <th>Close</th>
          <th>% Change</th>
        </thead>
        <tbody>
        {
          dailyData.map((dayData) => (
            <tr
              key={ dayData.date }
              className={
                dayData.changePercent === 0 ? 'neutral' : dayData.changePercent < 0 ? 'negative' : 'positive'
              }
            >
              <td>{ dayData.open }</td>
              <td>{ dayData.close }</td>
              <td>{ dayData.changePercent }</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default StockHistoricalTable