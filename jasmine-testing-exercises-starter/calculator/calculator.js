window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("calc-form");
  if (form) {
    setupInitialValues();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +document.getElementById("loan-amount").value,
    years: +document.getElementById("loan-years").value,
    rate: +document.getElementById("loan-rate").value,
  };
}

function setupInitialValues() {
  const initialValues = { amount: 10000, years: 10, rate: 4.5 };
  document.getElementById("loan-amount").value = initialValues.amount;
  document.getElementById("loan-years").value = initialValues.years;
  document.getElementById("loan-rate").value = initialValues.rate;
  update();
}

function update() {
  const currentUIValues = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(currentUIValues);
  updateMonthly(monthlyPayment);
}

function calculateMonthlyPayment({ amount, years, rate }) {
  const monthlyRate = (rate / 100) / 12;
  const numberOfPayments = years * 12;
  return (
    (monthlyRate * amount) /
    (1 - Math.pow((1 + monthlyRate), -numberOfPayments))
  ).toFixed(2);
}

function updateMonthly(monthly) {
  const monthlyUI = document.getElementById("monthly-payment");
  monthlyUI.innerText = `$${monthly}`;
}
