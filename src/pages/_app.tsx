import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from 'styles/Global.styles'
import { theme } from 'styles/theme'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Monty Hall in a nutshell</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default App
