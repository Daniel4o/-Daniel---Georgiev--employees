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




employees.forEach(employee=> {
  employee["DateTo"] = employee["DateTo"] == "NULL" ?  Date.now() : employee["DateTo"]
  employee.duration = Math.round((new Date(employee["DateTo"])- new Date(employee["DateFrom"])) / (24*60*60*1000))
});
const groupById = Object.values(
  employees.reduce((r,o) => {
    (r[o["ProjectID"]] = r[o["ProjectID"]] || []).push(o);
    return r;
  }, {}));

  let result = {};
  let duration = 0;

/*   const countDays = employees.sort((employee1,employee2)=> {
    console.log(employee1);
    console.log(employee2);
  //  console.log(employee2["ProjectID"])
    if(employee1["ProjectID"] == employee2["ProjectID"]) {
      console.log("Passed first condition")
      let emp1StartDate = new Date(employee1["DateFrom"]);
      let emp2StartDate = new Date(employee2["DateFrom"]);

      let emp1EndDate = new Date(employee1["DateTo"]);
      let emp2EndDate = new Date(employee2["DateTo"]);

  

     console.log(`comapring employee1 start date${emp1StartDate} with employee2 end date ${emp2EndDate}`)
      if(emp1StartDate >= emp2StartDate) {
        console.log("Employee1 started later than or equal Emp2")
        if(emp1EndDate < emp2EndDate) {
          console.log("Emp1 started later and finished sooner")
          duration =  Math.round((emp1EndDate- emp1StartDate) / (24*60*60*1000))
        }
        console.log("Does this work? ")
        console.log(emp2EndDate)
        if(emp2EndDate > emp1StartDate) {
          console.log("Emp2 is working later than Emp1")
          duration =  Math.round((emp2EndDate- emp1StartDate) / (24*60*60*1000))
        }
      }
      
      if(emp2StartDate > emp1StartDate) {
        console.log("Passed second condition for employee2")
        if(emp2EndDate < emp1EndDate) {
          console.log("Emp2 is working later than Emp1")
          duration =  Math.round((emp2EndDate- emp2StartDate) / (24*60*60*1000))
        }
        if(emp1EndDate > emp2StartDate) {
          console.log("Emp1 is working later than or equal to Emp2")
          duration =  Math.round((emp2EndDate- emp1StartDate) / (24*60*60*1000))
        }
      }
    }
    }) */
    for(let i=0; i<employees.length-1; i++) {
      for(let j=i+1;j<employees.length; j++) {
        if(employees[i]["ProjectID"] == employees[j]["ProjectID"]) {
          console.log("Passed first condition")
          let emp1StartDate = new Date(employees[i]["DateFrom"]);
          let emp2StartDate = new Date(employees[j]["DateFrom"]);
    
          let emp1EndDate = new Date(employees[i]["DateTo"]);
          let emp2EndDate = new Date(employees[j]["DateTo"]);
    
      
    
          if(emp1StartDate >= emp2StartDate) {
            if(emp1EndDate < emp2EndDate) {
              let currDuration = Math.round((emp1EndDate- emp1StartDate) / (24*60*60*1000));

              if(currDuration > duration) {
                duration = currDuration;
                result = {employee1: employees[i]["EmpID"], employee2:employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration}
              }
            }

            if(emp2EndDate > emp1StartDate) {
              let currDuration =  Math.round((emp2EndDate- emp1StartDate) / (24*60*60*1000));

              if(currDuration > duration) {
                duration = currDuration;
                result = {employee1: employees[i]["EmpID"], employee2:employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration}
              }
            }
          }
          
          if(emp2StartDate > emp1StartDate) {
            if(emp2EndDate < emp1EndDate) {
              let currDuration = Math.round((emp2EndDate- emp2StartDate) / (24*60*60*1000));

              if(currDuration > duration) {
                duration = currDuration;
                result = {employee1: employees[i]["EmpID"], employee2:employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration}
              }
            }
            
            if(emp1EndDate > emp2StartDate) {
              let currDuration = Math.round((emp2EndDate- emp1StartDate) / (24*60*60*1000));
  
              if(currDuration > duration) {
                duration = currDuration;
                result = {employee1: employees[i]["EmpID"], employee2:employees[j]["EmpID"], projectID: employees[i]["ProjectID"], totalDays: duration}
              }

            }
          }
        } 
      }
    }

  console.log(duration);
  
  return (
    <div>
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
            <th>Employee ID #1</th>
            <th>Employee ID #2</th>
            <th>Project ID</th>
            <th>Days Worked</th>
          </tr>
        </thead>
        <tbody>
              <tr>
                   <td>{result.employee1}</td>
                   <td>{result.employee2}</td>
                   <td>{result.projectID}</td>
                <td>{result.totalDays}</td>
              </tr>
      
        </tbody>
      </table>
    </div>
  );
}

export default App;
