describe("Utilities test (with setup and tear-down)", function() {
    beforeEach(function () {
    // Set initial values and submit payment info before each test
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
    submitPaymentInfo();
    });

    it('should sum total tip amount of all payments on sumPaymentTotal()', function () {
        // Test initial tip total
        expect(sumPaymentTotal('tipAmt')).toEqual(20);

        // Add a new payment and test updated tip total
        billAmtInput.value = 200;
        tipAmtInput.value = 40;
        submitPaymentInfo();
        expect(sumPaymentTotal('tipAmt')).toEqual(60);
    });

    it('should sum total bill amount of all payments on sumPaymentTotal()', function () {
        // Test initial bill total
        expect(sumPaymentTotal('billAmt')).toEqual(100);

        // Add a new payment and test updated bill total
        billAmtInput.value = 200;
        tipAmtInput.value = 40;
        submitPaymentInfo();
        expect(sumPaymentTotal('billAmt')).toEqual(300);
    });

    it('should sum total tip percent on sumPaymentTotal()', function () {
        // Test initial tip percent total
        expect(sumPaymentTotal('tipPercent')).toEqual(20);

        // Add a new payment and test updated tip percent total
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
        submitPaymentInfo();
        expect(sumPaymentTotal('tipPercent')).toEqual(40);
    });

    it('should calculate tip percent for a single payment on calculateTipPercent()', function () {
        // Test calculation of tip percent for single payments
        expect(calculateTipPercent(100, 23)).toEqual(23);
        expect(calculateTipPercent(111, 11)).toEqual(10);
    });

    it('should create a new td with value and append it to tr on appendTd(tr, value)', function () {
        let newTr = document.createElement('tr');

        // Append a new td with the value 'test' to a new row
        appendTd(newTr, 'test');

        // Validate that the td was added correctly
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual('test');
    });

    it('should create a delete td and append it to tr on appendDeleteBtn(tr)', function () {
        let newTr = document.createElement('tr');

        // Append a delete button to a new row
        appendDeleteBtn(newTr);

        // Validate that the delete button was added correctly
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual('X');
    });

    afterEach(function() {
        // Reset inputs and clear tables after each test
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds.forEach(td => td.innerHTML = '');
        serverTbody.innerHTML = '';
        allPayments = {};
        paymentId = 0;
    });
});
