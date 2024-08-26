// Get references to form elements and DOM nodes
const billAmtInput = document.getElementById('billAmt');
const tipAmtInput = document.getElementById('tipAmt');
const paymentForm = document.getElementById('paymentForm');
const paymentTbody = document.querySelector('#paymentTable tbody');
const summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

// Initialize global variables
let allPayments = {};
let paymentId = 0;

// Add event listener to form submission
paymentForm.addEventListener('submit', handlePaymentSubmit);

// Handles form submission to add a new payment
function handlePaymentSubmit(evt) {
  if (evt) evt.preventDefault(); // Prevent default form behavior

  const curPayment = createCurPayment();

  if (curPayment) {
    paymentId++;
    allPayments[`payment${paymentId}`] = curPayment;

    appendPaymentTable(curPayment);
    updateServerTable();
    updateSummary();

    // Clear input values after submission
    billAmtInput.value = '';
    tipAmtInput.value = '';
  }
}

// Creates a payment object if inputs are valid
function createCurPayment() {
  const billAmt = billAmtInput.value;
  const tipAmt = tipAmtInput.value;

  // Return undefined if inputs are empty or invalid
  if (billAmt === '' || tipAmt === '') return;

  const billAmount = Number(billAmt);
  const tipAmount = Number(tipAmt);

  if (billAmount > 0 && tipAmount >= 0) {
    return {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmount, tipAmount),
    };
  }
}

// Appends a payment row to the payment table
function appendPaymentTable(curPayment) {
  const newTr = document.createElement('tr');
  newTr.id = `payment${paymentId}`;

  appendTd(newTr, `$${curPayment.billAmt}`);
  appendTd(newTr, `$${curPayment.tipAmt}`);
  appendTd(newTr, `%${curPayment.tipPercent}`);

  appendDeleteBtn(newTr, 'payment');

  paymentTbody.append(newTr);
}

// Updates the summary table with totals and average tip percent
function updateSummary() {
  const tipPercentAvg = sumPaymentTotal('tipPercent') / Object.keys(allPayments).length;

  summaryTds[0].innerHTML = `$${sumPaymentTotal('billAmt')}`;
  summaryTds[1].innerHTML = `$${sumPaymentTotal('tipAmt')}`;
  summaryTds[2].innerHTML = `${Math.round(tipPercentAvg)}%`;
}
