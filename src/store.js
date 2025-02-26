import loginSlice from "./slices/loginSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: { loginSlice: loginSlice },
});
