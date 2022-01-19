import React, { useState, useEffect, useRef, useMemo } from "react";
import { Reimbursement } from "../entities/reimbursement";
import { User } from "../entities/user";
import { useTable } from "react-table";
import { useParams, useNavigate } from 'react-router-dom'
import { getAllReimbursements } from "../store/actions";

interface ReimbursementListProps {
  reimbursements: Reimbursement[];
  users: User[];
}

export default function ReimbursementList(props: ReimbursementListProps) {
  
  const navigate = useNavigate()
  let reimbursements = props.reimbursements;
  const users = props.users;

  /* const reimbursements = ( isManager ) ? 
  don't filter the reimbursements : 
  match userid with employeeid to filter the reimbursements */

  // const reimbursements = (isManager) ?
  // reimbursements :
  // reimbursements.filter(users.id === employeeId)

  function combineUserToReimbursement(
    users: User[],
    reimbursements: Reimbursement[]
  ) {
    let reimbursementList = [];
    reimbursements.map((reimbursement) => {
      const currentUser = users.find(
        (user) => user.id === reimbursement.employeeId
      );
      reimbursementList.push({
        ...reimbursement,
        name: `${currentUser.fname} ${currentUser.lname}`,
      });
    });
    return reimbursementList;
  }
  
  let data: any = useMemo(
    () => combineUserToReimbursement(users, reimbursements),
    [reimbursements]
  );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name",
      },
      // {
      //   Header: "Employee ID",
      //   accessor: "employeeId",
      // },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      // {
      //   Header: "Emp. Comment",
      //   accessor: "commentEmployee",
      // },
      // {
      //   Header: "Man. Comment",
      //   accessor: "commentManager",
      // },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (<>
    <br/><br/><br/>
    <button onClick={()=>navigate("add")}>Add Reimbursement</button>
    <br/><br/>
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    if(cell.column.id !== "id"){
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    }else{console.log(cell)
                      return (
                        <td {...cell.getCellProps()}>
                          <a href={`/reimbursements/${cell.value}`}>{
                            // Render the cell contents
                            cell.render("Cell")
                          }</a>
                        </td>
                      );
                    }
                    // Apply the cell props
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
    </>);
}


/*  when logging in check that the user logging in is either an employee or manager
  from there you will want to track by the user id to then only display that users reimbursments
  in the reimbursements list  */