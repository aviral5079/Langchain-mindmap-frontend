import Appbar from "./components/Appbar";
import MainPage from "./pages/MainPage";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Appbar />
      <MainPage />
    </div>
  );
};

export default App;
