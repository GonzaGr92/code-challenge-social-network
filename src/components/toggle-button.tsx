import { CircleMinus, CirclePlus } from 'lucide-react'

import styles from './toggle-button.module.scss'

interface ToggleButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  status: 'expanded' | 'collapsed'
}

export const ToggleButton = ({ status, className, ...props }: ToggleButtonProps) => {
  return (
    <button className={`${styles.button} ${className ? className : ''}`} {...props}>
      {status === 'expanded' ? <CircleMinus /> : <CirclePlus />}
    </button>
  )
}
