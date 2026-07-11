import styles from './button.module.scss'

export const Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`${styles.button} ${className || ''}`} {...props}>
      {children}
    </button>
  )
}
