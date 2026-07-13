import { useMemo } from 'react'

import { useUserSettingsStore } from '@/store/user'
import { Comment } from '@/types/comment'
import { Post } from '@/types/post'

import { Avatar } from './avatar'
import { Dropdown, DropdownOption } from './dropdown'

interface UserPickerProps {
  posts?: Post[]
  comments?: Comment[]
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
}

export const UserPicker = ({ posts = [], comments = [], placeholder, size }: UserPickerProps) => {
  const { selectedUser, setSelectedUser } = useUserSettingsStore()

  const options: DropdownOption[] = useMemo(() => {
    const values = new Set<string>()

    if (selectedUser?.value) {
      values.add(selectedUser.value)
    }

    for (const post of posts) {
      values.add(`${post.name};${post.avatar}`)
    }

    for (const comment of comments) {
      values.add(`${comment.name};${comment.avatar}`)
    }

    return [...values].map(value => {
      const [name, avatar] = value.split(';')
      return {
        value,
        label: <Avatar name={name} avatar={avatar} layout="horizontal" />,
      }
    })
  }, [posts, comments, selectedUser])

  return (
    <Dropdown
      buttonProps={{ size: size ?? 'medium', variant: 'outline' }}
      options={options}
      placeholder={placeholder}
      value={selectedUser?.value}
      onChange={value => {
        const [name, avatar] = value.split(';')
        setSelectedUser({ value, name, avatar })
      }}
    />
  )
}
