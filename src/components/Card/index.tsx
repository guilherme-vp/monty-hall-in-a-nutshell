import styled from 'styled-components'

import Image from 'next/image'
import appleWatch from 'assets/apple-watch.png'

const Box = styled.div.withConfig<{ clickable?: boolean }>({})`
	width: 160px;
	height: 160px;
	background-color: ${({ theme }) => theme.background.light};
	transform-style: preserve-3d;
	transform: perspective(2500px);
	position: relative;
	margin: 12px 80px;
	cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`

const BoxFront = styled.div.withConfig<{ isOpen?: boolean }>({
	shouldForwardProp: prop => !['isOpen'].includes(prop)
})`
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.tags.brown};
	border: 1px solid #333;
	overflow: hidden;
	transform-origin: left;
	position: absolute;
	z-index: 5;
	${({ isOpen }) => isOpen && { transform: 'rotateY(-140deg)' }};
`

const BoxNumber = styled.h2.withConfig<{ isOpen?: boolean }>({})`
	position: absolute;
	top: 40%;
	left: 48%;
	translate: transform(-48%, -40%);
	color: ${({ theme }) => theme.text.light};
	${({ isOpen }) => isOpen && { transform: 'rotateY(-140deg)' }};
`

const BoxBackground = styled.div`
	border: 1px solid #333;
	background-color: ${({ theme }) => theme.tags.brown};
	box-shadow: inset 0 0 24px #333;
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	overflow: hidden;
	outline: 10px solid #edf2f4;
`

export interface CardProps {
	isOpen: boolean
	hasPrize?: boolean
	number: number
	clickable: boolean
	onClickBox?: () => void
}

function Card({ isOpen, hasPrize = false, number, clickable, onClickBox }: CardProps) {
	return (
		<Box clickable={clickable} onClick={() => clickable && onClickBox?.()}>
			<BoxFront isOpen={isOpen}>
				<BoxNumber isOpen={isOpen}>{number}</BoxNumber>
			</BoxFront>
			<BoxBackground>
				{hasPrize && <Image unselectable="off" src={appleWatch} />}
			</BoxBackground>
		</Box>
	)
}

export default Card
