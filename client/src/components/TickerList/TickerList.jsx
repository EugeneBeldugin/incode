import React from 'react'
import Ticker from '../Ticker/Ticker'
import styles from './TickerList.module.scss'

const TickerList = ({ tickers, title, isSubscriptions }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      {
        tickers.length ?
          <div className={styles.list}>
            {tickers?.map(ticker => {
              return <Ticker key={ticker.ticker} tickerData={ticker} isSubscriptions={isSubscriptions} />
            })}
          </div> :
          <div className={styles['list--empty']}>No subscriptions yet</div>
      }

    </div>
  )
}

export default TickerList