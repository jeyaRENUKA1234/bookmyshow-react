import { createSlice } from "@reduxjs/toolkit";
import  {SnacksName} from "../snacksdetail";

const Snacks=createSlice({
    name:"Snacks",
    initialState:{
        SnacksDetails:SnacksName,
        
    },
    reducers:{
      
    }
})

export default  Snacks.reducer;