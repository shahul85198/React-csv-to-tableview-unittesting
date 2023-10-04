export const getFileExtension = (filename = "") => { // file = {name: "student information - sheet1.csv", size: 161}
    const fileTextSplit = filename.split(".")  // ["student information - sheet1", "csv"]
    return fileTextSplit[fileTextSplit.length - 1]; // csv
  };
  
  
  
  export const isCSVFile = (file) => {  // file = {name: "student information - sheet1.csv", size: 161}
    return getFileExtension(file.name) === "csv"
    // getFileExtension("student information - sheet1.csv")
    // 'csv' === 'csv'
  }
  
  
  
  export const getFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
    reader.onload = (event) => {
      const {result} = event.target;
      resolve(result)
    }
      reader.onerror = (event) => {
        reject(event.target.error)
      }
      reader.readAsText(file)
    })
  };
  
  
  
  
  export const getFileContentByCallback =
    (file, onFileContentSuccess, onFileContentError) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const {result} = event.target;
      onFileContentSuccess(result);
    }
    reader.onerror = (event) => {
      onFileContentError(event.target.error)
    };
    reader.readAsText(file);
  }
  
  
  
  
  export const convertCsvToJSON = (csvData) => {
    const [headerLine, ...dataLines] = csvData.split('\n');
    const headers = replaceCommasInLine(headerLine)
      .split(",")
      .map((word) => replaceChars(word));
    const data = dataLines.map((line) => {
      return replaceCommasInLine(line)
        .trim()
         .split(',')
         .map((word) => replaceChars(word)); //'shahul'
    });
    return {
      headers,
      data
    }
  }
  // trim is used to clear spaces in starting and ending
  
  export const replaceChars = (word) => 
    word.replaceAll("@@@", ',').replaceAll('"', '').trim();
  
  
  
  export const replaceCommasInLine = (lineString) => {
    const quotesPositions = [];
    for(let i=0; i < lineString.length; i++) {
      if(lineString[i] === '"') {
        quotesPositions.push(i)
      }
    }
    //const words = [];
    const commanIndexes = [];
    for(let i=0; i < quotesPositions.length / 2; i++) { 
      const startIndex = quotesPositions[i*2];
      const endIndex  = quotesPositions[i*2 + 1]
      const word = lineString.substring(startIndex, endIndex + 1);
      word.split("").forEach((char, index) => {
        if(char === ",") {
          commanIndexes.push(index + startIndex);
  }
      });
    }
    
   const chars = [...lineString];
    commanIndexes.forEach((index) => {
      chars[index] = "@@@";
    })
    return chars.join('').trim();
  }
  
  
  
  // getFileContent(file).then(result) => {}
  /*
  [1,2,3,4,5,6,7]
  
  var words = []
  for(let i=0; i < wordIndexes.length/2; i++) {
  const firstIndex = (i*2);
  const secondIndex = (i*2) + 1;
    words.push([wordIndexes[firstIndex], wordIndexes[secondIndex]])
  }
  
          // words
        // [[1,2] ,[3,4],[5,6]]
  
  
  
  */