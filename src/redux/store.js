import { configureStore } from "@reduxjs/toolkit";
import detailSlice from "./detailSlice";
 import theatreScreenSlice from "./theatreScreenSlice";
 import Snacks from "./slice"

export const store = configureStore({
    reducer : {
     detail : detailSlice ,
     screen : theatreScreenSlice,
     allDetail:Snacks,
    }
})