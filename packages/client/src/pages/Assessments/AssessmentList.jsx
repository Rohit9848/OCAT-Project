import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
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
    await AssessmentService.deleteAssessment(row._original.id);
    setAssessments((prevAssessments) =>
      prevAssessments.filter((assessment) => assessment.id !== row._original.id));
  };

  return (
    <div style={{ textAlign: `center` }}>
      <h3 style={{ display: `inline`, marginRight: `10px` }}>Cat Assessments List -</h3>
      <h4 style={{ display: `inline` }}>{instrumentType}</h4>
      <ReactTable
        data={assessments}
        columns={columns}
        defaultPageSize={10}
        pageSizeOptions={[ 5, 10, 16 ]}
        filterable={true}
      />
    </div>
  );

};
