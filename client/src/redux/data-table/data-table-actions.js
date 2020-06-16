import DataTableTypes from './dataTable-types';
import axios from 'axios';

const URL = 'http://localhost:8000?count=20';

export const fetchDataStart = () => ({
  type: DataTableTypes.FETCH_DATA_START,
});

export const fetchDataSuccess = (payload) => ({
  type: DataTableTypes.FETCH_DATA_SUCCESS,
  payload,
});

export const fetchDataFailure = () => ({
  type: DataTableTypes.FETCH_DATA_FAILURE,
});

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    let timeout = setTimeout(async function fetchData() {
      try {
        const result = await axios.get(`${URL}`);
        dispatch(fetchDataSuccess(result.data));
        console.log('fetchData -> result', result.data);
      } catch (error) {
        dispatch(fetchDataFailure(error.message));
        console.log('fetchData -> error', error);
      }
      timeout = setTimeout(fetchData, 1000);
    }, 0);
  };
};
