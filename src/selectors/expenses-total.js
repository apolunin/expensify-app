export default (expenses) =>
  expenses.map(e => e.amount)
    .reduce((acc, val) => acc + val, 0);