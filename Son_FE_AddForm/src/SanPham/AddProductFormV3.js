
import { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;




const AddProductForm = () => {
  const [accessoryCount, setAccessoryCount] = useState(0);
  const [productImage, setProductImage] = useState('');
  const [productDetailImages, setProductDetailImages] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cageshop/api/category/list');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);


  const generateCategoryOptions = () => {
    return categories.map(category => (
      <Option key={category.id} value={category.id}>
        {category.name}
      </Option>
    ));
  };
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
  ///////////////////////////
  const handleProductImageUpload = async (options) => {
    const { file } = options;
    if (file.status === 'done') {
      const formData = new FormData();
      formData.append('file', file.originFileObj);
      formData.append('upload_preset', 'klbxvzvn'); // Replace 'klbxvzvn' with your Cloudinary preset name
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dcr9jaohf/image/upload', formData);
        setProductImage(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading product image:', error);
      }
    }
  };
  
  
  const handleProductDetailImagesUpload = async (options) => {
    const { fileList } = options;
    if (fileList && fileList.length) {
      for (let i = 0; i < fileList.length; i++) {
        const formData = new FormData();
        formData.append('file', fileList[i].originFileObj);
        formData.append('upload_preset', 'klbxvzvn'); // Replace 'klbxvzvn' with your Cloudinary preset name
        try {
          const response = await axios.post('https://api.cloudinary.com/v1_1/dcr9jaohf/image/upload', formData);
          setProductDetailImages((prev) => [...prev, response.data.secure_url]);
        } catch (error) {
          console.error('Error uploading product detail image:', error);
        }
      }
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


      <h2>CC</h2>

      <Form.Item
  label="Product Image"
  name="productImage"
  rules={[{ required: true, message: 'Please upload the product image!' }]}
>
  <Upload
    name="productImage"
    beforeUpload={() => false}
    onChange={handleProductImageUpload}
  >
    <Button icon={<UploadOutlined />}>Click to upload</Button>
  </Upload>
</Form.Item>

<Form.Item
  label="Product Detail Image"
  name="productDetailImage"
  rules={[{ required: false, message: 'Please upload the product detail images!' }]}
>
  <Upload
    name="productDetailImage"
    listType="file"
    onChange={handleProductDetailImagesUpload}
    multiple
  >
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
      <h2>Category</h2>
      <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select placeholder="Select a category">
          {generateCategoryOptions()}
        </Select>
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


