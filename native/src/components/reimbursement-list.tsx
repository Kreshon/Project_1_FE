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
  const users = props.users;

  let isManager
  if(sessionStorage.getItem("isManager")){isManager = sessionStorage.getItem("isManager")}
  if(isManager === "true"){
      isManager = true;
  }else{
      isManager = false;
  }

  const reimbursements = (isManager) ?
  props.reimbursements :
  props.reimbursements.filter(reimbursement => sessionStorage.getItem("id") === reimbursement.employeeId)
  

  function combineUserToReimbursement(// adding employee names to the list of reimbs
    users: User[],
    reimbursements: Reimbursement[]
  ) {
    let reimbursementList: { name: string; id: string; employeeId: string; amount: number; status: string; commentEmployee: string; commentManager: string; file?: string | undefined; }[] = [];// 35 creating an empty aray called reimbursement list
    reimbursements.map((reimbursement) => {// 36 goes through existing list of reimbs
      const currentUser = users.find(// 37,38 finding the user that has an ID that matches the Employee ID on the current reimb
        (user) => user.id === reimbursement.employeeId
      );
      reimbursementList.push({// 40,41,42, adds reimbs information and the name of the employee into the reimb array 
        ...reimbursement,
        name: `${currentUser?.fname} ${currentUser?.lname}`,
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
    <button className="button" onClick={()=>navigate("add")}>Add Reimbursement</button>
    <br/><br/>
    <table className="table" {...getTableProps()}>
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
                  <th className="tHead" {...column.getHeaderProps()}>
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
                        <td className="tData" {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    }else{
                      return (
                        <td className="tData" {...cell.getCellProps()}>
                          <a className="detailLink" href={`/reimbursements/${cell.value}`}>{
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
