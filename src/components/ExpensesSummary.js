import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedTotal = numeral(expensesTotal / 100).format('$0,0.00');
  
  return (
    <div>
      <h1>Viewing {expenseCount} {expenseWord} totalling {formattedTotal}</h1>
    </div>
  );
}

const mapStateToProps = ({ expenses, filters }) => {
  const data = selectExpenses(expenses, filters);
  return {
    expenseCount: data.length,
    expensesTotal: selectExpensesTotal(data)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);