import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/router'

import { Button } from './button'

interface BackButtonProps {
  className?: string
}

export const BackButton = (props: BackButtonProps) => {
  const router = useRouter()

  return <Button size="medium" variant="secondary" icon={<ArrowLeft />} iconButton onClick={router.back} {...props} />
}
