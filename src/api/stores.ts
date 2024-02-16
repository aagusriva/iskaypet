import axios from 'axios';
import {API_IKP_URL} from './routes';
import {Store} from '../interfaces/store';

/**
 * Return a list of articles with pagination and searching.
 * Return the following props of items: id, title, artist_title, description, image_id
 */
export const getStores = async (): Promise<Store[] | null> => {
  try {
    const resp = await axios({
      url: `${API_IKP_URL}/stores`,
      method: 'GET',
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
