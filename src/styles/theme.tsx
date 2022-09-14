import 'styled-components'

export const theme = {
	colors: {
		primary: '#21A179',
		secondary: '#087CA7',
		darker: '#1D2B4E',
		alternative: '#EDB183'
	},
	background: {
		main: '#F8F9FE',
		light: '#FFF'
	},
	text: {
		main: '#1D2B4E',
		description: '#656A80',
		link: '#4a90e2',
		light: '#fff'
	},
	tags: {
		white: '#FFFFFF',
		red: '#ff3333',
		green: '#00C48C',
		brown: '#924500'
	},
	border: {
		thick: '#E2E2EA'
	}
}

export type Theme = typeof theme

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends Theme {}
}
