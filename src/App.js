import Appbar from "./components/Appbar";
import PDFViewer from "./components/PDFViewer";
import Mindmap from "./components/Mindmap";
import Chatbar from "./components/Chatbar";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Appbar />
      <div className="main-container">
        <PDFViewer />
        {/* <Mindmap /> */}
        <Chatbar />
      </div>
    </div>
  );
};

export default App;
