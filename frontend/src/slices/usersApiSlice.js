import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice"

export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/login`,
                method:'POST',
                body:data,
            }),
            
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/register`,
                method:'POST',
                body:data,
            }),
        }),

    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    }=usersApiSlice;