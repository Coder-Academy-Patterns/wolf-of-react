import React, { Component } from 'react';
import './App.css';
import StockQuote from './components/StockQuote'
import SymbolHistory from './components/SymbolHistory'
import StockNews from './components/StockNews'
import StockHistoricalTable from './components/StockHistoricalTable'
import { loadQuoteForStock, loadLogoURLForStock, loadNewsForStock, load6MonthHistoryForStock } from './api/iex'

class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'AAPL',
    symbolHistory: [],
    symbolsToInfo: {}
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadInfoForEnteredSymbol()
  }

  addInfoForSymbol = (symbol, newInfo) => {
    this.setState((prevState) => {
      return {
        symbolsToInfo: {
          // Keep previous loaded info
          ...prevState.symbolsToInfo,
          [symbol]: {
            // Merge in current info of symbol, such as logo image
            ...prevState.symbolsToInfo[symbol],
            // Add new info
            ...newInfo
          }
        }
      }
    })
  }

  loadInfoForSymbol = (symbol) => {
    this.setState((prevState) => {
      return {
        symbolHistory: [
          // Add to front of symbol history
          symbol,
          ...prevState.symbolHistory
        ]
      }
    })

    loadQuoteForStock(symbol)
      .then((quote) => { // Success
        this.addInfoForSymbol(symbol, {
          quote,
          error: null
        })
      })
      .catch((error) => {
        // If 404 not found
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${symbol}' does not exist`)
        }
        this.addInfoForSymbol(symbol, {
          error
        })
      })
    
    loadLogoURLForStock(symbol)
      .then((url) => {
        this.addInfoForSymbol(symbol, {
          logoImageURL: url
        })
      })
      .catch((error) => {
        // Error will be same as the quote above
      })
    
    loadNewsForStock(symbol)
      .then((news) => { // Success
        this.addInfoForSymbol(symbol, {
          news
        })
      })
      .catch((error) => {
        // If 404 not found
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${symbol}' does not exist`)
        }
        this.addInfoForSymbol(symbol, {
          error
        })
      })
    
    load6MonthHistoryForStock(symbol)
      .then((dailyData) => {
        this.addInfoForSymbol(symbol, {
          dailyData
        })
      })
      .catch((error) => {
        // If 404 not found
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${symbol}' does not exist`)
        }
        this.addInfoForSymbol(symbol, {
          error
        })
      })
  }

  loadInfoForEnteredSymbol = () => {
    this.loadInfoForSymbol(this.state.enteredSymbol)
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
    const { error, enteredSymbol, symbolHistory, symbolsToInfo } = this.state

    let quote = null, logoImageURL = null, news = null, dailyData = null
    const currentSymbol = symbolHistory[0]
    if (currentSymbol && symbolsToInfo[currentSymbol]) {
      quote = symbolsToInfo[currentSymbol].quote
      logoImageURL = symbolsToInfo[currentSymbol].logoImageURL
      news = symbolsToInfo[currentSymbol].news
      dailyData = symbolsToInfo[currentSymbol].dailyData
    }

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
          onClick={ this.loadInfoForEnteredSymbol }
        >
          Load Quote
        </button>
        
        { !!error && // Conditional that must pass for this to show
          <p>{ error.message }</p>
        }
        {
          !!quote ? (
            <StockQuote
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

        { dailyData &&
          <StockHistoricalTable
            title='Past 6 Months'
            dailyData={ dailyData }
          />
        }

        <SymbolHistory
          symbolHistory={ symbolHistory }
          onChooseSymbol={
            (symbol) => {
              this.setState({ enteredSymbol: symbol })
              this.loadInfoForSymbol(symbol)
            }
          }
        />

        { news &&
            <StockNews
              news={ news }
            />
        }
      </div>
    );
  }
}

export default App;
