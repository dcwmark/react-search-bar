import React, { useEffect, useState, useRef } from 'react';
import { bulma } from 'bulma';

export default function App() {
  const refEmployee = useRef();
  const refSearch = useRef();
  const [ employees, setEmployees ] = useState([
      "Parker Green",
      "Charlie Green",
      "Alex Stevens",
      "Avery Scott",
      "Riley Miller",
      "Jordan Richards"
  ]);
  const [ filtered, setFiltered ] = useState([]);

  useEffect( () => {
    setFiltered(employees);
  }, [employees]);

  const addItem = (evt) => {
    evt.preventDefault();

    const newIndvidual = refEmployee.current.value;
    const form = document.getElementById('addItemForm');
    if (newIndvidual) {
      setEmployees([...employees, newIndvidual]);
      refEmployee.current.value = "";
      refEmployee.current.classList.remove("is-danger");
      form.reset();
    } else {
      refEmployee.current.classList.add("is-danger");
    }
  };

  const remItem = item => {
    setEmployees(employees.filter( employee => employee !== item));
    refSearch.current.value = "";
  };

  const handleSearch = (evt) => {
    evt.preventDefault();

    const query = refSearch.current.value.toLowerCase();
    if (!query) {
      setFiltered(employees);
    } else {
      setFiltered(employees.filter(
        employee => employee.toLowerCase().includes(query)
    ));
    }
  }

  return (
    <div className="content">
      <div className="container">
        <section className="section">
          <input className="input"
                 id="searchChores"
                 data-testid="searchChores"
                 type="input"
                 ref={ refSearch }
                 placeholder="Search ..."
                 onChange={ handleSearch }
          />
          <ul>
            { filtered.map( (item, indx) => (
              <li key={ indx }>
                { item }&nbsp;&nbsp;
                <span className="delete"
                      onClick={() => remItem(item)}
                />
              </li>
            ))}
          </ul>
        </section>
        <hr/>
        <section className="section">
          <form className="form"
                id="addItemForm"
                data-testid="addItemForm">
            <input className="input"
                   id="addInput"
                   data-testid="addInput"
                   type="input"
                   ref={ refEmployee }
                   placeholder="-- add an employee --"
            />
            <br /><br />
            <button className="button is-info"
                    onClick={ addItem }>
              Add Item
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
