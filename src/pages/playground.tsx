import styled from 'styled-components'

import { useState } from 'react'

import { Button } from 'components/Button'
import Card from 'components/Card'
import { Input } from 'components/Input'
import TableProbabilities from 'components/TableProbabilities'
import { Paragraph, Subtitle, Title } from 'components/Typography'
import { montyHallSimulator } from 'montyHall'
import Link from 'next/link'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	padding: 48px 12px;
	max-width: 1028px;
`

const Header = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	margin-bottom: 48px;
`

const Section = styled.section`
	display: flex;
	flex-direction: column;
	margin-bottom: 48px;
`

const TableSection = styled.section`
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-bottom: 24px;
`

const BoxSection = styled.section`
	display: flex;
	justify-content: center;
	margin: 24px 0;
	@media screen and (max-width: 1280px) {
		flex-direction: column;
		align-items: center;
	}
`

const Table = styled.table`
	border-collapse: collapse;
	margin: 12px 0;
	width: 100%;
`

const TableHeader = styled.th`
	border: 1px solid ${({ theme }) => theme.border.thick};
	padding: 8px;
	max-width: 140px;
`

const TableData = styled.td`
	border: 1px solid ${({ theme }) => theme.border.thick};
	padding: 8px;
	text-align: center;
`

const Label = styled.label`
	margin: 4px 0;
`

const LabelSpan = styled.span`
	margin-right: 8px;
`

const boxes: boolean[] = [false, false, false]

interface Result {
	wins: number
	loses: number
	winRate: string
}

function WhyPage() {
	const [nBoxes, setNBoxes] = useState<number>(3)
	const [nSimulations, setNSimulations] = useState<number>(1000)
	const [switchingResults, setSwitchingResults] = useState<Result>()
	const [notSwitchingResults, setNotSwitchingResults] = useState<Result>()

	const handleRunPlayground = () => {
		const switching = { wins: 0, loses: 0 }
		const notSwitching = { wins: 0, loses: 0 }

		for (let i = 0; i < nSimulations; i + 1) {
			const hasOwn = montyHallSimulator({ nBoxes, shouldSwitch: false })

			if (hasOwn) {
				notSwitching.wins + 1
			} else {
				notSwitching.loses + 1
			}
		}

		for (let i = 0; i < nSimulations; i + 1) {
			const hasOwn = montyHallSimulator({ nBoxes, shouldSwitch: true })

			if (hasOwn) {
				switching.wins + 1
			} else {
				switching.loses + 1
			}
		}

		setSwitchingResults({
			...switching,
			winRate: `${((switching.wins / nSimulations) * 100).toFixed(2)}%`
		})
		setNotSwitchingResults({
			...notSwitching,
			winRate: `${((notSwitching.wins / nSimulations) * 100).toFixed(2)}%`
		})
	}

	return (
		<Main>
			<Header>
				<Link href="/">Home</Link>
				<Title>Playground Section</Title>
			</Header>
			<Section>
				<Subtitle align="left">
					Insert a number of boxes and how many times you want the computer to play the
					game. The results will be shown in the table below.
				</Subtitle>
				<Label>
					<LabelSpan>
						<b>Number of boxes:</b> (<i>Default to 3</i>):
					</LabelSpan>
					<Input
						type="number"
						defaultValue={3}
						value={nBoxes}
						onChange={e => setNBoxes(+e.target.value)}
					/>
				</Label>
				<Label>
					<LabelSpan>
						<b>Number of plays:</b> (
						<i>1000 is a good value to see the spread of the probabilities</i>
						):
					</LabelSpan>
					<Input
						type="number"
						value={nSimulations}
						onChange={e => setNSimulations(+e.target.value)}
					/>
				</Label>
				<Button onClick={() => handleRunPlayground()}>Run simulations</Button>
			</Section>
			<TableSection>
				<Title size={2}>Statistics</Title>
				{notSwitchingResults && (
					<Table>
						<thead>
							<tr>
								<TableHeader>Nº of wins not switching</TableHeader>
								<TableHeader>Nº of loses not switching</TableHeader>
								<TableHeader>Percentage of wins not switching</TableHeader>
							</tr>
						</thead>
						<tbody>
							<tr>
								<TableData>{notSwitchingResults.wins} games</TableData>
								<TableData>{notSwitchingResults.loses} games</TableData>
								<TableData>{notSwitchingResults.winRate}</TableData>
							</tr>
						</tbody>
					</Table>
				)}
				{switchingResults && (
					<Table>
						<thead>
							<tr>
								<TableHeader>Nº of wins switching</TableHeader>
								<TableHeader>Nº of loses switching</TableHeader>
								<TableHeader>Percentage of wins switching</TableHeader>
							</tr>
						</thead>
						<tbody>
							<tr>
								<TableData>{switchingResults.wins} games</TableData>
								<TableData>{switchingResults.loses} games</TableData>
								<TableData>{switchingResults.winRate}</TableData>
							</tr>
						</tbody>
					</Table>
				)}
			</TableSection>
			<Section>
				<Title size={3}>Why is it a Math Problem?</Title>
				<Subtitle align="left">Some Context</Subtitle>
				<Paragraph style={{ marginBottom: 24 }}>
					The Monty Hall problem is a famous paradox in probability, it was first introduced
					by American television game show host{' '}
					<a href="https://en.wikipedia.org/wiki/Monty_Hall">Monty Hall</a> in 1963.
				</Paragraph>
				<Paragraph>
					In the show, the <b>host</b>, who knows where is the prize, would show the{' '}
					<b>contestant</b> three boxes.
				</Paragraph>
				<BoxSection>
					{boxes.map((_, index) => (
						<Card
							key={index}
							number={index}
							hasPrize={index === 0}
							clickable={false}
							isOpen={false}
						/>
					))}
				</BoxSection>
				<Paragraph>
					Behind one of them there was a <b>prize</b> and the contestant had to choose one
					of the boxes.
				</Paragraph>
				<BoxSection>
					{boxes.map((_, index) => (
						<Card
							key={index}
							number={index + 1}
							hasPrize={index === 0}
							clickable={false}
							isOpen={index === 0}
						/>
					))}
				</BoxSection>
				<Paragraph>
					After the contestant chose a box, the{' '}
					<b>host would open one of the wrong boxes</b>, revealing that it is empty.
				</Paragraph>
				<BoxSection>
					{boxes.map((_, index) => (
						<Card
							key={index}
							number={index + 1}
							hasPrize={index === 0}
							clickable={false}
							isOpen={index === 2}
						/>
					))}
				</BoxSection>
				<Paragraph>
					The contestant was then given the option to <b>switch</b> to the other unopened
					box.
				</Paragraph>
				<BoxSection>
					{boxes.map((_, index) => (
						<Card
							key={index}
							number={index + 1}
							hasPrize={index === 0}
							clickable={false}
							isOpen
						/>
					))}
				</BoxSection>
			</Section>
			<Section>
				<Subtitle align="left">Okay, but where is the probability problem?</Subtitle>
				<Paragraph>
					At first, when the contestant does their first choice, the probability of winning
					is <b>1/3 = 33% of chances to guess correctly</b>.
				</Paragraph>
				<BoxSection>
					{Array.from({ length: 3 }, (_, index) => (
						<Title key={index} style={{ margin: '0 24px' }}>
							33%
						</Title>
					))}
				</BoxSection>
				<Paragraph>
					After the host opens one of the empty boxes and asks if the contestant wants to
					change their number, the standard assumption is that the probability of winning
					changes from <b>1/3 = 33%</b> to <b>1/2 = 50%</b> since you'd not be counting the
					opened box anymore.
				</Paragraph>
				<BoxSection>
					{Array.from({ length: 2 }, (_, index) => (
						<Title key={index} style={{ margin: '0 24px' }}>
							50%
						</Title>
					))}
				</BoxSection>
				<Paragraph>
					However, this assumption is <b>incorrect</b>. Statistically, the probability of
					winning after switching is <strong>doubled</strong>, since one of the two empty
					boxes was already opened.
				</Paragraph>
			</Section>
			<Section>
				<Subtitle size={1.5} align="left">
					Looking at the probabilities
				</Subtitle>
				<Paragraph>
					A contestant choose the box <b>nº 1</b> in the first round. The host,{' '}
					<b>who knows where is the prize</b>, opens the empty box <b>nº 3</b>. The
					contestant then would have the following probabilities:
				</Paragraph>
				<TableProbabilities />
				<Paragraph>
					A player who stays with the initial choice wins in only <b>one out of three</b> of
					these equally likely possibilities, while a player who switches{' '}
					<b>wins in two out of three</b>. That is equal <b>66%</b> of chances to win if you
					switch, and <b>33%</b> if you don't.
				</Paragraph>
			</Section>
		</Main>
	)
}

export default WhyPage
