import React, { useState, useEffect } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

const startState = {
	allSushis: [],
	startIndex: 0,
	bank: 100,
	eatenSushi: [],
};

export const App = () => {
	const [sushis, setSushis] = useState(startState);

	useEffect(() => {
		/*Please come up with a logic to select all sushis from the list*/
		fetch(API) //http request to get all sushis
			.then((res) => res.json()) //parse the response as json
			.then((data) => {
				setSushis({ ...sushis, allSushis: data }); //update state with fetched sushis
			});
	}, []);

	const activePageContent = () => {
		/*Please come up with a logic to display 4 sushis at a time */
		let currentSushis = sushis.allSushis.slice(sushis.startIndex, sushis.startIndex + 4); //get current 4 sushis from startIndex
		return currentSushis;
	};

	const moreSushis = () => {
		/*Please come up with a logic to allow users to see the next 4 sushis */
		let nextSushies = sushis.startIndex + 4; //calculate next start index
		if (nextSushies >= sushis.allSushis.length) {
			nextSushies = 0; //reset to 0 if next index exceeds length
		}
		setSushis({ ...sushis, startIndex: nextSushies }); //update state with new startIndex
	};

	const goBack = () => {
		/*Please come up with a logic to allow users to see the previous 4 sushis */
		let prevSushies = sushis.startIndex - 4; //calculate previous start index
		if (prevSushies < 0) {
			prevSushies = Math.max(0, sushis.allSushis.length - 4); //set to last full page if previous index is negative
		}
		setSushis({ ...sushis, startIndex: prevSushies }); //update state with new startIndex
	};

	const updateSushis = (id, price) => {
		/*
		Please come up with a logic prompt users on the following:
		1) If sushi has already been eaten, display an alert that shows "Sushi has been eaten!"
		2) If user's bank balance is less than the price of the sushi selected, display an alert that shows "Insufficient funds!"
		3) Only when the above 2 conditions are satisfied, allow users to eat the sushi. When the sushi is eaten, the sushi will only show
			an empty plate in its original place and there will be an additional empty plate on the table. Please refer to the gif for 
			described behaviour.    
		*/
		if (sushis.eatenSushi.includes(id)) {
			alert("Sushi has been eaten!"); //alert if sushi already eaten
			return;
		}
		if (sushis.bank < price) {
			alert("Insufficient funds!"); //alert if insufficient funds
			return;
		}
		setSushis({
			...sushis,
			bank: sushis.bank - price, //deduct price from bank
			eatenSushi: [...sushis.eatenSushi, id], //add sushi id to eatenSushi array
		});
	};

	//function to top up wallet
	const topUpBalance = (amount) => {
		setSushis({
			...sushis,
			bank: sushis.bank + amount, //add amount to bank
		});
	};


	return (
		<div className="app">
			<SushiContainer
				sushis={activePageContent()}
				moreSushis={moreSushis}
				goBack={goBack}
				eatSushi={updateSushis}
				eatenSushi={sushis.eatenSushi}
			/>
			<Table sushiPlate={sushis.eatenSushi} bank={sushis.bank} topUpBalance={topUpBalance}/>
		</div>
	);
};

export default App;
