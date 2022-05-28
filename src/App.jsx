import "./App.css";
import * as XLSX from "xlsx";

function App() {
  let sheet1,
    sheet2,
    average = [];

  const readExcel = async (file, no) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        if (no == 1) {
          sheet1 = XLSX.utils.sheet_to_json(ws);
        } else {
          sheet2 = XLSX.utils.sheet_to_json(ws);
        }
      };
    } catch (err) {
      console.log(err);
    }
  };

  const submit = async () => {
    sheet1.forEach((element, index) => {
      average.push({ value: (element.value / sheet2[index].value) * 100 });
    });

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(average);

    XLSX.utils.book_append_sheet(wb, ws, "Average");
    XLSX.writeFile(wb, "Average_Excel.xlsx");
  };

  return (
    <div className="input-group mb-3 mt-5 mx-auto">
      <div className="mx-5">
        <label>Sheet 1</label>
        <input
          type="file"
          className="form-control mb-3"
          id="inputGroupFile03"
          aria-describedby="inputGroupFileAddon03"
          aria-label="Upload"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file, 1);
          }}
        />
        <label>Sheet 2</label>
        <input
          type="file"
          className="form-control mb-3"
          id="inputGroupFile03"
          aria-describedby="inputGroupFileAddon03"
          aria-label="Upload"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file, 2);
          }}
        />
        <button type="button" className="btn btn-primary" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
