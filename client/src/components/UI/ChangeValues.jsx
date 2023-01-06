import React from 'react'
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid'
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import { StopCircleIcon } from '@heroicons/react/24/solid'
import styles from './ChangeValues.module.scss'

const ChangeValues = ({ changes, change, change_percent }) => {
  if (change) {
    return (
      <span className={styles[`change--${changes}`]}>
        {
          changes === 'negative' ?
            `-${change}` :
            changes === 'positive' ?
              `+${change}` :
              change
        }
        $
      </span>
    )
  }

  if (change_percent) {
    return (
      <div className={styles[`percent--${changes}`]}>
        {
          changes === 'negative' ?
            <ArrowDownCircleIcon className="h-6 w-6 text-white" /> :
            changes === 'positive' ?
              <ArrowUpCircleIcon className="h-6 w-6 text-white" /> :
                <StopCircleIcon className="h-6 w-6 text-white" />
        }
        {change_percent}%
      </div>
    )
  }
}

export default ChangeValues