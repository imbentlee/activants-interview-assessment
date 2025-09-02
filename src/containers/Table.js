import React, { Fragment, useState } from "react";

const Table = (props) => {
	// local UI state for showing/hiding the wallet form
	const [showForm, setShowForm] = useState(false);

	const renderPlates = (array) => {
		/* 
		Please come up with a logic to display the number of empty plates on the table correctly. The following has already been styled for you.
		*/
		return array.map((_, idx) => (
			<div
				key={idx}
				className="empty-plate"
				style={{ marginTop: -idx * 7 }} //each new plate 7px higher
			/>
		));
	};

	//handle wallet icon click -> toggle the form open/closed
	const handleWalletClick = () => {
		setShowForm((prev) => !prev); //flip visibility state
	};

	//handle form submit event -> validate in $5 steps, then call parent to top up balance
	const handleSubmit = (e) => {
		e.preventDefault(); //prevent page refresh on submit
		const val = parseInt(e.currentTarget.elements.amount.value, 10); //read amount directly from the form input

		//validations for positive amount and $5 denominations
		if (!Number.isFinite(val) || val <= 0) {
			alert("Please enter a positive amount.");
			return;
		}
		if (val % 5 !== 0) {
			alert("Top-ups must be in $5 increments.");
			return;
		}

		//call parent handler to update bank balance
		props.topUpBalance(val);

		//reset input + hide the form after successful top up
		e.currentTarget.reset();
		setShowForm(false);
	};

	return (
		<Fragment>
			<h1 className="remaining">You have: ${props.bank} remaining!</h1>
			<div className="table">
				<div className="stack">
					{
						/* 
						renderPlates takes an array 
						and renders an empty plate
						for every element in the array
						*/
						renderPlates(props.sushiPlate)
					}
				</div>
			</div>
			<div className="wallet">
				<div
					className="wallet-button"
					onClick={handleWalletClick} //toggle the form on click
				/>
				{showForm && (
					<form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
						<label style={{ display: "block", marginBottom: 6 }}>
							SushiWallet! ($5 denominations):
						</label>
						<input
							name="amount"
							type="number"
							min={5} //minimum allowed
							step={5}//enforce $5 increments via input arrows
							placeholder="e.g. 5, 15, 25"
							style={{ padding: 6, width: 160 }}
						/>
						<button type="submit" style={{ marginLeft: 8 }}>
							Top Up
						</button>
					</form>
				)}
			</div>
		</Fragment>
	);
};

export default Table;