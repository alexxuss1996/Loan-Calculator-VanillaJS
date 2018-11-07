
	// Listen for submit
	document.getElementById('loan-form').addEventListener('submit', function(e){
		// Hide results
		document.getElementById('results').style.display = 'none';

		// Show loader
		document.getElementById('loading').style.display = 'block';

		setTimeout(calculateResults, 1500);

		e.preventDefault();
	});

	// Calculate Results
	function calculateResults(e) {
		// UI Vars
		const amount = document.getElementById('amount');
		const interest = document.getElementById('interest');
		const years = document.getElementById('years');

		const monthlyPayment = document.getElementById('monthly-payment');
		const totalPayment = document.getElementById('total-payment');
		const totalInterest = document.getElementById('total-interest');

		const principal = parseFloat(amount.value);
		const calculatedInterest = parseFloat(interest.value) / 100 / 12;
		const calculatedPayments = parseFloat(years.value) * 12;

		// Compute monthly payment

		const x = Math.pow(1 + calculatedInterest, calculatedPayments);
		const monthly = (principal * x * calculatedInterest) / (x - 1);

		if (isFinite(monthly)) {
		// Show results
			document.getElementById('results').style.display = 'block';
		// Hide loader
			document.getElementById('loading').style.display = 'none';


			monthlyPayment.value = monthly.toFixed(2);
			totalPayment.value = (monthly * calculatedPayments).toFixed(2);
			totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
			
		} else {

			showError("Please, check your numbers");
		}

	}
	// Show error
	function showError(error) {

		// Show results
		document.getElementById('results').style.display = 'none';
		// Hide loader
		document.getElementById('loading').style.display = 'none';

		// create div
		const errorDiv = document.createElement('div');

		// Get elems
		const card = document.querySelector('.card');
		const heading = document.querySelector('.heading');

		// Create text node and append in div
		errorDiv.appendChild(document.createTextNode(error));

		// Add a class 
		errorDiv.className = 'alert alert-danger';

		// Inser error div above heading
		card.insertBefore(errorDiv, heading);

		// Remove alert after 3 seconds 
		setTimeout(clearError, 2500);
	}

	function clearError() {
		document.querySelector('.alert').remove();
	}