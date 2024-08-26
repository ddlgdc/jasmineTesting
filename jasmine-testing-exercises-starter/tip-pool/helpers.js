// Sums the total of a specific type ('tipAmt', 'billAmt', 'tipPercent') from allPayments objects
function sumPaymentTotal(type) {
  // Calculate total by summing up the values of the specified type from allPayments
  return Object.values(allPayments).reduce((total, payment) => 
    total + Number(payment[type]), 0);
}

// Calculates the tip percentage based on the bill and tip amounts
function calculateTipPercent(billAmt, tipAmt) {
  // Calculate tip percentage and round to the nearest whole number
  return Math.round((tipAmt / billAmt) * 100);
}

// Appends a new td element with the specified value to a table row (tr)
function appendTd(tr, value) {
  // Create a new td element, set its text content, and append it to the row
  const newTd = document.createElement('td');
  newTd.innerText = value;
  tr.append(newTd);
}

// Appends a delete button to a table row (tr) and attaches a click handler to remove the row
function appendDeleteBtn(tr) {
  // Create a new td element for the delete button, set its class and text, and append it to the row
  const newTd = document.createElement('td');
  newTd.className = 'deleteBtn';
  newTd.innerText = 'X';

  // Add click event listener to handle row removal
  newTd.addEventListener('click', removeEle);

  tr.append(newTd);
}

// Removes the clicked table row element from both the DOM and the allServers object
function removeEle(evt) {
  // Find the closest row element and remove it from allServers and the DOM
  const ele = evt.target.closest('tr');

  if (ele && allServers[ele.id]) {
    delete allServers[ele.id];
    ele.remove(); // Modern method to remove an element
    updateServerTable();
  }
}
