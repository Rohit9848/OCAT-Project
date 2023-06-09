import React, { useEffect, useState } from 'react';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentListV2 = () => {
  const [ assessments, setAssessments ] = useState([]);
  const [ instrumentType, setInstrumentType ] = useState(``);

  const columns = React.useMemo(
    () => [
      {
        Header: `Cat Id`,
        accessor: `id`,
      }, {
        Header: `Cat Name`,
        accessor: `catName`,
      }, {
        Header: `Score`,
        accessor: `score`,
      }, {
        Header: `Risk Level`,
        accessor: `riskLevel`,
      }, {
        Header: `Cat Date Of Birth`,
        accessor: `catDateOfBirth`,
      }, {
        Header: `Created At`,
        accessor: `updatedAt`,
      }, {
        Cell: ({ row }) =>
          <button style={{
            backgroundColor: `red`,
            color: `white`,
            cursor: `pointer`,
          }} onClick={() => handleDelete(row)}>Delete</button>,
        accessor: `actions`,
        disableSortBy: true,
      },
    ], [],
  );

  useEffect(() => {
    const fetchAssessments = async () => {
      const assessmentResponse = await AssessmentService.getList();
      setAssessments(assessmentResponse);
      setInstrumentType(assessmentResponse[0].instrumentType);
    };
    fetchAssessments();
  }, []);

  const handleDelete = async (row) => {
    await AssessmentService.deleteAssessment(row.original.id);
    setAssessments((prevAssessments) =>
      prevAssessments.filter((assessment) => assessment.id !== row.original.id));
  };

  const generateSortingIndicator = column => column.isSorted ? column.isSortedDesc ? ` ▼` : ` ▲` : ``;

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments }, useFilters, useSortBy, usePagination);

  return (
    <Container style={{ marginTop: 10, textAlign: `center` }}>
      <h3 style={{ display: `inline`, marginRight: `10px` }}>Cat Assessments List -</h3>
      <h4 style={{ display: `inline` }}>{instrumentType}</h4>
      <Table bordered {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => <th style={{ textAlign: `center` }} {...column.getHeaderProps()}>
              <div {...column.getSortByToggleProps()}>
                {column.render(`Header`)}
                {generateSortingIndicator(column)}
              </div>
            </th>)}
          </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => <td style={{ textAlign: `center` }}
                  {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
