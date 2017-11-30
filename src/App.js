import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock, loadLogoURLForStock } from './api/iex'

class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'AAPL',
    quote: null,
    logoImageURL: null
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadQuote()
  }

  loadQuote = () => {
    const { enteredSymbol } = this.state

    loadQuoteForStock(enteredSymbol)
      .then((quote) => { // Success
        this.setState({
          quote: quote,
          error: null // Clear error
        })
      })
      .catch((error) => {
        // If 404 not found
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${enteredSymbol}' does not exist`)
        }
        this.setState({ error: error })
      })
    
    loadLogoURLForStock(enteredSymbol)
      .then((url) => {
        this.setState({
          logoImageURL: url
        })
      })
      .catch((error) => {
        // Error will be same as the quote above
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
    const { error, enteredSymbol, quote, logoImageURL } = this.state

    return (
      <div className="App">
        <h1>Wolf of React</h1>

        <input
          value={ enteredSymbol }
          placeholder='Symbol e.g. NFLX'
          aria-label='Symbol'
          onChange={ this.onChangeEnteredSymbol }
        />
        <button
          className='ml-1'
          onClick={ this.loadQuote }
        >
          Load Quote
        </button>
        
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
              logoImageURL={ logoImageURL }
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
