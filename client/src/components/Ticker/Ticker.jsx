import React, { useState, useEffect, useReducer } from 'react'

import styles from './Ticker.module.scss'
import { COLORS } from '../../assets/constants'

import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { MinusCircleIcon } from '@heroicons/react/24/solid'

import Switcher from '../UI/Switcher'
import ChangeValues from '../UI/ChangeValues'

import { useDispatch } from 'react-redux'
import { subscribeTicker } from '../../redux/features/tickersSlice'
import { unSubscribeTicker } from '../../redux/features/tickersSlice'

const initialState = {
  disabledTicker: {}
};

function reducer(state, action) {
  switch (action.type) {
    case 'disable':
      return {disabledTicker: action.payload};
    default:
      throw new Error();
  }
}

const Ticker = ({ tickerData, isSubscriptions }) => {
  const [state, customDispatch] = useReducer(reducer, initialState);

  const [prevAndNewState, setPrevAndNewState] = useState([])
  const [changes, setChanges] = useState('none')
  const [isActive, setIsActive] = useState(true)

  const dispatch = useDispatch();

  const { ticker, price, change, change_percent } = tickerData;

  useEffect(() => {
    setPrevAndNewState(prev => [...prev, tickerData].slice(prev.length - 1, prev.length + 1))
  }, [tickerData])

  useEffect(() => {
    if (isActive) {
      const prevTicker = prevAndNewState[0]?.price
      const newTicker = prevAndNewState[1]?.price

      if (prevTicker > newTicker) {
        setChanges('negative')
      } else if (prevTicker < newTicker) {
        setChanges('positive')
      } else {
        setChanges('none')
      }
    }

  }, [prevAndNewState, isActive])

  const toggleActivate = () => {
    setIsActive(!isActive)
    setChanges('none')
    customDispatch({
      type: 'disable',
      payload: tickerData
    })
  }

  const handleSubscribe = () => {
    dispatch(subscribeTicker(tickerData))
  }

  const handleUnSubscribe = () => {
    dispatch(unSubscribeTicker(tickerData))
  }

  const setColor = () => {
    const col = COLORS.filter(color => color.id === ticker)

    return col[0].style
  }

  return (
    <div className={styles.ticker}>
      <h3 style={setColor()}>{ticker}</h3>
      {
        isActive ?
          <div className={styles.price_block}>
            <span>{price}$</span>
            <ChangeValues changes={changes} change={change} />
            <ChangeValues changes={changes} change_percent={change_percent} />
          </div> :
          <div className={styles.price_block}>
            <span>{state.disabledTicker.price}$</span>
            <ChangeValues changes={changes} change={state.disabledTicker.change} />
            <ChangeValues changes={changes} change_percent={state.disabledTicker.change_percent} />
          </div>
      }
      <div className={styles.buttons_block}>
        {
          isSubscriptions ?
            <button onClick={handleUnSubscribe}>
              <MinusCircleIcon className="w-6 h-6 text-slate-400 hover:text-slate-500" />
            </button> :
            <button onClick={handleSubscribe}>
              <PlusCircleIcon className="w-6 h-6 text-slate-400 hover:text-slate-500" />
            </button>
        }
        <Switcher toggleActivate={toggleActivate} isActive={isActive} />
      </div>
    </div>
  )
}

export default Ticker


