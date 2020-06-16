import DataTableTypes from './dataTable-types';

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  errorMessage: '',
  editableChartDataId: null,
};

const dataTableReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case DataTableTypes.FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
      };
    case DataTableTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case DataTableTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case DataTableTypes.GET_EDITABLE_CHART_ID:
      return {
        ...state,
        editableChartDataId: payload,
      };
    case DataTableTypes.CHANGE_CHART_DATA:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === payload.id) {
            return {
              ...item,
              stocks: { ...item.stocks, [payload.type]: payload.value },
            };
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

export default dataTableReducer;
