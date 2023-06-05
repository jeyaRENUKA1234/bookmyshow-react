import { createSlice } from "@reduxjs/toolkit";
import {Moviedetails} from '../mydata';
import  {SnacksName} from "../snacksdetail";

const detailSlice = createSlice({
    name : 'movies',
    initialState : {
        detail : Moviedetails,
        SnacksDetails:SnacksName,
        seat:[],
    },
    reducers : {
        detailPage : (state, action) => {
            console.log(action);
            state.detail = action.payload;
        },
        seating : (state, action) => {
            console.log(action);
            state.seat = action.payload
        }
    }
})
 export const {detailPage, seating} =  detailSlice.actions;
export default detailSlice.reducer;