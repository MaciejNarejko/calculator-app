import React from 'react'
import styled from 'styled-components'
const CalcKeypad = (props) => {
	const buttons = [
		{ val: '7', callback: () => props.updateValue('7') },
		{ val: '8', callback: () => props.updateValue('8') },
		{ val: '9', callback: () => props.updateValue('9') },
		{ val: '4', callback: () => props.updateValue('4') },
		{ val: '5', callback: () => props.updateValue('5') },
		{ val: '6', callback: () => props.updateValue('6') },
		{ val: '+', callback: () => props.updateValue('+') },
		{ val: '1', callback: () => props.updateValue('1') },
		{ val: '2', callback: () => props.updateValue('2') },
		{ val: '3', callback: () => props.updateValue('3') },
		{ val: '-', callback: () => props.updateValue('-') },
		{ val: '.', callback: () => props.updateValue('.') },
		{ val: '0', callback: () => props.updateValue('0') },
		{ val: '/', callback: () => props.updateValue('/') },
		{ val: '*', callback: () => props.updateValue('*') },
	]

	const handleClick = (value, btn) => {
		props.updateValue(value)
		btn.classList.add('active')
		setTimeout(() => {
			btn.classList.remove('active')
			document.activeElement.blur()
		}, 250)
	}

	const handleDel = (btn) => {
		props.delChar()
		btn.classList.add('active')
		setTimeout(() => {
			btn.classList.remove('active')
			document.activeElement.blur()
		}, 200)
	}

	const handleReset = (btn) => {
		props.resetValue()
		btn.classList.add('active')
		setTimeout(() => {
			btn.classList.remove('active')
			document.activeElement.blur()
		}, 200)
	}

	const handleCalculate = (btn) => {
		props.calculate()
		btn.classList.add('active')
		setTimeout(() => {
			btn.classList.remove('active')
			document.activeElement.blur()
		}, 200)
	}

	return (
		<Keypad>
			{buttons.map((button, index) => (
				<Button
					key={index}
					value={button.val}
					onClick={(e) => handleClick(button.val, e.target)}
					onKeyDown={props.handleKeyDown}
					aria-label={button.val}
				>
					{button.label || button.val}
				</Button>
			))}
			<DelButton
				value='del'
				onClick={(e) => handleDel(e.target)}
				aria-label='del'
			>
				del
			</DelButton>
			<ResetButton
				value='reset'
				onClick={(e) => handleReset(e.target)}
				aria-label='reset'
			>
				reset
			</ResetButton>
			<EqualButton
				value='='
				onClick={(e) => handleCalculate(e.target)}
				aria-label='='
			>
				=
			</EqualButton>
		</Keypad>
	)
}
export default CalcKeypad

const Keypad = styled.div`
	display: grid;
	padding: 1.5rem;
	grid-template-areas:
		'. . . del'
		'. . . .'
		'. . . .'
		'. . . .'
		'. . . .';
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
	border-radius: 0.625rem;
	background-color: ${(props) => props.theme.keypadBg};

	@media (min-width: 600px) {
		padding: 1.7rem;
		grid-column-gap: 1.2rem;
		grid-row-gap: 1.2rem;
	}
`

const Button = styled.button`
	font-family: 'League Spartan', sans-serif;
	padding: 1rem 0.8rem 0.6rem 0.8rem;
	border-radius: 0.3rem;
	border: none;
	font-size: 2.7em;
	font-weight: bold;
	color: ${(props) => props.theme.keyText};
	background-color: ${(props) => props.theme.mainKeyBg};
	box-shadow: 0 0.2rem 0 ${(props) => props.theme.mainKeySh};
	text-align: center;
	transition: background-color 0.2s, box-shadow, transform ease-in-out;

	@media (min-width: 600px) {
		height: 4rem;
		font-size: 4em;
	}

	&:hover {
		background-color: ${(props) => props.theme.mainKeyH};
	}

	&.active {
		box-shadow: 0 0rem 0;
		transform: translateY(0.2rem);
		background-color: ${(props) => props.theme.mainKeyH};
	}
`

const DelButton = styled(Button)`
	grid-area: del;
	text-transform: uppercase;
	font-size: 2.2em;
	color: ${(props) => props.theme.actionKeyText};
	background-color: ${(props) => props.theme.actionKeyBg};
	box-shadow: 0 0.2rem 0 ${(props) => props.theme.actionKeySh};

	&:hover {
		background-color: ${(props) => props.theme.actionKeyH};
	}

	&.active {
		box-shadow: 0 0rem 0;
		transform: translateY(0.2rem);
		background-color: ${(props) => props.theme.actionKeyH};
	}
	@media (min-width: 600px) {
		font-size: 2.8em;
	}
`
const ResetButton = styled(Button)`
	grid-area: 5 / 1 / 6 / 3;
	text-transform: uppercase;
	font-size: 2.2em;
	letter-spacing: 0.05em;
	color: ${(props) => props.theme.actionKeyText};
	background-color: ${(props) => props.theme.actionKeyBg};
	box-shadow: 0 0.2rem 0 ${(props) => props.theme.actionKeySh};

	&:hover {
		background-color: ${(props) => props.theme.actionKeyH};
	}

	&.active {
		box-shadow: 0 0rem 0;
		transform: translateY(0.2rem);
		background-color: ${(props) => props.theme.actionKeyH};
	}
	@media (min-width: 600px) {
		font-size: 2.8em;
	}
`
const EqualButton = styled(Button)`
	grid-area: 5 / 3 / 6 / 5;
	font-size: 2.2em;
	color: ${(props) => props.theme.equalKeyTextH};
	background-color: ${(props) => props.theme.equalKeyBg};
	box-shadow: 0 0.2rem 0 ${(props) => props.theme.equalKeySh};

	&:hover {
		background-color: ${(props) => props.theme.equalKeyH};
	}

	&.active {
		box-shadow: 0 0rem 0;
		transform: translateY(0.2rem);
		background-color: ${(props) => props.theme.equalKeyH};
	}
	@media (min-width: 600px) {
		font-size: 2.8em;
	}
`
