import React from 'react';
import { DataGrid } from '@material-ui/data-grid';



 function Table({rows , columns}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}

export default Table
