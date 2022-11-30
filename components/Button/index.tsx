import React from 'react'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IButtonProps> = ({ children, type = "button", ...restProps }) => {
  return (
    <button type={type} {...restProps} className="bg-gray-dark-2 p-2 sm:p-3 rounded text-xs sm:text-[15px] text-white leading-tight font-bold">
      {children}
    </button>
  )
}

export default Button