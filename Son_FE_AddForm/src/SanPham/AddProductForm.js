

import { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddProductForm = () => {
  const [accessoryCount, setAccessoryCount] = useState(0);
  const [productImage, setProductImage] = useState('');
  const [productDetailImages, setProductDetailImages] = useState([]);

  const handleAddAccessory = () => {
    setAccessoryCount(accessoryCount + 1);
  };
  const handleRemoveAccessory = (index) => {
    setAccessoryCount(accessoryCount - 1);
    const updatedAccessories = [...productDetailImages];
    updatedAccessories.splice(index - 1, 1);
    setProductDetailImages(updatedAccessories);
  };

  const handleRemoveAllAccessories = () => {
    setAccessoryCount(0);
    setProductDetailImages([]);
  };
  

  const handleProductImageUpload = (info) => {
    if (info.file.status === 'done') {
      setProductImage(info.file.response.url);
    }
  };

  const handleProductDetailImagesUpload = (info) => {
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.url;
      setProductDetailImages([...productDetailImages, imageUrl]);
    }
  };

  const handleSubmit = async (formData) => {
    const formattedAccessories = [];
    for (let i = 1; i <= accessoryCount; i++) {
      const accessoryData = formData.accessories && formData.accessories[i];
      if (accessoryData) {
        const { description, price, type } = accessoryData;
        const accessory = {
          description,
          price,
          type,
        };
        formattedAccessories.push(accessory);
      }
    }
  
    const data = {
      name: formData.name,
      code: formData.code,
      productImage: productImage,
      productDetailImage: productDetailImages,
      stock: formData.stock,
      totalPrice: formData.totalPrice, // Added totalPrice
      status: formData.status,
      categoryId: formData.categoryId,
      cage: {
        description: formData.cage && formData.cage.description,
        material: formData.cage && formData.cage.material,
        size: formData.cage && formData.cage.size,
        price: formData.cage && formData.cage.price,
      },
      accessories: formattedAccessories,
    };

    try {
      const response = await axios.post('http://localhost:8080/cageshop/api/product/add', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data); // Log the response data

    } catch (error) {
      console.error('Error adding product:', error);
    
    }
  };

  const generateAccessoryForms = () => {
    const accessoryForms = [];
    if (accessoryCount > 0) {
      for (let i = 1; i <= accessoryCount; i++) {
        accessoryForms.push(
          <div key={i}>
            <h2>{`Accessory ${i}`}</h2>
            <Form.Item
              label={`Description ${i}`}
              name={['accessories', i, 'description']}
              rules={[{ required: true, message: `Please input the description for accessory ${i}!` }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={`Price ${i}`}
              name={['accessories', i, 'price']}
              rules={[{ required: true, message: `Please input the price for accessory ${i}!` }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label={`Type ${i}`}
              name={['accessories', i, 'type']}
              rules={[{ required: true, message: `Please input the type for accessory ${i}!` }]}
            >
              <Input />
            </Form.Item>
            {accessoryCount > 1 && (
              <Button onClick={() => handleRemoveAccessory(i)} style={{ marginBottom: 16 }}>
                Remove Accessory {i}
              </Button>
            )}
          </div>
        );
      }
    }
    return accessoryForms;
  };

  
  

  return (
    <Form name="addProduct" onFinish={handleSubmit} layout="vertical">
      <h2>Product Details</h2>
      <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please input the product name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Product Code" name="code" rules={[{ required: true, message: 'Please input the product code!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Product Image"
        name="productImage"
        rules={[{ required: true, message: 'Please upload the product image!' }]}
      >
       <Upload name="productImage" action="/upload.do" listType="picture" onChange={handleProductImageUpload} maxCount={1}>
  <Button icon={<UploadOutlined />}>Click to upload</Button>
</Upload>

      </Form.Item>
      <Form.Item
        label="Product Detail Image"
        name="productDetailImage"
        rules={[{ required: false, message: 'Please upload the product detail images!' }]}
      >
        <Upload name="productDetailImage" action="/upload.do" listType="picture" onChange={handleProductDetailImagesUpload}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>





      <Form.Item label="Stock" name="stock" rules={[{ required: true, message: 'Please input the stock!' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Total Price" name="totalPrice" rules={[{ required: true, message: 'Please input the total price!' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please input the status!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Category ID" name="categoryId" rules={[{ required: true, message: 'Please input the category ID!' }]}>
        <Input type="number" />
      </Form.Item>
      <h2>Bird Cage Details</h2>
      <Form.Item
        label="Description"
        name={['cage', 'description']}
        rules={[{ required: true, message: 'Please input the cage description!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Material"
        name={['cage', 'material']}
        rules={[{ required: true, message: 'Please input the cage material!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Size"
        name={['cage', 'size']}
        rules={[{ required: true, message: 'Please input the cage size!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name={['cage', 'price']}
        rules={[{ required: true, message: 'Please input the cage price!' }]}
      >
        <Input type="number" />
      </Form.Item>

    
      {accessoryCount > 0 && generateAccessoryForms()} {/* Display accessories only when count is greater than 0 */}
      <Button type="primary" htmlType="submit">
        Add Product
      </Button>
      <Button onClick={handleAddAccessory}>Add More Accessories</Button>
      <Button onClick={handleRemoveAllAccessories}>Remove All Accessories</Button>
    </Form>
  );
};
    

export default AddProductForm;


// import { useState } from 'react';
// import { Form, Input, Button , Upload} from 'antd';
// import { InboxOutlined } from '@ant-design/icons';
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
// const { Dragger } = Upload;



// const AddProductForm = () => {
//   const [accessoryCount, setAccessoryCount] = useState(1);
//   const [productImage, setProductImage] = useState("");
//   const [productDetailImages, setProductDetailImages] = useState([]);

//   const handleAddAccessory = () => {
//     setAccessoryCount(accessoryCount + 1);
//   };

//   const handleProductImageUpload = (info) => {
//     if (info.file.status === 'done') {
//       setProductImage(info.file.response.url); // Assuming the response from the server provides the image URL
//     }
//   };

//   const handleProductDetailImagesUpload = (info) => {
//     if (info.file.status === 'done') {
//       const imageUrl = info.file.response.url; // Assuming the response from the server provides the image URL
//       setProductDetailImages([...productDetailImages, imageUrl]);
//     }
//   };

//   const handleSubmit = async (formData) => {
//     const finalFormData = {
//       ...formData,
//       productImage: productImage,
//       productDetailImage: productDetailImages,
//     };

  
//     try {
//       const response = await axios.post('http://localhost:8080/cageshop/api/product/add/1', JSON.stringify(finalFormData), {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };
//   const generateAccessoryForms = () => {
//     const accessoryForms = [];
//     for (let i = 2; i <= accessoryCount; i++) {
//       accessoryForms.push(
//         <div key={i}>
//           <h2>{`Accessories Details ${i}`}</h2>
//           <Form.Item
//             label="Description"
//             name={['accessory', `description${i}`]}
//             rules={[{ required: true, message: 'Please input the description!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Price"
//             name={['accessory', `price${i}`]}
//             rules={[{ required: true, message: 'Please input the price!' }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             label="Type"
//             name={['accessory', `type${i}`]}
//             rules={[{ required: true, message: 'Please input the type!' }]}
//           >
//             <Input />
//           </Form.Item>
//         </div>
//       );
//     }
//     return accessoryForms;
//   };







//   return (
//     <Form name="addProduct" onFinish={handleSubmit} layout="vertical">
//       <h2>Product Details</h2>
//       <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please input the product name!' }]}>
//      <Input />
//       </Form.Item>
//       <Form.Item label="Product Code" name="code" rules={[{ required: true, message: 'Please input the product code!' }]}>
//         <Input />
//       </Form.Item>

//   ///////////////////////////////////////////////////////////////////////////////////////////
//   <Form.Item
//         label="Product Image"
//         name="productImage"
//         rules={[{ required: true, message: 'Please upload the product image!' }]}
//       >
//         <Upload name="productImage" action="/upload.do" listType="picture" onChange={handleProductImageUpload} maxCount={1}>
//           <Button icon={<UploadOutlined />}>Click to upload</Button>
//         </Upload>
//       </Form.Item>

//       <Form.Item
//         label="Product Detail Image"
//         name="productDetailImage"
//         rules={[{ required: false, message: 'Please upload the product detail images!' }]}
//       >
//         <Upload name="productDetailImage" action="/upload.do" listType="picture" onChange={handleProductDetailImagesUpload} maxCount={10}>
//           <Button icon={<UploadOutlined />}>Click to upload</Button>
//         </Upload>
//       </Form.Item>




//       ////////////////////////////////////////////////////////////////////////////
//       <Form.Item label="Stock" name="stock" rules={[{ required: true, message: 'Please input the stock!' }]}>
//         <Input type="number" />
//       </Form.Item>
//       <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please input the status!' }]}>
//         <Input />
//       </Form.Item>
//       <h2>Bird Cage Details</h2>
//       <Form.Item
//         label="Description"
//         name={['cage', 'description']}
//         rules={[{ required: true, message: 'Please input the description!' }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Material"
//         name={['cage', 'material']}
//         rules={[{ required: true, message: 'Please input the material!' }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item label="Size" name={['cage', 'size']} rules={[{ required: true, message: 'Please input the size!' }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item label="Price" name={['cage', 'price']} rules={[{ required: true, message: 'Please input the price!' }]}>
//         <Input type="number" />
//       </Form.Item>

//       <h2>Accessories Details</h2>
//       <Form.Item
//         label="Description"
//         name={['accessory', 'description1']}
//         rules={[{ required: true, message: 'Please input the description!' }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Price"
//         name={['accessory', 'price1']}
//         rules={[{ required: true, message: 'Please input the price!' }]}
//       >
//         <Input type="number" />
//       </Form.Item>
//       <Form.Item
//         label="Type"
//         name={['accessory', 'type1']}
//         rules={[{ required: true, message: 'Please input the type!' }]}
//       >
//         <Input />
//       </Form.Item>

//       {generateAccessoryForms()}

//       <Button type="primary" htmlType="submit">
//         Add Product
//       </Button>

//       <Button onClick={handleAddAccessory}>Add More Accessories</Button>
//     </Form>
//   );
// };

// export default AddProductForm;


// {/* <h2>Product Image</h2>
// <Form.Item
// label="Product Image"
// name="productImage"
// valuePropName="fileList"
// getValueFromEvent={(e) => {
// if (Array.isArray(e)) {
// return e;
// }
// return e && [e.file];
// }}
// rules={[{ required: true, message: 'Please upload the product image!' }]}
// >
// <Dragger name="file" action="/upload.do" multiple={false}>
// <p className="ant-upload-drag-icon">
// <InboxOutlined />
// </p>
// <p className="ant-upload-text">Click or drag file to this area to upload</p>
// </Dragger>
// </Form.Item>


// <h2>Product Detail Image</h2>
// {/* Dynamic form for product detail images */}
// {Array.from({ length: accessoryCount }, (_, index) => index + 1).map((i) => (
//   <Form.Item
//     key={i}
//     label={`Product Detail Image ${i}`}
//     name={['productDetailImage', i]}
//     valuePropName="fileList"
//     getValueFromEvent={(e) => {
//       if (Array.isArray(e)) {
//         return e;
//       }
//       return e && e.fileList;
//     }}
//     rules={[{ required: false, message: 'Please upload the product detail image!' }]}
//   >
//     <Dragger name={`files${i}`} action="/upload.do">
//       <p className="ant-upload-drag-icon">
//         <InboxOutlined />
//       </p>
//       <p className="ant-upload-text">Click or drag file to this area to upload</p>
//     </Dragger>
//   </Form.Item>
// ))} */}