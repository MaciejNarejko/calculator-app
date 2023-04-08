import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import CalcHeader from '../components/CalcHeader'

describe('CalcHeader', () => {
	const mockGetIsActiveByName = jest.fn()
	const mockUpdateTheme = jest.fn()

	it('should render header with title and theme switch', () => {
		render(
			<CalcHeader
				getIsActiveByName={mockGetIsActiveByName}
				updateTheme={mockUpdateTheme}
			/>
		)
		expect(screen.getByText('calc')).toBeInTheDocument()
	})
})
