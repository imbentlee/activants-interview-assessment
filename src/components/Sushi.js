import React from "react";

const Sushi = (props) => {
	const isEaten = props.eatenSushi.includes(props.displaySushi.id); //check if sushi has been eaten
	return (
		<div className="sushi"
			onClick={() => {
				if (isEaten) { //only allow eating if not already eaten
					alert("Sushi has been eaten!")
				} else {
					props.eatSushi(props.displaySushi.id, props.displaySushi.price) //allow sushi to be eaten if !isEaten
				}
			}}
		>
			<div className="plate">
			{
				/* Tell me if this sushi has been eaten! You can use the following image tag inside the condition you will be creating.*/
				!isEaten && ( //if not eaten, show sushi image
					<img
						src={props.displaySushi.img_url}
						alt={props.displaySushi.name}
						width="100%"
					/>
				)
			}
			</div>
			<h4 className="sushi-details">
				{props.displaySushi.name} - ${props.displaySushi.price}
			</h4>
		</div>
	);
};

export default Sushi;
