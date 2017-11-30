import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

function StockHistoricalChart({
  title,
  dailyData
}) {
  return (
    <div>
      <h2>{ title }</h2>
      <AreaChart
        width={ 600 }
        height={ 300 }
        data={ dailyData }
      >
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='close'
          fill='#1D8367'
          fillOpacity={ 1 }
        />
      </AreaChart>
    </div>
  )
}

export default StockHistoricalChart