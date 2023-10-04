import {getFileExtension} from './utils';

describe("Utils Test", () => {

  it("Should return filename extension", () => {
    const htmlFile = 'index.html';
    const cssFile = 'style.css';
    const csvFile = 'data.csv';

    const htmlExtension = getFileExtension(htmlFile);
    expect(htmlExtension).toEqual('html')

    const files = [
      {name: csvFile, extension: 'csv'},
      {name: csvFile, extension: 'csv'},
    ]

    files.forEach(file => {
      expect(getFileExtension(file.name)).toEqual(file.extension)
    })
  })

  it('Should return undefined for file without name', () => {
    
  })
})