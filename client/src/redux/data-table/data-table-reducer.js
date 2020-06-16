import DataTableTypes from './data-table-types';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  errorMessage: '',
  editableChartData: null,
};

const dataTableReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case DataTableTypes.FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
      };
    case DataTableTypes.FETCH_DATA_SUCCESS:
      function convertData(item, type) {
        return +item.stocks[type].toString().split('').slice(0, 4).join('');
      }

      const data = [
        ...state.data,
        ...payload.map((item) => {
          return {
            ...item,
            stocks: {
              ...item.stocks,
              CAC40: convertData(item, 'CAC40'),
              NASDAQ: convertData(item, 'NASDAQ'),
            },
          };
        }),
      ];

      if (data.length > 20) {
        data.shift();
      }

      return {
        ...state,
        isLoading: false,
        data,
      };
    case DataTableTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case DataTableTypes.CHANGE_CHART_DATA:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.index === payload.id) {
            return {
              ...item,
              stocks: { ...item.stocks, [payload.type]: payload.value },
            };
          }
          return item;
        }),
      };
    case DataTableTypes.GET_EDITABLE_CHART_ID:
      return {
        ...state,
        editableChartData: payload,
      };
    default:
      return state;
  }
};

export default dataTableReducer;
