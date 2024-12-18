import { createSlice } from "@reduxjs/toolkit";
const jobSlice=createSlice(
    {
        name:"job",
        initialState:{
            allJobs:[],
            singleJob:null,
            searchedQuery:""
      },
      reducers:{
        setAllJobs:(state,action)=>
        {
state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>
{
state.singleJob=action.payload;
},
setSearchQuery:(state,action)=>
  {
  state.searchedQuery=action.payload;
  },
    }}
);

export const {setAllJobs,setSingleJob,setSearchQuery}=jobSlice.actions;
export default jobSlice.reducer;