import Appbar from "./components/Appbar";
import PDFViewer from "./components/PDFViewer";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Appbar />
      <PDFViewer />
    </div>
  );
};

export default App;
