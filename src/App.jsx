import React, { useEffect, useState } from 'react'
import List from "./List";
import Alert from "./Alert"

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  
  if(list) return JSON.parse(localStorage.getItem('list'));
  else return [];
}

const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      //display error
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      //deal with edit
      setList(list.map((item) => {
        if(item.id === editID) {
          return {...item, title:name}
        }

        return item;
      }))

      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      //add item to list
      showAlert(true, 'success', 'item added to list')
      const newItem = { id: new Date().getTime().toString(), title: name }

      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg})
  }


  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');

    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])


  return (
    <section className='flex flex-col border-2 p-4 h-max items-center'>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 className='text-3xl font-bold text-center my-4'>Task/List App</h3>
        <div>
          <input 
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder='Cheese Cake'
            className='border-2 py-1 px-2'
          />
          <button 
            className='bg-blue-700 text-white px-4 py-1 m-2 font-bold'
          >
            {isEditing ? 'Edit' : 'Add Item'}
          </button>
        </div>
      </form>
      {
        list.length > 0 &&
        <div className='w-full flex flex-col mt-8 mb-4'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button 
            onClick={clearList}
            className='bg-red-400 text-red-800 font-bold mt-8 py-2'
          >
            Clear List
          </button>
        </div>
      }
    </section>
  )
}

export default App