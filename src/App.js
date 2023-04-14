import { Box, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useState } from "react";
import Papa from "papaparse";

function App() {

  const [employees, setEmployees] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        setEmployees(results.data);
      },
    });
  };

  let result = {};
  let duration = 0;
  let currDuration;

  for (let i = 0; i < employees.length - 1; i++) {
    for (let j = i + 1; j < employees.length; j++) {
      if (employees[i]["ProjectID"] == employees[j]["ProjectID"]) {

        let emp1StartDate = new Date(employees[i]["DateFrom"]);
        let emp2StartDate = new Date(employees[j]["DateFrom"]);

        let emp1EndDate = new Date(employees[i]["DateTo"]);
        let emp2EndDate = new Date(employees[j]["DateTo"]);

        if (emp1StartDate >= emp2StartDate) {
          if (emp1EndDate < emp2EndDate) {
            currDuration = Math.round((emp1EndDate - emp1StartDate) / (24 * 60 * 60 * 1000) + 1);

            if (currDuration > duration) {
              duration = currDuration;
              result = { employee1: employees[i]["EmpID"], employee2: employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration }
            }
          }

          if (emp2EndDate > emp1StartDate && emp1EndDate > emp2EndDate) {
            currDuration = Math.round((emp2EndDate - emp1StartDate) / (24 * 60 * 60 * 1000) + 1);

            if (currDuration > duration) {
              duration = currDuration;
              result = { employee1: employees[i]["EmpID"], employee2: employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration }
            }
          }

          if (emp2EndDate > emp1StartDate && emp2EndDate > emp1EndDate) {
            currDuration = Math.round((emp1EndDate - emp1StartDate) / (24 * 60 * 60 * 1000) + 1);

            if (currDuration > duration) {
              duration = currDuration;
              result = { employee1: employees[i]["EmpID"], employee2: employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration }
            }
          }
        }

        if (emp2StartDate > emp1StartDate) {
          if (emp2EndDate < emp1EndDate) {
            currDuration = Math.round((emp2EndDate - emp2StartDate) / (24 * 60 * 60 * 1000) + 1);

            if (currDuration > duration) {
              duration = currDuration;
              result = { employee1: employees[i]["EmpID"], employee2: employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration }
            }
          }

          if (emp1EndDate > emp2StartDate && emp2EndDate > emp1EndDate) {
            currDuration = Math.round((emp1EndDate - emp2StartDate) / (24 * 60 * 60 * 1000) + 1);

            if (currDuration > duration) {
              duration = currDuration;
              result = { employee1: employees[i]["EmpID"], employee2: employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration }
            }
          }

          if (emp1EndDate > emp2StartDate && emp1EndDate > emp2EndDate) {
            currDuration = Math.round((emp2EndDate - emp2StartDate) / (24 * 60 * 60 * 1000) + 1);

            if (currDuration > duration) {
              duration = currDuration;
              result = { employee1: employees[i]["EmpID"], employee2: employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration }
            }
          }
        }

      }
    }
  }

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />

      <Box sx={{ height: 520, width: '100%' }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow >
              <TableCell>Employee ID #1</TableCell>
              <TableCell>Employee ID #2</TableCell>
              <TableCell>ProjectID</TableCell>
              <TableCell>Days Worked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{result.employee1}</TableCell>
              <TableCell >{result.employee2}</TableCell>
              <TableCell >{result.projectID}</TableCell>
              <TableCell >{result.totalDays} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </div>
  );
}

export default App;
