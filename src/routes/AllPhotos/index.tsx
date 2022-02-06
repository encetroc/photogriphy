import { CardPhoto } from 'components'
import { usePhoto } from 'context'

export function AllPhotos() {
  const { state } = usePhoto()
  return (
    <>
      {Object.values(state).map((photo) => (
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
