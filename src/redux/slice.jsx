import { createSlice } from "@reduxjs/toolkit";


const loadState = ()=>{
    try{
        const load = localStorage.getItem('todo')
        const data = JSON.parse(load) ?? []

        return data
    }catch(error){
        alert(error)
    }
}


const saveState = (state)=>{
    try{
        localStorage.setItem('todo', JSON.stringify(state))
    }catch(error){
        alert(error)
    }
}

const todoSlice = createSlice({
    name:'todo',
    initialState : loadState(),
    reducers:{
        add: (state, action)=>{
            state = state.push(action.payload)
            saveState(state)
        },
        remove :(state, action)=>{
            state = state.filter(data=>data !== action.payload)
            console.log(state)
            window.location.reload()
            saveState(state)
        },
        edit:(state, action)=>{
            state = state.filter(data=>data!==action.payload.valToEdit)
            state.push(action.payload.data)
            saveState(state)
            window.location.reload()
        }
    }
})

export const {add, remove, edit} = todoSlice.actions
export default todoSlice.reducer