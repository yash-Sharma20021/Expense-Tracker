// Select HTML elements
const transactionForm = document.getElementById('transactionForm');
const transactionList = document.getElementById('transactionList');
const balanceElement = document.getElementById('balance');
const totalIncomeElement = document.getElementById('totalIncome');
const totalExpenseElement = document.getElementById('totalExpense');
const chartCanvas = document.getElementById('expenseChart');

// Initialize transactions array
let transactions = [];

// Function to update balance and totals
function updateBalance() {
  let totalIncome = 0;
  let totalExpense = 0;
  let balance = 0;

  transactions.forEach((transaction) => {
    if (transaction.category === 'income') {
      totalIncome += parseFloat(transaction.amount);
    } else {
      totalExpense += parseFloat(transaction.amount);
    }
  });

  balance = totalIncome - totalExpense;

  balanceElement.textContent = balance.toFixed(2);
  totalIncomeElement.textContent = totalIncome.toFixed(2);
  totalExpenseElement.textContent = totalExpense.toFixed(2);
}

// Function to render transaction list
function renderTransactionList() {
  transactionList.innerHTML = '';

  transactions.forEach((transaction) => {
    const transactionListItem = document.createElement('li');
    transactionListItem.textContent = `${transaction.description} - ${transaction.amount} (${transaction.category})`;
    transactionList.appendChild(transactionListItem);
  });
}

// Function to update chart
function updateChart() {
  const ctx = chartCanvas.getContext('2d');
  ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

  const incomeData = transactions.filter((transaction) => transaction.category === 'income').map((transaction) => parseFloat(transaction.amount));
  const expenseData = transactions.filter((transaction) => transaction.category === 'expense').map((transaction) => parseFloat(transaction.amount));

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        label: 'Transaction Distribution',
        data: [incomeData.reduce((a, b) => a + b, 0), expenseData.reduce((a, b) => a + b, 0)],
        backgroundColor: ['#4CAF50', '#FF9800'],
      }],
    },
    options: {
      title: {
        display: true,
        text: 'Transaction Distribution',
      },
    },
  });
}

function renderTransactionList() {
    transactionList.innerHTML = '';
  
    transactions.forEach((transaction) => {
      const transactionListItem = document.createElement('li');
      transactionListItem.textContent = `${transaction.description} - ${transaction.amount} (${transaction.category})`;
  
      if (transaction.category === 'expense') {
        transactionListItem.classList.add('expense'); // Add the expense class
      }
  
      transactionList.appendChild(transactionListItem);
    });
  }

// Add event listener to transaction form
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;

  const newTransaction = {
    description,
    amount,
    category,
  };

  transactions.push(newTransaction);

  updateBalance();
  renderTransactionList();
  updateChart();
});