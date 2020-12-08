import classNames from 'clsx'
import * as React from 'react'

import classes from './styles.css'

type Props = React.SelectHTMLAttributes<HTMLSelectElement>

const Select = React.forwardRef<HTMLSelectElement, Props>(function InnerSelect(
  { className, ...props }: Props,
  ref,
) {
  return (
    <select
      {...props}
      ref={ref}
      className={classNames(classes.main, className)}
    />
  )
})

export default Select
