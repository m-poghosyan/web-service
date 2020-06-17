import DataTableTypes from './data-table-types';
import axios from 'axios';

const URL = 'http://localhost:8000?count=1';

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

export const editChartData = (item) => ({
  type: DataTableTypes.CHANGE_CHART_DATA,
  payload: item,
});

export const editChartById = (payload) => ({
  type: DataTableTypes.GET_EDITABLE_CHART_ID,
  payload,
});

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataStart());

    try {
      const result = await axios.get(`${URL}`);
      dispatch(fetchDataSuccess(result.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
