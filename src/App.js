import React, { useState } from 'react';
import './App.css';
import InputBox from './InputBox';
import garbageSvg from './garbage.svg';

function App() {
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState({
    id: null,
    name: '',
    completed: false,
  });

  function handleChange(event) {
    const newDraft = {
      id: todos.length,
      name: event.target.value,
      completed: false,
    };
    setDraft(newDraft); // prevente a pagina de ir para o estagio inicial. Fica dando refresh.
  }
  //essa parte é pra fazer a copia // ... it takes everithing to the object
  function handleSubmit(event) {
    const newTodos = [draft, ...todos]; //Making a copy//...=it will take everything//
    setDraft({ id: null, name: '', completed: false });
    setTodos(newTodos);
    event.preventDefault();
  }

  function deleteTodo(id) {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }
  return (
    <div className="App">
      <h1> Todo List</h1>

      <form id="todo-form" onSubmit={handleSubmit}>
        <InputBox
          className="inputbox"
          onChange={handleChange}
          value={draft.name}
        />
        <button className="Add">Add</button>
        <p className="p"> Your List:</p>

        <div>
          {/* Map estava retornando o bloco de codigo inteiro duas vezes, por isso que quando a tirava add novos itens */}
          {/* map gives you the possibility to change the objects */}
          {todos.map(todoInList => {
            return (
              <div
                // style={{ border: '1px solid grey', marginBottom: '20px' }}
                key={todoInList.id}
              >
                <div className="list">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={todoInList.completed}
                    // The "newTodos" is only avalible in just a short parte of the code
                    onChange={() => {
                      setTodos(
                        // setting a loop with map - looping over
                        // "..."
                        todos.map(todo => {
                          const newTodo = { ...todo };
                          if (todo.id === todoInList.id) {
                            if (todo.completed === true) {
                              newTodo.completed = false;
                            } else {
                              newTodo.completed = true;
                            }
                          }
                          return newTodo;
                        }),
                      );
                    }}
                  />

                  {todoInList.name}
                  <button
                    className="X"
                    onClick={() => deleteTodo(todoInList.id)}
                  >
                    <img src={garbageSvg} />
                  </button>
                </div>

                {/* {todoInList.name} */}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}

export default App;

// deleteItem(key){
//   const filterTodos = this.state.filter(todos => todos.key!==key); this.setState({
//     todos:filteredItens
//   })
// }

// const handleChange = event => {
//   const newDraft = {
//     ...draft,
//     name: event.target.value,
//   };
//   setDraft(newDraft);
// };

// function handleSubmit(event) {
//   idGenerator = idGenerator + 1;
//   const newDraft = {
//     ...draft,
//     id: idGenerator,
//   };
//   const newTodos = [newDraft, ...todos];
//   setTodos(newTodos);
//   setDraft({
//     id: null,
//     name: '',
//     completed: false,
//   });
//   event.preventDefault();
// }

// é um valor global, por isso tem que estar fora do componente. Esse valor vai ser modificado. (O programador é responsavel pelo valor)
// let idGenerator = 0;
