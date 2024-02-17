import axios from 'axios';
import {API_IKP_URL} from './routes';
import {Store} from '../interfaces/store';

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

type PostCheckInData = {
  storeId: string;
  taskId: string;
};

export const postCheckin = async (data: PostCheckInData): Promise<boolean> => {
  try {
    const resp = await axios({
      url: `${API_IKP_URL}/checkin`,
      method: 'POST',
      data,
    });
    return resp.status >= 200 && resp.status < 400;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const resetStore = async (): Promise<boolean> => {
  try {
    const resp = await axios({
      url: `${API_IKP_URL}/stores/reset`,
      method: 'POST',
    });
    return resp.status >= 200 && resp.status < 400;
  } catch (error) {
    console.log(error);
  }
  return false;
};
