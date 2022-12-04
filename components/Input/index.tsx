import classNames from 'classnames'
import React from 'react'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  label?: string;
}

const Input: React.FC<IInputProps> = ({
  containerClassName, className, id, label, ...restProps
}) => {
  const uniqueId = React.useId();
  const innerId = id ?? uniqueId;

  return (
    <div className={classNames(containerClassName)}>
      {label && (
        <label data-testid="label" className="inline-block text-xs sm:text-sm w-full mb-1 font-medium" htmlFor={innerId}>
          {label}
        </label>
      )}
      <input
        {...restProps}
        data-testid="input"
        id={innerId}
        className={classNames(
          "block p-1 w-full text-sm sm:text-base rounded border border-solid border-gray-dark-1 bg-white focus:outline-none",
          className
        )}
      />
    </div>
  )
}

export default Input