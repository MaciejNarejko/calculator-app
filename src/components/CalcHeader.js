import styled from 'styled-components'

const CalcHeader = ({ getIsActiveByName, updateTheme }) => {
	return (
		<Header>
			<Title translate='no'>calc</Title>
			<ThemeSwitch>
				<Theme>THEME</Theme>
				<Switch>
					<SwitchTitle>
						<ThemeNumber>1</ThemeNumber>
						<ThemeNumber>2</ThemeNumber>
						<ThemeNumber>3</ThemeNumber>
					</SwitchTitle>
					<SwitchBody>
						<ThemeButton
							value='darkBlue'
							aria-label='Select dark blue color'
							isActive={getIsActiveByName('darkBlue')}
							onClick={e => updateTheme('darkBlue')}></ThemeButton>
						<ThemeButton
							value='lightGray'
							aria-label='Select light gray color'
							isActive={getIsActiveByName('lightGray')}
							onClick={e => updateTheme('lightGray')}></ThemeButton>
						<ThemeButton
							value='darkViolet'
							aria-label='Select dark violet color'
							isActive={getIsActiveByName('darkViolet')}
							onClick={e => updateTheme('darkViolet')}></ThemeButton>
					</SwitchBody>
				</Switch>
			</ThemeSwitch>
		</Header>
	)
}

export default CalcHeader

const Title = styled.h1`
	font-size: 3.2rem;
	margin: 1rem 0 1.5rem 1rem;
`
const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${props => props.theme.calcText};
`

const ThemeSwitch = styled.div`
	display: flex;
	align-items: center;
	gap: 2.5em;
	padding-bottom: 1em;
`

const Switch = styled.div``
const SwitchTitle = styled.div`
	display: flex;
	justify-content: space-around;
	margin-bottom: 0.5em;
	padding-left: 0.2em;
`

const ThemeNumber = styled.div`
	font-size: 1.2em;
`

const Theme = styled.div`
	padding-top: 1.5em;
	font-size: 1.2em;
	letter-spacing: 0.1em;
`

const SwitchBody = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 7.1em;
	height: 2.6em;
	border-radius: 1.3em;
	background-color: ${props => props.theme.sliderBg};
`

const ThemeButton = styled.button`
	-webkit-appearance: none;
	appearance: none;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	border: none;
	background-color: ${props => {
		if (props.isActive) return props.theme.togglerBg
		return props.theme.sliderBg
	}};
	&:hover {
		background-color: ${props => {
			if (props.isActive) return props.theme.togglerH
			return props.theme.sliderBg
		}};
	}
`
