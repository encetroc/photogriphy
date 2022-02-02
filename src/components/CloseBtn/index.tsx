import { Close, Heart } from 'icons'
import './CloseBtn.scss'

export function CloseBtn({ className }: { className: string }) {
  return (
    <div className={`closeBtn ${className}`}>
      <Close />
    </div>
  )
}
