import styled from 'styled-components'

const Table = styled.table`
	border-collapse: collapse;
	margin: 24px 0;
`

const TableHeader = styled.th`
	border: 1px solid ${({ theme }) => theme.border.thick};
	padding: 8px;
`

const TableData = styled.td`
	border: 1px solid ${({ theme }) => theme.border.thick};
	padding: 8px;
	text-align: center;
`

function TableProbabilities() {
	return (
		<Table>
			<thead>
				<TableHeader>Behind door 1</TableHeader>
				<TableHeader>Behind door 2</TableHeader>
				<TableHeader>Behind door 3</TableHeader>
				<TableHeader>Result if staying at door #1</TableHeader>
				<TableHeader>Result if switching to the door offered</TableHeader>
			</thead>
			<tbody>
				<tr>
					<TableData>Empty</TableData>
					<TableData>Empty</TableData>
					<TableData>
						<b>Prize</b>
					</TableData>
					<TableData>Loses</TableData>
					<TableData>
						<b>Wins prize</b>
					</TableData>
				</tr>
				<tr>
					<TableData>Empty</TableData>
					<TableData>
						<b>Prize</b>
					</TableData>
					<TableData>Empty</TableData>
					<TableData>Loses</TableData>
					<TableData>
						<b>Wins prize</b>
					</TableData>
				</tr>
				<tr>
					<TableData>
						<b>Prize</b>
					</TableData>
					<TableData>Empty</TableData>
					<TableData>Empty</TableData>
					<TableData>
						<b>Wins prize</b>
					</TableData>
					<TableData>Loses</TableData>
				</tr>
			</tbody>
		</Table>
	)
}

export default TableProbabilities
