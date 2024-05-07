// import axios from 'axios'
import configure from '@configs/configUrl'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const addZero = (n) => {
  return n < 10 ? `0${n}` : n
}

export const getTickets = createAsyncThunk('ticketManagement/getTickets', async (params) => {
  // console.log(params.payload.startDate)
    const start = new Date(params.payload.startDate)
    const end = new Date(params.payload.endDate)
    const start_date = `${start.getFullYear()}-${addZero(start.getMonth()+1)}-${addZero(start.getDate())}`
    const end_date = `${end.getFullYear()}-${addZero(end.getMonth()+1)}-${addZero(end.getDate())}`
    // console.log(start_date)
    const response = await fetch(
        `${configure.API_BASE_URL}/v1/get-tickets`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            start_date,
            end_date,
          })
        }
    )
    if (!response.ok) throw new Error("Something went wrong with fetching data")
    const data = await response.json()
    return {
      data
    }
})

export const apiCreateTicket = createAsyncThunk('ticketManagement/apiCreateTicket', async (params) => {
    // console.log(params)
    const post_data_form = new FormData();

    post_data_form.append("customer_name", params?.payload?.name);
    post_data_form.append("customer_phone_number", params?.payload?.phoneNumber);
    post_data_form.append("customer_email", params?.payload?.email);
    post_data_form.append("category_id", params?.payload?.category);
    post_data_form.append("description", params?.payload?.description);

    const response = await fetch(
        `${configure.API_BASE_URL}/v1/tickets`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: post_data_form
        }
    )
    if (!response.ok) throw new Error("Something went wrong with fetching data")
    const data = await response.json()
    return {
      data
    }
})

export const getDataTicket = createAsyncThunk('ticketManagement/getDataTicket', async (params) => {
  const response = await fetch(
      `${configure.API_BASE_URL}/v1/tickets/${params.uuid}`
  )
  if (!response.ok) throw new Error("Something went wrong with fetching data")
  const data = await response.json()
  return {
    data
  }
})

export const apiUpdateTicket = createAsyncThunk('ticketManagement/apiUpdateTicket', async (params) => {
  const response = await fetch(
      `${configure.API_BASE_URL}/v1/update-tickets/${params.data.uuid}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category_id: params.data.category_id,
          priority_id: params.data.priority_id,
          user_id: params.data.user_id,
          response: params.data.response
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

export const apiRaiseTicket = createAsyncThunk('ticketManagement/apiRaiseTicket', async (params) => {
  const response = await fetch(
      `${configure.API_BASE_URL}/v1/raise-tickets/${params.data.uuid}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category_id: params.data.category_id,
          priority_id: params.data.priority_id,
          user_id: params.data.user_id,
          response: params.data.response
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

export const apiResolvedTicket = createAsyncThunk('ticketManagement/apiResolvedTicket', async (params) => {
  const response = await fetch(
      `${configure.API_BASE_URL}/v1/resolved-tickets/${params.data.uuid}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category_id: params.data.category_id,
          priority_id: params.data.priority_id,
          user_id: params.data.user_id,
          response: params.data.response
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

export const ticketManagement = createSlice({
    name: 'ticketManagement',
    initialState: {
      data: [],
      dataTicket: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getTickets.fulfilled, (state, action) => {
            state.data = action.payload.data
        })
        .addCase(getDataTicket.fulfilled, (state, action) => {
          state.dataTicket = action.payload.data
      })
        // .addCase(getDataUser.fulfilled, (state, action) => {
        //     state.dataUser = action.payload.data
        // })
        // .addCase(createUser.fulfilled, (state, action) => {
        //     state.data = action.payload.data
        // })
    }
})
  
// export const { saveUser } = userManagement.actions

export default ticketManagement.reducer