import React, { useState, useRef } from 'react';
import { bulma } from 'bulma';

export default function App() {
  const refChore = useRef();
  const refSearch = useRef();
  const [ chores, setChores ] = useState([
      "Go to the store",
      "Wash the dishes",
      "Learn some code"
  ]);
  const addItem = (evt) => {
    evt.preventDefault();

    const newItem = refChore.current.value;
    const form = document.getElementById('addItemForm');
    if (newItem) {
      setChores(chores => chores.concat(newItem));
      // console.log(`chores::${JSON.stringify(chores)}`);
      refChore.current.value = "";
      refChore.current.classList.remove("is-danger");
      form.reset();
    } else {
      refChore.current.classList.add("is-danger");
    }
  };
  const remItem = indx => {
    setChores(chores.filter((chore, cidx) => indx !== cidx));
  };
  const handleSearch = (evt) => {
    evt.preventDefault();
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
                 onClick={ handleSearch }
          />
          <ul>
            { chores.map( (item, indx) => (
              <li key={ indx }>
                { item } &nbsp;&nbsp;
                <span className="delete"
                      onClick={() => remItem(indx)}
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
                   ref={ refChore }
                   placeholder="-- add a chore --"
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