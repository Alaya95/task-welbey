import { useEffect, useState } from "react";
import "./App.css";
import { Pagination } from "./components/Pagination/Pagination";
import { SortingForm } from "./components/SortingForm/SortingForm";
import { Table } from "./components/Table/Table";
import data from "./data/data.json";

function App() {
  const [sortData, setSortData] = useState(data);
  const [renderData, setRenderData] = useState(sortData);
  const [sortConfig, setSortConfig] = useState({
    name: undefined,
    condition: undefined,
    argument: undefined,
  });

  const [pagesConfig, setPagesConfig] = useState({
    currentPage: 1,
    pageCount: Math.ceil(sortData.length / 10),
  });

  const onFilterSubmit = ({ name, condition, argument }) => {
    setSortConfig({ ...sortConfig, name, condition, argument });
  };

  const onResetHandle = () => {
    setSortData([...data]);
    setPagesConfig({ ...pagesConfig, currentPage: 1 });
  };

  const onChoosePageHandler = (currentPage) => {
    setPagesConfig({ ...pagesConfig, currentPage });
  };

  useEffect(() => {
    setPagesConfig({
      ...pagesConfig,
      pageCount: Math.ceil(sortData.length / 10),
    });
  }, [sortData]);

  useEffect(() => {
    const arraySpliting = {
      start:
        pagesConfig.currentPage === 1
          ? pagesConfig.currentPage - 1
          : (pagesConfig.currentPage - 1) * 10,
      end: pagesConfig.currentPage * 10,
    };
    setRenderData(sortData.slice(arraySpliting.start, arraySpliting.end));
  }, [pagesConfig]);

  useEffect(() => {
    if (sortConfig.name && sortConfig.condition && sortConfig.argument) {
      if (sortConfig.condition === "equal") {
        setSortData(
          data.filter((item) => item[sortConfig.name] == sortConfig.argument)
        );
      }
      if (sortConfig.condition === "contain") {
        setSortData(
          data.filter((item) =>
            item[sortConfig.name].toString().includes(sortConfig.argument)
          )
        );
      }
      if (sortConfig.condition === "greater") {
        setSortData(
          data.filter((item) => {
            if (sortConfig.name === "name") {
              return false;
            }
            return item[sortConfig.name] > +sortConfig.argument;
          })
        );
      }
      if (sortConfig.condition === "less") {
        setSortData(
          data.filter((item) => {
            if (sortConfig.name === "name") {
              return false;
            }
            return item[sortConfig.name] < +sortConfig.argument;
          })
        );
      }
    }
  }, [sortConfig]);

  return (
    <div className="App">
      <div className="page">
        <h1>Таблица </h1>
        <SortingForm filterSubmit={onFilterSubmit} onReset={onResetHandle} />
        <Table data={renderData} onReset={onResetHandle} />
        <Pagination
          currentPage={pagesConfig.currentPage}
          pageCount={pagesConfig.pageCount}
          onChoosePage={onChoosePageHandler}
        />
      </div>
    </div>
  );
}

export default App;
