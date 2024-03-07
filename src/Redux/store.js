import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./screenSlice";
import patientReducer from "./patientSlice";
import providersIdReducer from "./providersIdSlice";
import combinedDataReducer from "./combinedDataSlice";
import providersDataReducer from "./providersDataSlice";
import slotsDataReducer from "./slotsDataSlice";
import selectedProviderReducer from "./selectedProviderSlice";
import dateTimeReducer from "./dateTimeSlice";
import formReducer from "./formSlice";
import causesReducer from "./causesSlice";

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    causes: causesReducer,
    patient: patientReducer,
    providersData: providersDataReducer,
    slotsData: slotsDataReducer,
    providersId: providersIdReducer,
    combinedData: combinedDataReducer,
    selectedProvider: selectedProviderReducer,
    dateTime: dateTimeReducer,
    form: formReducer,
  },

  devTools: false,
});
