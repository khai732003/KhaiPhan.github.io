import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import '../loggin/signup.scss';
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography,
    Grid,
} from '@mui/material';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';

function Register() {
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        name: Yup.string().required('Name is required'),
        fullName: Yup.string().required('Full name is required'),
        gender: Yup.number().required('Gender is required'),
        password: Yup.string().required('Password is required'),
        phone: Yup.string().required('Phone is required'),
        address: Yup.string().required('Address is required'),
        image: Yup.string().required('Image is required'),
        roleId: Yup.string(),
        managerId: Yup.string(),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            // Replace this with your actual API request to register the user
            const response = await fetch('YOUR_API_ENDPOINT/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                // Registration successful, you can redirect or show a success message
            } else {
                // Handle registration failure, show an error message, etc.
            }
        } catch (error) {
            console.error('Registration error: ', error);
        }

        // Don't forget to call setSubmitting(false) to enable the submit button
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            fullName: '',
            gender: '',
            password: '',
            phone: '',
            address: '',
            image: 'asasasasa',
            roleId: '1',
            managerId: null,
        },
        validationSchema,
        onSubmit,
    });

    return (
        <>
            <Header />
            <Grid container justifyContent="center" margin="40px 0">
                <Grid item xs={12} md={5}>
                    <Box mt={8}>
                        <Typography variant="h4" component="h2">
                            Đăng ký tài khoản
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Box>
                                <TextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Box>
                            <Box mt={2}>
                                <TextField
                                    label="Tên"
                                    type="text"
                                    name="name"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Box>
                            <Box mt={2}>
                                <TextField
                                    label="Họ và tên đầy đủ"
                                    type="text"
                                    name="fullName"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />
                            </Box>
                            <Box mt={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Giới tính</InputLabel>
                                    <Select
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        label="Giới tính"
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    >
                                        <MenuItem value="">Chọn giới tính</MenuItem>
                                        <MenuItem value="1">Nam</MenuItem>
                                        <MenuItem value="2">Nữ</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box mt={2}>
                                <TextField
                                    label="Mật khẩu"
                                    type="password"
                                    name="password"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Box>
                            <Box mt={2}>
                                <TextField
                                    label="Số điện thoại"
                                    type="text"
                                    name="phone"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Box>
                            <Box mt={2}>
                                <TextField
                                    label="Địa chỉ"
                                    type="text"
                                    name="address"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                            </Box>
                            <Box mt={2}>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(event) => {
                                        formik.setFieldValue('image', event.currentTarget.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.image && Boolean(formik.errors.image) && (
                                    <div>{formik.errors.image}</div>
                                )}
                            </Box>
                            <Box mt={2}>
                                <TextField
                                    label="RoleId"
                                    type="text"
                                    name="roleId"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.roleId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.roleId && Boolean(formik.errors.roleId)}
                                    helperText={formik.touched.roleId && formik.errors.roleId}
                                />
                            </Box>
                            <Box mt={2}>
                                <TextField
                                    label="ManagerId"
                                    type="text"
                                    name="managerId"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.managerId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.managerId && Boolean(formik.errors.managerId)}
                                    helperText={formik.touched.managerId && formik.errors.managerId}
                                />
                            </Box>
                            <Box mt={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={formik.isSubmitting}
                                >
                                    Đăng ký
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
}

export default Register;
