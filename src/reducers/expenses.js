export default (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case 'ADD_EXPENSE':
      newState = [...state, action.expense];
      break;
    case 'REMOVE_EXPENSE':
      newState = state.filter(({ id }) => id !== action.id);
      break;
    case 'EDIT_EXPENSE':
      newState = state.map(expense =>
        (expense.id === action.id) ?
          {
            ...expense,
            ...action.updates
          } :
          expense);
      break;
  }

  return newState;
}