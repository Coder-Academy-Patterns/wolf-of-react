import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock } from './api/iex'

class App extends Component {
  state = {
    quote: null
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    loadQuoteForStock('nflx')
      .then((quote) => {
        this.setState({ quote: quote })
      })
  }

  render() {
    const { quote } = this.state

    return (
      <div className="App">
        <h1>Wolf of React</h1>
        {
          !!quote ? (
            <StockInfo
              symbol={ quote.symbol }
              companyName={ quote.companyName }
              primaryExchange={ quote.primaryExchange }
              latestPrice={ quote.latestPrice }
              latestSource={ quote.latestSource }
              week52High={ quote.week52High }
              week52Low={ quote.week52Low }
            />
          ) : (
            <p>Loading…</p>
          )
        }
      </div>
    );
  }
}

export default App;
