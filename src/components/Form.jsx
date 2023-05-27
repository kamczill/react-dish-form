import React, {useState} from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Box, InputLabel, TextField, Button, Select, MenuItem, Typography } from '@mui/material'
import { toast } from 'react-toastify'

const validationSchema = Yup.object({
    name: Yup.string()
        .required("Required"),
    preparation_time: Yup.string()
        .notOneOf(['00:00:00'], 'Must be higher than 00:00:00'),
    type: Yup.string()
        .required(),
    no_of_slices: Yup.number()
        .when('type', {
            is: 'pizza', 
            then: (schema) => schema.required('Required')
    }),
    diameter: Yup.number()
        .when('type', {
            is: 'pizza', 
            then: (schema) => schema.required('Required')
    }),
    spiciness_scale: Yup.number()
        .when('type', {
            is: 'soup', 
            then: (schema) => schema.min(1, 'Minimum number is 1').max(10, 'Maximum number is 10').required('Required')
    }),
    slices_of_bread: Yup.number()
        .when('type', {
            is: 'sandwich', 
            then: (schema) => schema.required('Required')
    }),
})

const initialValues = {
    name: '',
    preparation_time: "00:00:00",
    type: '',
    no_of_slices: 0,
    diameter: 0.0,
    spiciness_scale: 1,
    slices_of_bread: 1
}

const Form = () => {
    const [errorsFromServer, setErrorsFromServer] = useState();

    const successNotification = () => {
        toast.success('Success! Check your console to see response data', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    

    const handleSubmit = ({values, props}) => {
        const { name, preparation_time, type, no_of_slices, diameter, spiciness_scale, slices_of_bread} = values
        const data = {
            name: name,
            preparation_time: preparation_time,
            type: type,
            ...(type === 'pizza' && {no_of_slices: no_of_slices}),
            ...(type === 'pizza' && {diameter: diameter}),
            ...(type === 'soup' && {spiciness_scale: spiciness_scale}),
            ...(type === 'sandwich' && {slices_of_bread: slices_of_bread})
        }

        axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
            ...data
        }, {
            headers: {
            "Content-Type": "application/json"
        }})
        .then((res) => {
            if(res?.status === 200){
                console.log(res?.data)
                successNotification();
                props.resetForm();
                setErrorsFromServer()
            }
        }).catch(err => {
            console.log(err?.message)
            setErrorsFromServer(err?.response?.data)
        })
    }
    
    const showErrors = (errors) => {
        return(
        Object.entries(errors)?.map( err => (
            <Typography key={err[0]} color='red' fontFamily='Inter'>
                <Typography variant='span' fontWeight={600}>{err[0]}: </Typography>{err[1]}
            </Typography>
            ))
        )
    }

  return (
    <>
    <Box>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, props) => handleSubmit({values, props})}
        >
            {props => (
                <Box 
                    as='form' 
                    onSubmit={props.handleSubmit} 
                    width='100vw' 
                    maxWidth='300px' 
                    display='flex' 
                    flexDirection='column' 
                    gap='1rem' 
                    p='1'
                >
                    <Box>
                        <Typography variant='h4' fontFamily='Inter'>
                            It's a DishForm
                        </Typography>
                        <Typography fontFamily='Inter'>
                            When your data doesn't pass a validation on server, errors will be seen in thebelow form
                        </Typography>
                    </Box>
                    <Box marginTop='1rem'>
                    <InputLabel htmlFor="name">
                        Name
                    </InputLabel>
                    <TextField
                        name="name"
                        type="text"
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        onChange={props.handleChange}
                        error={props.touched.name && Boolean(props.errors.name)}
                        helperText={props.touched.name && props.errors.name}
                        fullWidth
                    />
                    </Box>
                    <Box>
                        <InputLabel htmlFor="preparation_time">Time: </InputLabel>
                        <TextField
                            id="preparation_time" 
                            name="preparation_time" 
                            type="time" 
                            inputProps={{
                                step: 2,
                            }}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.preparation_time}
                            error={props.touched.preparation_time && Boolean(props.errors.preparation_time)}
                            helperText={props.touched.preparation_time && props.errors.preparation_time}
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <InputLabel htmlFor="type">Type:</InputLabel>
                        <Select 
                            id="type" 
                            name="type" 
                            value={props.values.type} 
                            onChange={props.handleChange}
                            error={props.touched.type && Boolean(props.errors.type)}
                            fullWidth
                        >
                            <MenuItem value="pizza">Pizza</MenuItem>
                            <MenuItem value="soup">Soup</MenuItem>
                            <MenuItem value="sandwich">Sandwich</MenuItem>
                        </Select>
                    </Box>
                    {props.values.type === 'pizza' ? (
                        <>
                        <Box>
                            <InputLabel htmlFor="no_of_slices">Number of slices:</InputLabel>
                            <TextField
                                type="number" 
                                id="no_of_slices" 
                                name="no_of_slices" 
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.no_of_slices}
                                error={props.touched.no_of_slices && Boolean(props.errors.no_of_slices)}
                                helperText={props.touched.no_of_slices && props.errors.no_of_slices}
                                fullWidth
                            />
                        </Box>
                        <Box>
                            <InputLabel htmlFor="diameter">Diameter:</InputLabel>
                            <TextField 
                                type="number" 
                                id="diameter" 
                                name="diameter" 
                                inputProps={{
                                    step:"0.01",
                                    min:"0"
                                }}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.diameter}
                                error={props.touched.diameter && Boolean(props.errors.diameter)}
                                helperText={props.touched.diameter && props.errors.diameter}
                                fullWidth
                            />
                        </Box>
                        </>
                    ) : props.values.type === 'soup' ? (
                        <Box>
                            <InputLabel htmlFor="spiciness_scale">Spiciness scale (1-10):</InputLabel>
                            <TextField
                                type="number" 
                                id="spiciness_scale" 
                                name="spiciness_scale" 
                                min="1" 
                                max="10" 
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.spiciness_scale}
                                error={props.touched.spiciness_scale && Boolean(props.errors.spiciness_scale)}
                                helperText={props.touched.spiciness_scale && props.errors.spiciness_scale}
                                fullWidth
                            /> 
                        </Box>
                    ): props.values.type === 'sandwich' ? (
                        <Box>
                        <InputLabel htmlFor="slices_of_bread">Number of slices of bread:</InputLabel>
                         <TextField 
                            type="number" 
                            id="slices_of_bread" 
                            name="slices_of_bread" 
                            min="1" 
                            max="10" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.slices_of_bread}
                            error={props.touched.slices_of_bread && Boolean(props.errors.slices_of_bread)}
                            helperText={props.touched.slices_of_bread && props.errors.slices_of_bread}
                            fullWidth
                         /> 
                         </Box>
                    ): ''
                    }
                    <Box>
                        <Button 
                            type="submit" 
                            fullWidth 
                            sx={{
                                backgroundColor:'#0694cc',
                                color: '#ffffff',
                                "&:hover": {
                                    backgroundColor: '#2bb7e2'
                                }}}
                        >
                        Submit
                        </Button>
                    </Box>
                    {
                        errorsFromServer && props.isSubmitting ? (
                            showErrors(errorsFromServer)
                        ): ''
                    }
                </Box>
            )}
        </Formik>        
    </Box>
    </>
  )
}


export default Form