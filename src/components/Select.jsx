import React from "react";
import { useId } from "react"

const Select = ({children,
  options,
  className="",
  label,
  ...props

},ref) => {
  const id=useId()
  return (
    <div className="w-full">
      {label && <label htmlFor={id} ></label>}
      <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white outline-none duration-200 focus:bg-slate-400 border border-gray-300 w-full ${className}`}>
        {options?.map((option)=>(
          <option key={option.name} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
export default React.forwardRef(Select);