// FormPage2.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, updateErrors, updateTouchedFields } from './AddressSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, FormLabel, Typography } from '@mui/material';

const FormPage2 = () => {
  const dispatch = useDispatch();

  const formData = useSelector(state => state.address.formData);

  const errors = useSelector(state => state.address.errors);

  const touchedFields = useSelector(state => state.address.touchedFields);
  console.log(touchedFields)
  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    pincode: Yup.string().required('Pincode is required'),
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        alert(JSON.stringify(formData, null, 2));
        dispatch(updateErrors({})); // Clear errors
       
        
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        dispatch(updateErrors(newErrors)); // Update errors
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    dispatch(updateTouchedFields({ name, value: true }));
  };

  return (
    <>
      <Typography variant="h3" textAlign="center">
        Address Details
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3} marginX={2} marginY={2}>
        <Grid container item xs={12} md={6} spacing={2}>
        
          <Grid item xs={5}>
            <FormLabel>Address</FormLabel>
          </Grid>
          <Grid item xs={7}>
            <TextField
              placeholder="Enter the Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.address && Boolean(errors.address)}
              helperText={touchedFields.address && errors.address}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={5}>
            <FormLabel>State</FormLabel>
          </Grid>
          <Grid item xs={7}>
            <TextField
              placeholder="Enter the State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.state && Boolean(errors.state)}
              helperText={touchedFields.state && errors.state}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={5}>
            <FormLabel>City</FormLabel>
          </Grid>
          <Grid item xs={7}>
            <TextField
              placeholder="Enter the City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.city && Boolean(errors.city)}
              helperText={touchedFields.city && errors.city}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={5}>
            <FormLabel>Country</FormLabel>
          </Grid>
          <Grid item xs={7}>
            <TextField
              placeholder="Enter the Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.country && Boolean(errors.country)}
              helperText={touchedFields.country && errors.country}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={5}>
            <FormLabel>Pincode</FormLabel>
          </Grid>
          <Grid item xs={7}>
            <TextField
              placeholder="Enter the Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.pincode && Boolean(errors.pincode)}
              helperText={touchedFields.pincode && errors.pincode}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container marginLeft={5}>
        <Button variant="contained"  type="submit">
          Submit
        </Button>
      </Grid>
      </form>
    </>
  );
};

export default FormPage2;
