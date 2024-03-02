import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    address: '',
    state: '',
    city: '',
    country: '',
    pincode: '',
  },
  errors: {},
  touchedFields: {},
};

const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    updateFormData(state, action) {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    updateErrors(state, action) {
      state.errors = action.payload;
    },
    updateTouchedFields(state, action) {
      const { name, value } = action.payload;
      state.touchedFields[name] = value;
    },
  },
});

export const { updateFormData, updateErrors, updateTouchedFields } = AddressSlice.actions;

export default AddressSlice.reducer;
