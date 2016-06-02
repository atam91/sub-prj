import { 
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS
} from '../constants/Page';
import API_URL from '../constants/Api';

export function getPhotos(year) {
  return {
    type: GET_PHOTOS_REQUEST,
    payload: year
  };
}