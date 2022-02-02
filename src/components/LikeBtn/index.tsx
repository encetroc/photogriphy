import { Heart } from 'icons'
import './LikeBtn.scss'

export function LikeBtn({ className }: { className: string }) {
  return (
    <div className={`likeBtn ${className}`}>
      <Heart width={16} heigth={16} />
      Like
    </div>
  )
}
