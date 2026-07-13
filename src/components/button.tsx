import { useRouter } from 'next/router'

import styles from './button.module.scss'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  icon?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  iconButton?: boolean
  href?: string
}

export const Button = ({ className, variant, icon, size, children, iconButton, href, ...props }: ButtonProps) => {
  const router = useRouter()

  return (
    <button
      {...props}
      className={`
        ${styles.button} 
        ${variant ? styles[variant] : styles.primary} 
        ${size ? styles[size] : styles.medium} 
        ${iconButton ? styles.iconButton : ''} 
        ${className || ''} 
      `}
      {...(href
        ? {
            onClick: event => {
              props.onClick?.(event)
              router.push(href)
            },
          }
        : {})}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}
