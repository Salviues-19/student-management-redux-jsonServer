import {createSlice} from '@reduxjs/toolkit';

const studentSlice = createSlice({
    name:"students",
    initialState:[],
    reducers:{
        addStudent:(state, action)=>[...state, action.payload],
        deleteStudent:(state, action)=>{
            return state.filter(s=>s.id !==action.payload)
        },

        updateStudent:(state, action)=>{
            const index = state.findIndex(s=>s.id === action.payload.id)
            state[index] = action.payload
        },

        setStudents:(state, action)=>{
            return action.payload
        }

    }

})

export const{setStudents, addStudent, deleteStudent, updateStudent} = studentSlice.actions;
export default studentSlice.reducer;