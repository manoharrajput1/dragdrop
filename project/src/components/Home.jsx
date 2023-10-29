import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false)

  const getdata = async (e) => {
    // e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/getdata')
      if (response.ok) {
        const data = await response.json();
        setLists(data)
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const ondragstart = (e, llist) => {
    // e.preventDefault()
    e.dataTransfer.setData('data', llist)
    console.log(llist);
  }
  const ondragend = async (e, listid, arrindex, index) => {
    e.preventDefault()
    try {
      const updatelist = lists
      await updatelist[arrindex].listitem.splice(index, 1)
      setLists(updatelist)
      if (loading) {
        setLoading(false)
      }
      else { setLoading(true) }
      console.log(listid);
      const response = await fetch('http://localhost:5000/deletelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ listid, index })
      })
      if (response) {
        console.log('completed')

      }


    } catch (error) {
      console.log(error);
    }

  }

  const ondragover = (e) => {
    e.preventDefault()
    console.log('dragging over');
  }

  const droped = async (e, list, index, listid) => {
    e.preventDefault()
    try {
      const datas = e.dataTransfer.getData('data')
      const updatelist = lists
      await updatelist[index].listitem.push(datas)
      console.log(updatelist);
      setLists(updatelist)
      if (loading) {
        setLoading(false)
      }
      else { setLoading(true) }
      console.log(listid);
      const response = await fetch('http://localhost:5000/updatelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ datas, listid, index })
      })
      if (response) {
        console.log('completed')

      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <>
      <div className='disp'>
        {lists && lists.map((list, arrindex) => (
          <div key={arrindex} className='disp2' onDragOver={ondragover} onDrop={(e) => droped(e, list, arrindex, list.id)}>
            <h4> List {list.id} </h4>
            {list.listitem && list.listitem.map((llist, index) => (
              <div key={index} >
                <div draggable className='disp3' onDragStart={(e) => ondragstart(e, llist)} onDragEnd={(e) => ondragend(e, list.id, arrindex, index)} ><br />
                  <input type='checkbox'></input><span >{llist}</span><br />
                </div>
                <hr />
              </div>
            ))}
          </div>
        ))}
        <div className='d'>
          <h6>Create Liist</h6>
          <Link className='textline' to='/createlist'> &#43; </Link>
        </div>
      </div>
    </>
  )
}

export default Home