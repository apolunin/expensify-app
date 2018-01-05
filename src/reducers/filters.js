import moment from 'moment';

const defaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default (state = defaultState, action) => {
  let newState = state;

  switch (action.type) {
    case 'SET_TEXT_FILTER':
      newState = {
        ...state,
        text: action.text
      };
      break;
    case 'SORT_BY_AMOUNT':
    case 'SORT_BY_DATE':
      newState = {
        ...state,
        sortBy: action.sortBy
      };
      break;
    case 'SET_START_DATE':
      newState = {
        ...state,
        startDate: action.startDate
      };
      break;
    case 'SET_END_DATE':
      newState = {
        ...state,
        endDate: action.endDate
      }
      break;
  }

  return newState;
}