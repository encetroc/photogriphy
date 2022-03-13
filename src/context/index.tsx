import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  PhotoState,
  PhotoActionKind,
  PhotoAction,
  PhotoContextValue,
  PhotoDetails,
} from 'types'

const PhotoContext = createContext({})

const initialPhotoState: PhotoState = {}

function likePhotoAction(id: string): {
  type: PhotoActionKind
  payload: string
} {
  return { type: PhotoActionKind.Like, payload: id }
}

function photoDetailsAction(
  id: string,
  details: PhotoDetails
): { type: PhotoActionKind; payload: { id: string; details: PhotoDetails } } {
  return { type: PhotoActionKind.AddDetails, payload: { id, details } }
}

function fetchPhotos(photos: PhotoState): {
  type: PhotoActionKind
  payload: PhotoState
} {
  return {
    type: PhotoActionKind.FetchPhotos,
    payload: photos,
  }
}

function photoReducer(state: PhotoState, action: PhotoAction): PhotoState {
  const { type, payload } = action
  switch (type) {
    case PhotoActionKind.Like:
      const newState: PhotoState = {
        ...state,
        [payload]: {
          ...state[payload],
          like: !state[payload].like,
        },
      }
      const likedPhotoIds: string[] = Object.values(newState)
        .filter((photo) => photo.like)
        .map((photo) => photo.id)
      localStorage.setItem('likedPhotoIds', JSON.stringify(likedPhotoIds))
      return newState
    case PhotoActionKind.AddDetails:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          details: payload.details,
        },
      }
    case PhotoActionKind.FetchPhotos:
      return payload
    default:
      return state
  }
}

export function usePhoto() {
  return useContext(PhotoContext) as PhotoContextValue
}

export function PhotoContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(photoReducer, initialPhotoState)
  useEffect(() => {
    const photosPage1 = fetch(
      `https://api.unsplash.com/photos/?page=3&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
    ).then((data) => data.json())
    const photosPage2 = fetch(
      `https://api.unsplash.com/photos/?page=4&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
    ).then((data) => data.json())

    Promise.all([photosPage1, photosPage2]).then((pages) => {
      const data = [...pages[0], ...pages[1]]
      const likedPhotoIds = JSON.parse(
        localStorage.getItem('likedPhotoIds') || '[]'
      )
      if (likedPhotoIds.length === 0) {
        localStorage.setItem('likedPhotoIds', JSON.stringify([]))
      }
      const photos: PhotoState = data.reduce((map: any, photo: any) => {
        map[photo.id] = {
          id: photo.id,
          small: photo.urls.small,
          regular: photo.urls.regular,
          name: photo.user.name,
          photo: photo.user.profile_image.small,
          download: photo.links.download,
          description: photo.description,
          like: likedPhotoIds.includes(photo.id) ? true : false,
          details: null,
        }
        return map
      }, {})
      dispatch(fetchPhotos(photos))
    })
  }, [])
  return (
    <PhotoContext.Provider
      value={{ state, dispatch, likePhotoAction, photoDetailsAction }}
    >
      {children}
    </PhotoContext.Provider>
  )
}
