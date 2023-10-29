// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import customAxios from '../../../CustomAxios/customAxios';

// const UpdateUser = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [initialValues, setInitialValues] = useState({
//     email: '',
//     name: '',
//     fullname: '',
//     gender: '',
//     password: '',
//     phone: '',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlJGeDFoDO2mUm5q3S8O_oc-8O4BYFWjNemRIdQ_6LQ&s',
//     address: '',
//     roleId: 1,
//     managerId: null
//   });

//   useEffect(() => {
//     // Lấy dữ liệu người dùng hiện tại từ máy chủ và cập nhật initialValues
//     if (id) {
//       customAxios.get(`/user/update/${id}`).then((response) => {
//         setInitialValues(response.data);
//       });
//     }
//   }, [id]);

//   const validationSchema = Yup.object({
//     email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
//     name: Yup.string().required('Tên người dùng là bắt buộc'),
//     fullname: Yup.string().required('Họ tên là bắt buộc'),
//     gender: Yup.string().required('Giới tính là bắt buộc'),
//     password: Yup.string().required('Mật khẩu là bắt buộc'),
//     phone: Yup.string().required('Số điện thoại là bắt buộc'),
//     address: Yup.string().required('Địa chỉ là bắt buộc'),
//   });

//   const handleSubmit = (values) => {
//     customAxios.put(`/user/${id}`, values).then(() => {
//       navigate('/usermanagement');
//     });
//   };

//   return (
//     <div>
//       <h2>Edit User</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         <Form>
//           <div>
//             <label htmlFor="email">Email:</label>
//             <Field type="email" id="email" name="email" />
//             <ErrorMessage name="email" component="div" />
//           </div>

//           <div>
//             <label htmlFor="name">User Name:</label>
//             <Field type="text" id="name" name="name" />
//             <ErrorMessage name="name" component="div" />
//           </div>

//           <div>
//             <label htmlFor="fullname">Full Name:</label>
//             <Field type="text" id="fullname" name="fullname" />
//             <ErrorMessage name="fullname" component="div" />
//           </div>

//           <div>
//             <label htmlFor="password">Password:</label>
//             <Field type="text" id="password" name="password" />
//             <ErrorMessage name="password" component="div" />
//           </div>


//           <div>
//             <button type="submit">Save</button>
//           </div>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default UpdateUser;
