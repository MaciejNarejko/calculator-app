import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
	it('renders without crashing', () => {
		render(<App />)
		const linkElement = screen.getByText(/399.981/i)
		expect(linkElement).toBeInTheDocument()
	})
	it('resetValue sets value to "0"', () => {
		render(<App />)
		const resetButton = screen.getByText('reset')
		const display = screen.getByTestId('calc-display')
		fireEvent.click(resetButton)
		expect(display.textContent).toBe('0')
	})
	it('delChar removes last character from value', () => {
		render(<App />)
		const delButton = screen.getByText('del')
		const display = screen.getByTestId('calc-display')
		const expected = '399.98'
		fireEvent.click(delButton)
		expect(display.textContent).toBe(expected)
	})
	it('updateValue adds the correct character to the value', () => {
		render(<App />)
		const button = screen.getByLabelText('1')
		const display = screen.getByTestId('calc-display')
		const expected = '399.9811'
		fireEvent.click(button)
		expect(display.textContent).toBe(expected)
	})
	it('calculate computes the correct result', () => {
		render(<App />)
		const button1 = screen.getByLabelText('1')
		const button2 = screen.getByLabelText('2')
		const button3 = screen.getByLabelText('3')
		const buttonReset = screen.getByLabelText('reset')
		const buttonPlus = screen.getByLabelText('+')
		const buttonMultiply = screen.getByLabelText('x')
		const buttonEquals = screen.getByLabelText('=')
		const display = screen.getByTestId('calc-display')
		fireEvent.click(buttonReset)
		fireEvent.click(button1)
		fireEvent.click(buttonPlus)
		fireEvent.click(button2)
		fireEvent.click(buttonMultiply)
		fireEvent.click(button3)
		fireEvent.click(buttonEquals)
		expect(display.textContent).toBe('7')
	})
})
