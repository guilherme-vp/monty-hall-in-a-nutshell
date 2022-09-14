import { useState } from 'react'
import Link from 'next/link'
import styled, { useTheme } from 'styled-components'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

import { Button } from 'components/Button'
import Card from 'components/Card'
import { Subtitle, Title } from 'components/Typography'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 128px 0;
	min-height: 100vh;
	max-width: 1280px;
`

const Section = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`

const BoxSection = styled.section`
	display: flex;
	justify-content: center;
`

const initialBoxesArrangement: boolean[] = new Array(3).fill(false)

const BoxesPage = () => {
	const theme = useTheme()
	const { width, height } = useWindowSize()

	const [step, setStep] = useState(0)
	const [boxes, setBoxes] = useState<boolean[]>(initialBoxesArrangement)
	const [prizeIndex, setPrizeIndex] = useState<number>(1)
	const [chosenBoxIndex, setChosenBoxIndex] = useState<number>()

	const handleStartGame = () => {
		setStep(1)
		const newPrizeIndex = Math.floor(Math.random() * 3)

		setPrizeIndex(newPrizeIndex)
	}

	const handleClickBox = (selectedBoxIndex: number) => {
		if (step === 1) {
			setStep(2)

			const randomRevealedBoxIndex = boxes.findIndex(
				(_, index) => ![prizeIndex, selectedBoxIndex].includes(index)
			)

			const newArrangementWithWrongBoxOpened = [...boxes]
			newArrangementWithWrongBoxOpened[randomRevealedBoxIndex] = true

			setBoxes(newArrangementWithWrongBoxOpened)
			setChosenBoxIndex(selectedBoxIndex)

			return
		}

		// Switching to the other box
		if (chosenBoxIndex !== selectedBoxIndex) {
			const finalSwitchArrangement = [...boxes]
			finalSwitchArrangement[selectedBoxIndex] = true

			setChosenBoxIndex(selectedBoxIndex)
			setBoxes(finalSwitchArrangement)
		} else {
			const finalNotSwitchArrangement = [...boxes]
			finalNotSwitchArrangement[selectedBoxIndex] = true

			setBoxes(finalNotSwitchArrangement)
		}

		setStep(3)
	}

	const handlePlayAgain = () => {
		setStep(0)
		setBoxes(initialBoxesArrangement)
		setChosenBoxIndex(undefined)
	}

	return (
		<Main>
			{step === 0 && (
				<Subtitle>
					Behind one of these boxes there is one Apple Watch. You will have to guess in
					which box it is.
				</Subtitle>
			)}
			{step === 1 && <Subtitle>Choose a box!</Subtitle>}
			{step === 2 && (
				<>
					<Subtitle color={theme.text.main} style={{ marginBottom: 16 }}>
						Interesting! Seems like you are felling lucky today...
					</Subtitle>
					<Subtitle size={1.5}>
						Since I know what box is correct, I will open one of the incorrect boxes to make
						things more spicy.
					</Subtitle>
				</>
			)}
			{step === 3 && chosenBoxIndex === prizeIndex && (
				<Confetti
					width={width}
					height={height}
					numberOfPieces={200}
					initialVelocityY={50}
				/>
			)}
			{step === 3 && (
				<Subtitle color={theme.text.main}>
					{chosenBoxIndex === prizeIndex
						? 'Congratulations! You won the Apple Watch!'
						: 'Sorry! You lost!'}
				</Subtitle>
			)}

			<BoxSection>
				{boxes.map((isOpen, index) => (
					<Card
						isOpen={isOpen}
						hasPrize={index === prizeIndex}
						number={index + 1}
						clickable={step === 1 && !isOpen}
						onClickBox={() => handleClickBox(index)}
					/>
				))}
			</BoxSection>

			{chosenBoxIndex !== undefined ? (
				<Title size={2}>Choosen Box: nº{chosenBoxIndex + 1}</Title>
			) : null}
			<Section>
				{step === 0 && (
					<>
						<Subtitle style={{ marginBottom: 12 }} size={1.2}>
							<i>Obs: After you start the game, the order will change.</i>
						</Subtitle>
						<Button style={{ marginBottom: 24 }} onClick={() => handleStartGame()}>
							Let's start the game!
						</Button>
						<Link href="/playground">
							<Button color={theme.colors.darker}>Go to Playground</Button>
						</Link>
					</>
				)}
				{step === 2 && chosenBoxIndex !== undefined ? (
					<>
						<Subtitle color={theme.text.main} style={{ marginBottom: 12 }} size={1.5}>
							Do you want to switch your option?
						</Subtitle>
						<Section>
							<Button
								onClick={() => handleClickBox(chosenBoxIndex)}
								color={theme.tags.red}
								style={{ marginBottom: 12 }}
							>
								No! Open the box nº{chosenBoxIndex + 1}
							</Button>
							<Button
								onClick={() => {
									const newSelectedBoxIndex = boxes.findIndex(
										(isOpen, index) => ![chosenBoxIndex].includes(index) && !isOpen
									)
									handleClickBox(newSelectedBoxIndex)
								}}
								color={theme.tags.green}
							>
								Yes! Switch to box nº
								{boxes.findIndex(
									(isOpen, index) => ![chosenBoxIndex].includes(index) && !isOpen
								) + 1}
							</Button>
						</Section>
					</>
				) : null}
				{step === 3 && (
					<>
						<Button
							style={{ marginBottom: 28, backgroundColor: theme.colors.alternative }}
							onClick={handlePlayAgain}
						>
							Play again!
						</Button>
						<Link href="/playground">
							<Button>Go to Playground</Button>
						</Link>
					</>
				)}
			</Section>
		</Main>
	)
}

export default BoxesPage
