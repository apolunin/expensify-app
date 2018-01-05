import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate }) =>
  expenses.filter(expense => {
    const createdAt = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAt, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAt, 'day') : true;

    const textMatch = typeof text !== 'string' ||
      expense.description.toLocaleLowerCase().includes(text.toLocaleLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    let result = 0;

    switch (sortBy) {
      case 'date':
        result = a.createdAt > b.createdAt ? -1 : 1;
        break;
      case 'amount':
        result = a.amount > b.amount ? -1 : 1;
        break;
    }

    return result;
  });