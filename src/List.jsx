import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className='mx-4'>
      {
        items.map((item) => {
          const { id, title } = item;
          return (
            <article key={id} className='flex justify-between p-2 my-1 bg-blue-100'>
              <p className='font-semibold'>{title}</p>

              <div>
                <button
                  type='button'
                  onClick={() => editItem(id)}
                  className='text-lg m-1 text-blue-700'
                >
                  <FaEdit />
                </button>

                <button
                  type='button'
                  onClick={() => removeItem(id)}
                  className='text-lg m-1 text-red-700'
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          )
        })
      }
    </div>
  )
}

export default List