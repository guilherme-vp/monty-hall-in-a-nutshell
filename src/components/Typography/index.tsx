import styled from 'styled-components'

interface TypographyProps {
	color?: string
	size?: number
	align?: 'left' | 'right' | 'center'
}

export const Title = styled.h1.withConfig<TypographyProps>({})`
	text-align: ${({ align }) => align ?? 'center'};
	color: ${({ color, theme }) => color ?? theme.text.main};
	font-size: ${({ size }) => (size ? `${size}rem` : '4rem')};
`

export const Subtitle = styled.h4.withConfig<TypographyProps>({})`
	text-align: ${({ align }) => align ?? 'center'};
	font-size: ${({ size }) => (size ? `${size}rem` : '2rem')};
	color: ${({ color, theme }) => color ?? theme.text.description};
`

export const Paragraph = styled.p.withConfig<TypographyProps>({})`
	text-align: ${({ align }) => align ?? 'left'};
	font-size: ${({ size }) => (size ? `${size}rem` : '1.2rem')};
	color: ${({ color, theme }) => color ?? theme.text.description};
`
