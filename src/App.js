import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Search from "./components/Search";
import AppContext from "./context/AppContext";
import useManageData from "./context/useManageData";

function App() {
  const state = useManageData();
  return (
    <AppContext.Provider value={state}>
      <div className="App">
        <Header />
        <Search />
        <Main />
      </div>
    </AppContext.Provider>
  );
}

export default App;
