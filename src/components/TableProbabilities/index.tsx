import styled from 'styled-components'

const Table = styled.table`
	border-collapse: collapse;
	margin: 24px 0;
`

const TableHeaderData = styled.th`
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
				<tr>
					<TableHeaderData>Behind door 1</TableHeaderData>
					<TableHeaderData>Behind door 2</TableHeaderData>
					<TableHeaderData>Behind door 3</TableHeaderData>
					<TableHeaderData>Result if staying at door #1</TableHeaderData>
					<TableHeaderData>Result if switching to the door offered</TableHeaderData>
				</tr>
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
