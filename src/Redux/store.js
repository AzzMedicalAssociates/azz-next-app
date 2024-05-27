import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./screenSlice";
import loginReducer from "./loginSlice";
import patientReducer from "./patientSlice";
import providersIdReducer from "./providersIdSlice";
import combinedDataReducer from "./combinedDataSlice";
import providersDataReducer from "./providersDataSlice";
import slotsDataReducer from "./slotsDataSlice";
import selectedProviderReducer from "./selectedProviderSlice";
import dateTimeReducer from "./dateTimeSlice";
import formReducer from "./formSlice";
import causesReducer from "./causesSlice";
import selectedProviderDataReducer from "./selectedProviderDataSlice";
import MapReducer from "./mapSlice";

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    login: loginReducer,
    causes: causesReducer,
    patient: patientReducer,
    providersData: providersDataReducer,
    slotsData: slotsDataReducer,
    providersId: providersIdReducer,
    combinedData: combinedDataReducer,
    selectedProvider: selectedProviderReducer,
    selectedProviderData: selectedProviderDataReducer,
    dateTime: dateTimeReducer,
    form: formReducer,
    map: MapReducer,
  },

  devTools: false,
});
