import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, updateErrors, updateTouchedFields } from "./FormSlice";
import { MenuItem, Typography,Grid,FormLabel } from "@mui/material";
import Styles from "./FormPage1.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  number: Yup.number()
    .required("Number is required")
    .positive("Number must be positive")
    .integer("Number must be an integer"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  id: Yup.string().required("ID is required"),
  sex: Yup.string().required("Please select a gender"),
  idName:Yup.string().required("Id Name is required"),
});

const FormValidationExample = ({setCheck}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);



  const errors = useSelector((state) => state.form.errors);
  const touchedFields = useSelector((state) => state.form.touchedFields);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    dispatch(updateTouchedFields({ name, value: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        alert(JSON.stringify(formData, null, 2));
        dispatch(updateErrors({})); // Clear errors
        setCheck(prev => !prev)
        
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        dispatch(updateErrors(newErrors)); // Update errors
      });
  };
return (
  <div style={{ padding: "50px" }}>
  <Typography variant="h3" textAlign="center">
    Personal Details
  </Typography>
  <form onSubmit={handleSubmit}>
    <Grid container spacing={3} marginX={2} marginY={2}>
      <Grid container item xs={12} md={4} spacing={3}>
        <Grid item xs={5}>
          <FormLabel>Name</FormLabel>
        </Grid>
        <Grid item xs={7}>
          <TextField
            style={{ width: "90%" }}
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.name) && touchedFields.name}
            helperText={errors.name && touchedFields.name && errors.name}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} spacing={3}>
        <Grid item xs={5}>
          <FormLabel>Date Of Birth</FormLabel>
        </Grid>
        <Grid item xs={7}>
          <TextField
            style={{ width: "90%" }}
            id="dob"
            name="dob"
            placeholder="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.dob) && touchedFields.dob}
            helperText={errors.dob && touchedFields.dob && errors.dob}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={4} spacing={3}>
        <Grid item xs={1}>
          <FormLabel>Sex</FormLabel>
        </Grid>
        <Grid item xs={7}>
          <TextField
            style={{ width: "90%" }}
            id="sex"
            name="sex"
            label="Enter Sex"
            select
            value={formData.sex}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.sex) && touchedFields.sex}
            helperText={errors.sex && touchedFields.sex && errors.sex}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container item xs={12} md={4} spacing={3}>
        <Grid item xs={5}>
          <FormLabel>Mobile</FormLabel>
        </Grid>
        <Grid item xs={7}>
          <TextField
            style={{ width: "90%" }}
            id="number"
            name="number"
            label="Number"
            type="number"
            value={formData.number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.number) && touchedFields.number}
            helperText={
              errors.number && touchedFields.number && errors.number
            }
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} md={4} spacing={3}>
        <Grid item xs={5}>
          <FormLabel>Goverment Issued ID</FormLabel>
        </Grid>
        <Grid item xs={7}>
          <TextField
            style={{ width: "90%" }}
            id="idName"
            name="idName"
            label="Your ID"
            select
            value={formData.idName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.idName) && touchedFields.idName}
            helperText={errors.idName && touchedFields.idName && errors.idName}
          >
            <MenuItem value="male">Pan</MenuItem>
            <MenuItem value="female">AAdhar</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container item xs={12} md={4} spacing={3}>
        <Grid item xs={7}>
          <TextField
            style={{ width: "90%" }}
            id="id"
            name="id"
            placeholder="Enter Goverment ID"
            value={formData.id}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.id) && touchedFields.id}
            helperText={errors.id && touchedFields.id && errors.id}
          />
        </Grid>
      </Grid>
    </Grid>
    <br />
    <Button color="primary" variant="contained" type="submit">
      Next
    </Button>
  </form>
</div>

)

};

export default FormValidationExample;
