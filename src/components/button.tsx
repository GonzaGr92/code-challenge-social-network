import styles from './button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  icon?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  iconButton?: boolean
}

export const Button = ({ className, variant, icon, size, children, iconButton, ...props }: ButtonProps) => {
  return (
    <button
      className={`
        ${styles.button} 
        ${variant ? styles[variant] : styles.primary} 
        ${size ? styles[size] : styles.medium} 
        ${iconButton ? styles.iconButton : ''} 
        ${className || ''} 
      `}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}
