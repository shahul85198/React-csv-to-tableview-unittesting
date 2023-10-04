import './App.css'
import React, {useCallback, useMemo, useState} from 'react';
import {isCSVFile, /*getFileContentByCallback,*/ getFileContent, convertCsvToJSON} from './utils'
//import {CsvToHtmlTable} from 'react-csv-to-table';

export default function App() {

  const [fileError, setFileError] = useState(false);
  const [csvData, setCsvData] = useState(null)

const onFileChange = useCallback((event) => {
 const file = event.target.files[0];
  const isValidcsvFile = isCSVFile(file); 
  setFileError(!isValidcsvFile)
  console.log(file)

  if(isValidcsvFile) {
  getFileContent(file)
    .then((fileData) => {
     setCsvData(fileData)
  })
    .catch((fileError) => console.log(":: ERROR READING FILE ::", fileError)
  );
  }

/*  getFileContentByCallback(file,
  (fileData) => console.log(":: Callback based result ::", fileData), (fileError) => console.log(":: ERROR READING FILE ::", fileError)
  );
  */
  

/*  const reader = new FileReader();
  reader.onload = function(event) {
   
    //const fileData = event.target.result;
    //            (or)
    const {target: {result}} = event;
    console.log(result)
  }
  reader.readAsText(file);
  */
}, [])

  const {headers, data} = useMemo(() => {
    if(!csvData) {
      return {headers: [], data: [],}
    }
/*
    const fileLines = csvData.split('\n');
   // console.log(":: FILE LINES ::", fileLines);
    const [firstLine, ...remainingLines] = fileLines;
   const fileHeaders = firstLine.split(",")
*/

  return convertCsvToJSON(csvData)
  
  }, [csvData])

  console.log("headers and data", {headers, data})
  
  return (
    <main>
    <h1>CSV TO Table</h1>
      <p>Please upload <strong>.csv</strong> to see some magic happen</p>

      {fileError && <p style={{color: 'red'}}>Please provide correct .csv file</p>}

      <input 
     data-testid="inputFile" type="file" accept=".csv" onChange={onFileChange}></input>

      {/*{csvData && <CsvToHtmlTable data={csvData} csvDelimiter=","/>} */}

      <table border="1">
      <thead>
       <tr>
         {headers.map(header => (
              <th key={header}>{header}</th>))}
       </tr>
      </thead>
      <tbody>
        {data.map((columns, idx) => (
           <tr key={idx}>
          {columns.map((column) => (
        <td key={column}>{column}</td>
          ))}
        </tr>))}
      </tbody>
        
      </table>
      
    </main>
  )
}

// coma seperated files

/**
          split  method

   "shahul.hameed.csv".split()
   // ["shahul.hameed.csv"]

   "shahul.hameed.csv".split("")
   //['s','h','a','h','u','l','h','a','m','e','e','d']

   "shahul.hameed.csv".split(".")
   //['shahul', 'hameed','csv']

  // vaaka array lo last item acces chaiyali anty .length apply chesi -1  chesty vastundi
  
  var filenames = "today.csv".split(".")
   filenames[filenames.length - 1]
   // csv

    var filenames = "today.data.studentscsv".split(".")
     filenames[filenames.length - 1]
     //csv
*/






/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/