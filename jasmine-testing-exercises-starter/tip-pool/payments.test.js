describe("Payments Test Suite", function() {
    beforeEach(function () {
      // Set initial values for bill and tip amounts before each test
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
    });

    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
        submitPaymentInfo();

      // Check if the new payment was added correctly
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('20');
        expect(allPayments['payment1'].tipPercent).toEqual(20);
    });

    it('should not add a new payment with empty input on submitPaymentInfo()', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        submitPaymentInfo();

      // Check that no payment is added if inputs are empty
        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should update #paymentTable on appendPaymentTable()', function () {
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;

        appendPaymentTable(curPayment);

        let curTdList = document.querySelectorAll('#paymentTable tbody tr td');

      // Validate that the table is updated with correct payment details
        expect(curTdList.length).toEqual(4);
        expect(curTdList[0].innerText).toEqual('$100');
        expect(curTdList[1].innerText).toEqual('$20');
        expect(curTdList[2].innerText).toEqual('%20');
        expect(curTdList[3].innerText).toEqual('X');
    });

    it('should create a new payment on createCurPayment()', function () {
        let expectedPayment = {
        billAmt: '100',
        tipAmt: '20',
        tipPercent: 20,
    };

      // Check if createCurPayment returns the correct payment object
        expect(createCurPayment()).toEqual(expectedPayment);
    });

    it('should not create payment with empty input on createCurPayment()', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let curPayment = createCurPayment();

      // Verify that createCurPayment returns undefined for empty input
        expect(curPayment).toBeUndefined();
    });

    afterEach(function() {
      // Reset inputs and clear tables after each test
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
      summaryTds.forEach(td => td.innerHTML = ''); // Using forEach for summaryTds
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
    });
});
