import React, { useState, useEffect } from 'react';
import { Table } from 'components/ui';
import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const TableData = (props) => {
  const { columns, data, is_location } = props;
  const [location, setlocation] = useState(4);

  useEffect(() => {
    setlocation(is_location)
  }, [is_location]);

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
                    <Td {...cell.getCellProps()} key={index} style={{
                      background: index == location && (row?.original?.arrivalsCountPercent <= 20 ? '#e55c5c' : row?.original?.arrivalsCountPercent > 20 &&
                        row?.original?.arrivalsCountPercent <= 60 ? "#e5d85c" : row?.original?.arrivalsCountPercent > 60 ? '#52be4e' : '#e55c5c'),
                    }}>

                      {
                        index == 1 && props.redirectTo && <Link to={`${props.redirectTo}/${row.original.id}`}>
                          {cell.render('Cell')}
                        </Link>
                      }

                      {
                        index == location && props.redirectTo && <p
                          style={{
                            background: row?.original?.arrivalsCountPercent <= 20 ? '#e55c5c' : row?.original?.arrivalsCountPercent > 20 &&
                              row?.original?.arrivalsCountPercent <= 60 ? "#e5d85c" : row?.original?.arrivalsCountPercent > 60 ? '#52be4e' : '#e55c5c',
                            textAlign: 'center',
                            color: '#fff'
                          }}
                        >
                          {row?.original?.arrivalsCountPercent == null ? '-' : row?.original?.arrivalsCountPercent}
                        </p>
                      }

                      {
                        ((index != 1 && index != location) || !props.redirectTo) && cell.render('Cell')
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
