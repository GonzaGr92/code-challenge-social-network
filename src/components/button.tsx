import styles from './button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
}

export const Button = ({ className, variant, icon, size, children, ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${variant ? styles[variant] : styles.primary} ${size ? styles[size] : styles.medium} ${className || ''} `}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}
