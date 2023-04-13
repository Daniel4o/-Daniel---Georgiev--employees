import logo from './logo.svg';
import './App.css';

import "./App.css";
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

const diff = employees.map(employee=>new Date(employee["DateTo"]).getTime())
console.log(diff)
  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>EmpId</th>
            <th>ProjectId</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((value, index) => {
            return (
              <tr key={index}>
                   <td key={index}>{value["DateFrom"]}</td>
               
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
