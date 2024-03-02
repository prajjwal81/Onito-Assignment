import { createSlice } from "@reduxjs/toolkit";


const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {
      name: "",
      dob: "",
      sex: "",
      number: "",
      id: "",
      idName:""
    },
    errors: {},
    touchedFields: {},
  },
  reducers: {
    updateFormData(state, action) {
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };
    },
    updateErrors(state, action) {
      state.errors = action.payload;
    },
    updateTouchedFields(state, action) {
      state.touchedFields[action.payload.name] = action.payload.value;
    },
  },
});

export const { updateFormData, updateErrors, updateTouchedFields } = formSlice.actions;

export default formSlice.reducer
