import Appbar from "./components/Appbar";
import PDFViewer from "./components/PDFViewer";
import Mindmap from "./components/Mindmap";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Appbar />
      {/* <PDFViewer /> */}
      <Mindmap />
    </div>
  );
};

export default App;
