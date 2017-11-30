import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock } from './api/iex'

class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'AAPL',
    quote: null
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    loadQuoteForStock('nflx')
      .then((quote) => {
        this.setState({ quote: quote })
      })
      .catch((error) => {
        // If 404 not found
        if (error.response.status === 404) {
          error = new Error('The stock symbol does not exist')
        }
        this.setState({ error: error })
        // console.log('Error loading quote', error.response.status)
        console.log('Error loading quote', error)
      })
  }

  onChangeEnteredSymbol = (event) => {
    const input = event.target // The <input>
    const rawValue = input.value // The text entered by the user
    const value = rawValue.trim().toUpperCase() // Trim whitespace, make uppercase
    // Change this.state.enteredSymbol
    this.setState({
      enteredSymbol: value
    })
  }

  render() {
    const { error, enteredSymbol, quote } = this.state

    return (
      <div className="App">
        <h1>Wolf of React</h1>

        <input
          value={ enteredSymbol }
          placeholder='Symbol e.g. NFLX'
          aria-label='Symbol'
          onChange={ this.onChangeEnteredSymbol }
        />
        
        { !!error && // Conditional that must pass for this to show
          <p>{ error.message }</p>
        }
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
