import { createContext, useContext, useReducer } from 'react'
import { data } from 'data'

const PhotoContext = createContext({})

type Photo = {
  id: string
  small: string
  regular: string
  name: string
  photo: string
  download: string
  description: string
  like: boolean
}

type PhotoState = Record<string, Photo>

const initialPhotoState: PhotoState = {}

function initializePhoto(initialPhotoState: PhotoState): PhotoState {
  const likedPhotoIds = JSON.parse(
    localStorage.getItem('likedPhotoIds') || '[]'
  )
  if (likedPhotoIds.length === 0) {
    localStorage.setItem('likedPhotoIds', JSON.stringify([]))
  }
  console.log(likedPhotoIds)
  return data.reduce((map: any, photo) => {
    map[photo.id] = {
      id: photo.id,
      small: photo.urls.small,
      regular: photo.urls.regular,
      name: photo.user.name,
      photo: photo.user.profile_image.small,
      download: photo.links.download,
      description: photo.description,
      like: likedPhotoIds.includes(photo.id) ? true : false,
    }
    return map
  }, {})
}

enum PhotoActionKind {
  Like = 'LIKE',
}

type PhotoAction = {
  type: PhotoActionKind
  payload: string
}

function likePhotoAction(id: string): PhotoAction {
  return { type: PhotoActionKind.Like, payload: id }
}

function photoReducer(state: PhotoState, action: PhotoAction): PhotoState {
  const { type, payload } = action
  console.log(state[payload])
  switch (type) {
    case PhotoActionKind.Like:
      let likedPhotoIds: string[] = JSON.parse(
        localStorage.getItem('likedPhotoIds') || '[]'
      )
      if(likedPhotoIds.includes(payload)) {
        likedPhotoIds = likedPhotoIds.filter((id: string) => id !== payload)
      } else {
        likedPhotoIds.push(payload)
      }
      localStorage.setItem('likedPhotoIds', JSON.stringify(likedPhotoIds))
      return {
        ...state,
        [payload]: {
          ...state[payload],
          like: !state[payload].like,
        },
      }
    default:
      return state
  }
}

type PhotoContextValue = {
  state: PhotoState
  dispatch: React.Dispatch<PhotoAction>
  likePhotoAction: (id: string) => PhotoAction
}

export function usePhoto() {
  return useContext(PhotoContext) as PhotoContextValue
}

export function PhotoContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(
    photoReducer,
    initialPhotoState,
    initializePhoto
  )
  return (
    <PhotoContext.Provider value={{ state, dispatch, likePhotoAction }}>
      {children}
    </PhotoContext.Provider>
  )
}
