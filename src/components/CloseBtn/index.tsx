import { useNavigate } from 'react-router-dom'
import { Close } from 'icons'
import './CloseBtn.scss'

export function CloseBtn({ className }: { className: string }) {
  const navigate = useNavigate()
  return (
    <div className={`closeBtn ${className}`} onClick={() => navigate('/')}>
      <Close />
    </div>
  )
}
