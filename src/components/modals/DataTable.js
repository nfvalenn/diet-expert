// src/components/modals/DataTable.js
import React from 'react';
import { useTable } from 'react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DataTable = ({ data = [], columns = [], onEdit, onDelete }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  if (!data || !columns) {
    return <div>Error: Data or columns are missing.</div>;
  }

  return (
    <table {...getTableProps()} className="w-full text-left border-collapse">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="border p-2">{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="border p-2">{cell.render('Cell')}</td>
              ))}
              <td className="border p-2 text-center">
                <button 
                  onClick={() => onEdit && onEdit(row.original)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => onDelete && onDelete(row.original.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
