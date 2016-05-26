import { 
  GET_PHOTOS_REQUEST, 
  GET_PHOTOS_SUCCESS 
} from '../constants/Page'

export function getPhotos(year) {
  return (dispatch) => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: year
    });

    fetch('http://localhost:3000/counter')
      .then(res => res.text())
      .then(text => {
        dispatch({
          type: GET_PHOTOS_SUCCESS,
          payload: Array(parseInt(text))
        });
      });
  }
}