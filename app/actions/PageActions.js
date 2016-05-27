import { 
  GET_PHOTOS_REQUEST, 
  GET_PHOTOS_SUCCESS 
} from '../constants/Page';
import API_URL from '../constants/Api';

export function getPhotos(year) {
  return (dispatch) => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: year
    });

    fetch(API_URL + '/counter')
      .then(res => res.text())
      .then(text => {
        dispatch({
          type: GET_PHOTOS_SUCCESS,
          payload: Array(parseInt(text))
        });
      });
  }
}