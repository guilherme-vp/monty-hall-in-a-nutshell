import { montyHallSimulator } from './montyHall'

export function playgroundRunner(
	switching: boolean,
	nSimulations = 1000,
	nBoxes = 3
): {
	wins: number
	losses: number
	winRate: string
} {
	const results = { wins: 0, losses: 0 }

	for (let i = 0; i < nSimulations; i++) {
		const hasWon = montyHallSimulator({ nBoxes, shouldSwitch: switching })

		if (hasWon) {
			results.wins += 1
		} else {
			results.losses += 1
		}
	}
	return {
		...results,
		winRate: `${((results.wins / nSimulations) * 100).toFixed(2)}%`
	}
}
