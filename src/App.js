import React, { useEffect, useState, useCallback } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Mexp from 'math-expression-evaluator'
import styled from 'styled-components'
import { themes } from './theme'
import CalcHeader from './components/CalcHeader'
import CalcDisplay from './components/CalcDisplay'
import CalcKeypad from './components/CalcKeypad'

const operators = ['.', '-', '+', '/', '*']
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

function App() {
	const [theme, setTheme] = useState('darkBlue')
	const [value, setValue] = useState('399.981')

	const resetValue = useCallback(() => {
		setValue('0')
	}, [])

	const delChar = useCallback(() => {
		setValue((prevValue) => (prevValue === '0' ? '0' : prevValue.slice(0, -1) || '0'))
	}, [])

	const updateValue = useCallback(
		(v) => {
			const isNumber = !isNaN(v)
			const isOperator = operators.includes(v)
			const isDecimal = v === '.'
			if (value.length < 13) {
				if (isDecimal) {
					if (value.includes('.')) {
						let operatorsArray = value.match(/[+\-*/]/g)
						const operator = operatorsArray ? operatorsArray.pop() : ' '
						const parts = value.split(operator)
						if (parts[parts.length - 1].includes('.')) {
							return null
						} else setValue((prevValue) => prevValue + v)
					} else {
						setValue((prevValue) => prevValue + v)
					}
				} else if (isOperator) {
					if (/[+\-*/.]$/.test(value)) {
						setValue(value)
					} else {
						setValue((prevValue) => prevValue + v)
					}
				} else if (isNumber) {
					if (value === '0') {
						setValue(v)
					} else {
						setValue((prevValue) => prevValue + v)
					}
				}
			} else return null
		},
		[value]
	)

	const calculate = useCallback(() => {
		if (operators.some((operator) => value.endsWith(operator))) {
			return setValue(value + value.slice(0, -1))
		}
		if (value.includes('Infinity') || value.includes('NaN') || value.includes('undefined'))
			return setValue('0')
		if (value.includes('.')) {
			setValue((prevValue) => prevValue.replace(/(\d+)\.(\d+)/g, '$1$2'))
		}
		const mexp = new Mexp()
		const result = mexp.eval(value)
		const roundedResult = Math.round(parseFloat(result) * 10000) / 10000
		setValue(String(roundedResult))
	}, [value])

	const detectKeyDown = useCallback((e) => {
		if (operators.includes(e.key) || numbers.includes(e.key)) {
			document.querySelector(`button[value="${e.key}"]`).click()
		} else if (e.key === 'Enter' || e.key === '=') {
			document.querySelector(`button[value="="]`).click()
		} else if (e.key === 'Backspace') document.querySelector(`button[value="del"]`).click()
		else if (e.key === 'Escape') document.querySelector(`button[value="reset"]`).click()
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', detectKeyDown)
		return () => {
			document.removeEventListener('keydown', detectKeyDown)
		}
	}, [detectKeyDown])
	const updateTheme = (selected) => {
		setTheme(selected)
		localStorage.setItem('theme', JSON.stringify(selected))
	}

	const getIsActiveByName = useCallback((name) => name === theme, [theme])

	useEffect(() => {
		const currentTheme = JSON.parse(localStorage.getItem('theme'))
		currentTheme && setTheme(currentTheme)
		getIsActiveByName(currentTheme)
	}, [getIsActiveByName])

	return (
		<ThemeProvider theme={themes[theme]}>
			<GlobalBackgroundColor />
			<CalcWrapper>
				<CalcHeader
					getIsActiveByName={getIsActiveByName}
					updateTheme={updateTheme}
				/>
				<CalcDisplay value={value} />
				<CalcKeypad
					updateValue={updateValue}
					delChar={delChar}
					resetValue={resetValue}
					calculate={calculate}
					onKeyDown={detectKeyDown}
				/>
			</CalcWrapper>
		</ThemeProvider>
	)
}

export default App

const GlobalBackgroundColor = createGlobalStyle`
body {
	background-color: ${(props) => props.theme.mainBg};
}
`
const CalcWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1.5rem;
	@media (min-width: 600px) {
		max-width: 500px;
	}
`
