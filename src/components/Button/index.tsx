import styled from 'styled-components'

export const Button = styled.button.withConfig<{ color?: string }>({})`
	background-color: ${props => props.color ?? props.theme.colors.primary};
	color: ${props => props.theme.tags.white};
	border: none;
	border-radius: 4px;
	padding: 16px;
	font-size: 1.2rem;
	cursor: pointer;
`
