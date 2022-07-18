import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Search from "./components/Search";
import Modal from "./components/Modal";
import AppContext from "./context/AppContext";
import useManageData from "./context/useManageData";
import Pagination from "./components/Pagination";

function App() {
  const state = useManageData();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  return (
    <AppContext.Provider value={state}>
      <div className="App">
        <Header />
        <Search />
        <Main setModal={setModalOpen} setModalData={setModalData} />
        {modalOpen && (
          <Modal setOpenModal={setModalOpen} modalData={modalData} />
        )}
        <Pagination />
      </div>
    </AppContext.Provider>
  );
}

export default App;
