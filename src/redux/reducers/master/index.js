// import axios from 'axios'
import configure from '@configs/configUrl'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getRoles = createAsyncThunk('master/getRoles', async () => {
    const response = await fetch(
        `${configure.API_BASE_URL}/v1/roles`
    )
    if (!response.ok) throw new Error("Something went wrong with fetching data")
    const data = await response.json()
    return {
      data
    }
})

export const getCategories = createAsyncThunk('master/getCategories', async () => {
    const response = await fetch(
        `${configure.API_BASE_URL}/v1/categories`
    )
    if (!response.ok) throw new Error("Something went wrong with fetching data")
    const data = await response.json()
    return {
      data
    }
})

export const getPriority = createAsyncThunk('master/getPriority', async () => {
    const response = await fetch(
        `${configure.API_BASE_URL}/v1/priorities`
    )
    if (!response.ok) throw new Error("Something went wrong with fetching data")
    const data = await response.json()
    return {
      data
    }
})

export const master = createSlice({
    name: 'master',
    initialState: {
      role_options: [],
      category_options: [],
      priority_options: []
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getRoles.fulfilled, (state, action) => {
            const options = []
            action.payload.data?.map((val) => {
                options.push({
                    value: val.id,
                    label: val.name
                })
            })
            state.role_options = options
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            const options = []
            action.payload.data?.map((val) => {
                options.push({
                    value: val.id,
                    label: val.name
                })
            })
            state.category_options = options
        })
        .addCase(getPriority.fulfilled, (state, action) => {
            const options = []
            action.payload.data?.map((val) => {
                options.push({
                    value: val.id,
                    label: val.name
                })
            })
            state.priority_options = options
        })
    }
})

export default master.reducer