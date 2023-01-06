import { render, screen } from '@testing-library/react'

import TickerList from './TickerList'

const tickers = [
  {
    "ticker": "AAPL",
    "price": 279.29,
    "change": 64.52,
    "change_percent": 0.84,
  }
]

const title = 'Title'

describe('TickerList component', () => {
  it('TickerList renders', () => {
    render(<TickerList tickers={tickers} title={title} />)

    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})