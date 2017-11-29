import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'

class App extends Component {
  state = {
    quote: {
      symbol: 'NFLX',
      companyName: 'Netflix Inc.',
      primaryExchange: 'Nasdaq Global Select',
      latestPrice: 188.15,
      latestSource: 'Close',
      week52High: 204.38,
      week52Low: 113.95
    }
  }

  render() {
    // const quote = this.state.quote
    const { quote } = this.state

    return (
      <div className="App">
        <h1>Wolf of React</h1>
        <StockInfo
          symbol={ quote.symbol }
          companyName={ quote.companyName }
          primaryExchange={ quote.primaryExchange }
          latestPrice={ quote.latestPrice }
          latestSource={ quote.latestSource }
          week52High={ quote.week52High }
          week52Low={ quote.week52Low }
        />
      </div>
    );
  }
}

export default App;
