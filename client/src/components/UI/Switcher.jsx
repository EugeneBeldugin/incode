import React, { useState, useEffect } from 'react'

const Switcher = ({ toggleActivate, isActive }) => {
  const [enabled, setEnabled] = useState(isActive);

  useEffect(() => {
    setEnabled(isActive)
  }, [isActive])
  

  const handleClick = () => {
    toggleActivate()
    setEnabled(!enabled)
  }

  return (
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={handleClick}
            className="w-9 h-5 bg-gray-200 hover:bg-gray-300 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-400 peer-checked:hover:bg-slate-500"
          ></div>
        </label>
  );
}

export default Switcher