import {Button, Container, List, ListItem, ListItemSecondaryAction, ListItemText, TextField} from '@mui/material'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, remove, edit } from './redux/slice'
function App() {

  const dispatch = useDispatch()
  const state = useSelector(data=>data.todo)

  const [data, setData] = useState('')
  const [valToEdit, setValToEdit] = useState('')
  const [search, setSearch] = useState('')
  const [editVal, setEditVal] = useState(false)

  const handleSubmit = ()=>{
    if(Array.isArray(state)){

      if(editVal){
        dispatch(edit({data, valToEdit}))
        alert(`Successfully edited ${data}`)
        setEditVal(false)
      }else{
        if(data == ''){
          alert("please provide a value")
          return
        }
      
        const check = state.find(d=>d==data)
        if(check){
          alert('Item already exists')
          return
        }
    
        if(check == ''){
          alert('please provide a valid data')
        }
    
    
        dispatch(add(data))
        alert('success')
        setData('')
      }
    }
  }

  console.log(state)

  const handleEdit = (data)=>{
    setData(data)
    setValToEdit(data)
    setEditVal(true)
  }

  const handleDelete = (data)=>{
      if(data === ''){
        alert('please provide a valid data')
        return
      }

      dispatch(remove(data))
      alert(`successfully deleted ${data}`)
  }
  let filteredData = []

  if(Array.isArray(state) && state.length !== 0){
    filteredData = state.filter(data=>data.includes(search))
  }
  

  return (
    <>
      <Container
      sx={{
        display:'flex',
        flexDirection:'column',
        maxWidth:400,
        padding:'34px',
        boxShadow:2,
        borderRadius:1
      }}>
        <div className='d-flex' style={{marginBottom:'12px'}}>
          <TextField label="search here..." onChange={(e)=>setSearch(e.target.value)} sx={{width:150}}/>
        </div>
        <TextField value={data} label='Write here..' onChange={(e)=>setData(e.target.value)}/>
        <Button variant='outlined' sx={{
          width:100,
          backgroundColor:'black'
        }} onClick={handleSubmit}>Add</Button>

        {
          filteredData.length > 0 ? filteredData.map((data, index)=>(
            <>
            <List key={index}>
              <ListItem sx={{borderStyle:'solid', borderWidth:1, borderColor:'lightgray', boxShadow:2}}>
                <ListItemText>{data}</ListItemText>
                <ListItemSecondaryAction>
                  <Button variant='outlined' onClick={()=>handleEdit(data)} sx={{backgroundColor:'lightgreen'}}>Edit</Button>
                  <Button variant='outlined' onClick={()=>handleDelete(data)} sx={{backgroundColor:'red', color:'white', marginLeft:1}}>Delete</Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            </>
          )) : (
            <>
            <h1 className='text-center'>No data Found</h1>
            </>
          )
        }
        
      </Container>
    </>
  )
}

export default App
