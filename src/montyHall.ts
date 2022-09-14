export function montyHallSimulator({
	nBoxes,
	shouldSwitch
}: {
	nBoxes: number
	shouldSwitch: boolean
}): boolean {
	// Creates an array of empty boxes
	const boxes = new Array(nBoxes).fill(0)

	// Chooses a random index to assign the prize
	const prizeIndex = Math.floor(Math.random() * nBoxes)

	// Chooses one random box to open
	const boxSelectedIndex = Math.floor(Math.random() * nBoxes)

	// Opens a box that is not the prize and not the one selected
	const revealedBoxIndex = boxes.findIndex(
		(_, index) => ![prizeIndex, boxSelectedIndex].includes(index)
	)

	// If the player is switching, they will choose the box that is not the one they first selected or the one that was revealed
	if (shouldSwitch) {
		const newSelectedBoxIndex = boxes.findIndex(
			(_, index) => ![boxSelectedIndex, revealedBoxIndex].includes(index)
		)
		return prizeIndex === newSelectedBoxIndex
	}

	// If the player is not switching, they will choose the box they first selected
	return prizeIndex === boxSelectedIndex
}
