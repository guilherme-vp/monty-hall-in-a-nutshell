import { Subtitle, Title } from 'components/Typography'
import type { NextPage } from 'next'
import Image from 'next/image'
import styled, { useTheme } from 'styled-components'

import appleWatch from 'assets/apple-watch.png'
import Link from 'next/link'
import { Button } from 'components/Button'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	min-height: 100vh;
	padding: 128px 0;
	max-width: 1280px;
`

const Header = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`

const Section = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`

const ImageContainer = styled.div`
	margin: 0 24px;
`

const Home: NextPage = () => {
	const theme = useTheme()
	return (
		<Main>
			<Header>
				<Title>The Monty Hall Problem</Title>
			</Header>
			<Section>
				<Subtitle color={theme.text.main}>
					Congratulations! You are the guest of the famous show
				</Subtitle>
				<Title size={3} color={theme.colors.secondary}>
					<i>Let's make a Deal!</i>
				</Title>
			</Section>
			<Section>
				<Subtitle size={1.5}>Here you will have the opportunity to win a prize:</Subtitle>
				<ImageContainer>
					<Image width={140} height={140} src={appleWatch} alt="apple watch" />
					<Subtitle color={theme.colors.primary}>An Apple Watch</Subtitle>
				</ImageContainer>
			</Section>
			<Section>
				<Link href="/boxes">
					<Button>Play the game!</Button>
				</Link>

				<Link href="/playground">
					<Button style={{ marginTop: 12 }} color={theme.colors.secondary}>
						Go to playground!
					</Button>
				</Link>
			</Section>
		</Main>
	)
}

export default Home
