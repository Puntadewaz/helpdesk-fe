import axios from 'axios'
import configure from '@configs/configUrl'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getUsers = createAsyncThunk('userManagement/getUsers', async () => {
    const response = await fetch(
        `${configure.API_BASE_URL}/v1/users`
    )
    if (!response.ok) throw new Error("Something went wrong with fetching data")
    const data = await response.json()
    return {
      data
    }
})

export const apiCreateUser = createAsyncThunk('userManagement/apiCreateUser', async (params) => {
    // console.log(params)
    const response = await fetch(
        `${configure.API_BASE_URL}/v1/users`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params.newUser)
        }
    )
    if (!response.ok) throw new Error("Something went wrong with fetching data")
    const data = await response.json()
    return {
      data
    }
})

export const apiUpdateUser = createAsyncThunk('userManagement/apiUpdateUser', async (params) => {
  const response = await fetch(
      `${configure.API_BASE_URL}/v1/users/${params.data.uuid}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: params.data.password,
          role_id: params.data.role_id,
          kuota_assigned: params.data.kuota_assigned
        })
      }
  )
  // console.log(response)
  if (!response.ok) throw new Error("Something went wrong with fetching data")
  const data = await response.json()
  return {
    data
  }
})

export const getDataUser = createAsyncThunk('userManagement/getDataUser', async (params) => {
  const response = await fetch(
      `${configure.API_BASE_URL}/v1/users/${params.uuid}`
  )
  if (!response.ok) throw new Error("Something went wrong with fetching data")
  const data = await response.json()
  return {
    data
  }
})

export const userManagement = createSlice({
    name: 'userManagement',
    initialState: {
      data: [],
      dataUser: {},
      user_options: []
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.data = action.payload.data
            const options = [{value: "", label: "All Agent"}]
            action.payload.data.map((val) => {
              options.push({value: val.id, label: val.username.toUpperCase()})
            })
            state.user_options = options
        })
        .addCase(getDataUser.fulfilled, (state, action) => {
            state.dataUser = action.payload.data
        })
        // .addCase(createUser.fulfilled, (state, action) => {
        //     state.data = action.payload.data
        // })
    }
})
  
// export const { saveUser } = userManagement.actions

export default userManagement.reducer