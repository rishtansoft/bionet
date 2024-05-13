import React from 'react';
import { Table } from 'components/ui';
import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const TableData = (props) => {
  const { columns, data } = props;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                >
                  {column.render('Header')}
                  {index > 0 && (
                    <span>
                      <Sorter sort={column.isSortedDesc} />
                    </span>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, index) => {
                  return (
                    <Td {...cell.getCellProps()} key={index}>
                        {
                            index == 0 && props.redirectTo && <Link to = {`${props.redirectTo}/${row.original.id}`}>
                                {cell.render('Cell')}
                            </Link>
                        }

                        {
                            (index != 0 || !props.redirectTo) && cell.render('Cell')
                        }
                      
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </>
  );
};

export default TableData;
