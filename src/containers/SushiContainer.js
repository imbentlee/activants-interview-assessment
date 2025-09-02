import React, { Fragment } from "react";
import MoreButton from "../components/Button";
import BackButton from "../components/Button";
import Sushi from "../components/Sushi";

const SushiContainer = (props) => {
	return (
		<Fragment>
			<div className="belt">
				<BackButton moreSushis={props.goBack} buttonText="Go Back" />
				{props.sushis.map((sushi, index) => (
					<Sushi
						displaySushi={sushi}
						eatSushi={props.eatSushi}
						key={index}
						eatenSushi={props.eatenSushi}
					/>
				))}
				<MoreButton moreSushis={props.moreSushis} buttonText="More sushi!" />
			</div>
		</Fragment>
	);
};

export default SushiContainer;
