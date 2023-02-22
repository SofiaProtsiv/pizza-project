import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cart/slice";
import filterReducer from "./filters/slice";
import pizzasReducer from "./pizzas/slice";

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
];

// const authPersistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ["token"],
// };

export const store = configureStore({
    reducer: {
        // auth: persistReducer(authPersistConfig, authReducer),
        pizzas: pizzasReducer,
        filters: filterReducer,
        cart: cartReducer
    },
    middleware,
    devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
