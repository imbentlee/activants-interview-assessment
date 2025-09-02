import React from "react";

//const Button = (props) => {
//  return <button onClick={() => props.moreSushis()}>{props.buttonText}</button>;
//};

const MoreButton = (props) => {
  return <button onClick={() => props.moreSushis()}>{props.buttonText}</button>;
};

const BackButton = (props) => {
  return <button onClick={() => props.goBack()}>{props.buttonText}</button>;
};

//export default Button;
export default MoreButton;
export { BackButton };
