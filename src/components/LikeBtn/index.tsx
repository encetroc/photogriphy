import { Heart } from 'icons'
import './LikeBtn.scss'

export function LikeBtn({ className }: { className: string }) {
  return (
    <div className={`likeBtn ${className}`}>
      <Heart />
      Like
    </div>
  )
}
