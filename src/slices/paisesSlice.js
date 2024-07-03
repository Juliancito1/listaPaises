import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    paises: [],
    status: "idle",
    error: null,
    pais: {},
}

export const getPaises = createAsyncThunk('paises/getPaises', async () => {
    const resp = await axios.get('https://restcountries.com/v3.1/all')
    return resp.data
})

export const buscarPais = createAsyncThunk('paises/buscarPais', async (name) => {
    const resp = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
    return resp.data[0]
})

const paisesSlice = createSlice({
    name: 'paises',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPaises.pending, (state,action) => {
            state.status = "Cargando"
        })
            .addCase(getPaises.fulfilled, (state,action) => {
                state.status = "Exitoso"
                state.paises = action.payload
        })
            .addCase(getPaises.rejected, (state,action) => {
                state.status = "Denegado"
                state.error = action.error.message
            })
            .addCase(buscarPais.fulfilled, (state,action) => {
                state.status = "Exitoso"
                state.pais = action.payload
            })
            .addCase(buscarPais.rejected, (state,action) =>{
                state.status = "Denegado"
                state.error = action.error.message
            })
    }
})

export default paisesSlice.reducer