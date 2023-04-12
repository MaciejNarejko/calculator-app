import React from 'react'
import styled from 'styled-components'

const CalcDisplay = (props) => {
	const displayValue = props.value.replace(/\*/g, 'x');
	return <Display data-testid='calc-display'>{displayValue}</Display>;
  };
export default CalcDisplay

const Display = styled.div`
	height: 5.5rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 1.5rem;
	border-radius: 0.625rem;
	font-size: 4em;
	font-weight: bold;
	background-color: ${(props) => props.theme.screenBg};
	color: ${(props) => props.theme.calcText};

	@media (min-width: 600px) {
		height: 6.5rem;
	}
`
