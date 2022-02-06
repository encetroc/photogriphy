import { CardPhoto } from 'components'
import { usePhoto } from 'context'

export function LikedPhotos() {
  const { state } = usePhoto()
  return (
    <>
      {Object.values(state)
        .filter((photo) => photo.like)
        .map((photo) => (
          <CardPhoto
            key={photo.id}
            id={photo.id}
            small={photo.small}
            like={photo.like}
          />
        ))}
    </>
  )
}
