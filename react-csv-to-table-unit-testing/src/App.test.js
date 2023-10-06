import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

//test('renders learn react link', () => {
 // render(<App />);
 // const linkElement = screen.getByText(/learn react/i);
 // expect(linkElement).toBeInTheDocument();
//});

describe("App Component", () => {
  test("Should render successfully", () => {
    const appComponent = render(<App />) // (<App />) e component html kinda render ity andulo unna elements ento check chaiyadaniki define chesey snapshot idi
    expect(appComponent).toMatchSnapshot() // to generate snapshot
  })

  test('Process CSV to Table', async () => {

    const FILE_CONTENT = `Name,Job
    Shaik, uI Engineer
    Shahul, DevOPS
    Hameed, React Developer`;

   const FILE_NAME = 'data.csv';

    const readAsTextMock = jest.fn();
    jest.spyOn(global, 'FileReader').mockImplementation(function () {
      const self = this;
      this.readAsText = readAsTextMock.mockImplementation(() => {
        self.onload({ target: { result: FILE_CONTENT } });
      });
    });

    const appComponent = render(<App />);
    const input = screen.getByTestId("inputFile"); //<element data-testid="inputFile" />
    expect(input).toBeInTheDocument();

 /*   const FILE_CONTENT = `Name,Job
    Shaik, uI Engineer
    Shahul, DevOPS
    Hameed, React Developer`;

   const FILE_NAME = 'data.csv';
*/
   const file = new File([FILE_CONTENT], FILE_NAME)

    fireEvent.change(input, {
      target: {
        files: [file]
      }
    })
   await waitFor(() => expect(screen.getByText("UI Engineer")).toBeInTheDocument())
    expect(appComponent).toMatchSnapshot();
  })
})








/* 

function getData() {
  fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(data => data.json())
  .then(userDetails => success(userDetails))
  .catch(errorDetails => error(errorDetails))
}

getData((user) => {
  console.log("user, user")
}, (error) => {
  console.log("error", error.message)
})



async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
  const userDetails = await response.json();
  return userDetails
}

const userDetails = getData()
console.log(userDetails)



*/