import classNames from 'classnames'
import React from 'react'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IButtonProps> = ({ children, className, type = "button", ...restProps }) => {
  return (
    <button
      data-testid="button"
      type={type} {...restProps}
      className={classNames(
        "bg-gray-dark-2 hover:opacity-80 p-2 sm:p-3 rounded text-xs sm:text-[15px] text-white leading-tight font-bold disabled:opacity-20",
        className
      )}>
      {children}
    </button>
  )
}

export default Button