import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import CalcKeypad from '../components/CalcKeypad'

describe('CalcKeypad', () => {
	let mockUpdateValue, mockDelChar, mockResetValue, mockCalculate

	beforeEach(() => {
		mockUpdateValue = jest.fn()
		mockDelChar = jest.fn()
		mockResetValue = jest.fn()
		mockCalculate = jest.fn()
	})

	it('displays all buttons correctly', () => {
		render(<CalcKeypad updateValue={mockUpdateValue} />)
		const buttonLabels = [
			'7',
			'8',
			'9',
			'4',
			'5',
			'6',
			'+',
			'1',
			'2',
			'3',
			'-',
			'.',
			'0',
			'/',
			'x',
			'del',
			'reset',
			'=',
		]
		buttonLabels.forEach((label) => {
			expect(screen.getByLabelText(label)).toBeInTheDocument()
		})
	})

	it('calls updateValue function with correct argument on button click', () => {
		render(<CalcKeypad updateValue={mockUpdateValue} />)
		fireEvent.click(screen.getByText('7'))
		expect(mockUpdateValue).toHaveBeenCalledTimes(1)
		expect(mockUpdateValue).toHaveBeenCalledWith('7')
	})

	it('calls delChar function on delete button click', () => {
		render(<CalcKeypad delChar={mockDelChar} />)
		fireEvent.click(screen.getByText('del'))
		expect(mockDelChar).toHaveBeenCalledTimes(1)
	})

	it('calls resetValue function on reset button click', () => {
		render(<CalcKeypad resetValue={mockResetValue} />)
		fireEvent.click(screen.getByText('reset'))
		expect(mockResetValue).toHaveBeenCalledTimes(1)
	})

	it('calls calculate function on equal button click', () => {
		render(<CalcKeypad calculate={mockCalculate} />)
		fireEvent.click(screen.getByText('='))
		expect(mockCalculate).toHaveBeenCalledTimes(1)
	})
})
