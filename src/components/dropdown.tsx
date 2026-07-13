import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

import { Button, ButtonProps } from './button'

import styles from './dropdown.module.scss'

export interface DropdownOption {
  value: string
  label: string | React.ReactNode
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string | null
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  buttonProps?: ButtonProps
  icon?: React.ReactNode
}

export const Dropdown = ({
  options,
  value = null,
  onChange,
  placeholder,
  disabled = false,
  className,
  buttonProps,
  icon,
}: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
        setHighlighted(-1)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const selected = options.find(option => option.value === value) || null

  const close = () => {
    setOpen(false)
    setHighlighted(-1)
  }

  const toggle = () => {
    if (disabled) return
    setOpen(state => !state)
    setHighlighted(-1)
  }

  const handleSelect = (option: DropdownOption) => {
    onChange?.(option.value)
    close()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setHighlighted(index => Math.min(options.length - 1, index + 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlighted(index => Math.max(0, index - 1))
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open && highlighted >= 0) {
        handleSelect(options[highlighted])
      } else {
        setOpen(state => !state)
      }
    } else if (event.key === 'Escape') {
      close()
    }
  }

  return (
    <div ref={ref} className={`${styles.dropdown} ${className || ''}`}>
      <Button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className={styles.toggle}
        icon={icon}
        iconButton={icon ? true : false}
        {...buttonProps}
      >
        {!icon ? (
          <>
            {selected ? selected.label : <span className={styles.placeholder}>{placeholder}</span>}
            <span className={styles.caret}>
              <ChevronDown />
            </span>
          </>
        ) : null}
      </Button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={highlighted >= 0 ? `opt-${highlighted}` : undefined}
          className={styles.menu}
        >
          {options.map((option, index) => {
            const isHighlighted = index === highlighted
            const isSelected = value === option.value
            return (
              <li
                id={`opt-${index}`}
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlighted(index)}
                onMouseDown={event => event.preventDefault()}
                onClick={() => handleSelect(option)}
                className={`${styles.option} ${isHighlighted ? styles.highlighted : ''}`}
              >
                {option.label}
                {isSelected && (
                  <span className={styles.check}>
                    <Check />
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
