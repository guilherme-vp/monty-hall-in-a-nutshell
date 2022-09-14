import styled from 'styled-components'

export const Input = styled.input`
	border: 1px solid ${({ theme }) => theme.border.thick};
	border-radius: 8px;
	font-size: 1rem;
	padding: 8px;
	min-width: 140px;
`
