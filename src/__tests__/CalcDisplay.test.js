import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import CalcDisplay from '../components//CalcDisplay'

describe('CalcDisplay', () => {
	it('should render with the provided value', () => {
		const value = '399.981'
		render(<CalcDisplay value={value} />)
		expect(screen.getByText(value)).toBeInTheDocument()
	})
})
