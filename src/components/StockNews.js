import React from 'react'

function StockNews({
  news
}) {
  return (
    <div>
      <h2>News</h2>
      <ul>
      { 
        news.map((newsStory) => (
          <li key={ newsStory.url }>
            <a
              href={ newsStory.url}
            >
              { newsStory.headline }
            </a>
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default StockNews