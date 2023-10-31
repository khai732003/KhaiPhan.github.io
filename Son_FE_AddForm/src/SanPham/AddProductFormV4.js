
import { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;




const AddProductForm = (props) => {
  const [accessoryCount, setAccessoryCount] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [productDetailImages, setProductDetailImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  const handleProductTypeChange = (value) => {
    setProductType(value);
    form.resetFields(['cage']);
  };


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
  const [productType, setProductType] = useState('birdcage');




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
  };

  const handleProductImageUpload = async (options) => {
    console.log('Options:', options);
    const { file } = options;
    if (file) {
      try {
        const formData1 = new FormData();
        formData1.append('file', file);
        formData1.append('upload_preset', 'klbxvzvn'); // Replace 'klbxvzvn' with your Cloudinary preset name
        const response = await axios.post('https://api.cloudinary.com/v1_1/dcr9jaohf/image/upload', formData1);
        console.log('Response:', response); // Check the response from Cloudinary
        const uploadedImage = response.data.secure_url;
        console.log(uploadedImage);
        setProductImage(uploadedImage); // Storing the uploaded image in an array

      } catch (error) {
        console.error('Error uploading product image:', error);
      }
    }
  };




  const handleProductDetailImagesUpload = async (options) => {
    const { fileList } = options;
    if (fileList && fileList.length) {
      try {
        const uploadedImages = await Promise.all(
          fileList.map(async (file) => {
            const formData = new FormData();
            formData.append('file', file.originFileObj);
            formData.append('upload_preset', 'klbxvzvn'); // Replace 'klbxvzvn' with your Cloudinary preset name
            const response = await axios.post('https://api.cloudinary.com/v1_1/dcr9jaohf/image/upload', formData);
            return response.data.secure_url;
          })
        );
        console.log(uploadedImages)
        setProductDetailImages((prev) => [...prev, ...uploadedImages]);
      } catch (error) {
        console.error('Error uploading product detail images:', error);
      }
      
    }
  };

  const handleSubmit = async (formData) => {
    let data = {};
    if (productType === 'birdcage') {
      const accessoryData = [];
      for (let i = 0; i < formData.accessories.length; i++) {
        accessoryData.push({
          description: formData.accessories[i].description,
          price: formData.accessories[i].price,
          type: formData.accessories[i].type,
        });
      }
      data = {
        name: formData.name,
        code: formData.code,
        productImage: productImage,
        productDetailImage: productDetailImages,
        stock: formData.stock,
        totalPrice: formData.totalPrice,
        status: formData.status,
        categoryId: formData.categoryId,
        cage: {
          description: formData.cage.description,
          material: formData.cage.material,
          size: formData.cage.size,
          price: formData.cage.price,
        },
        accessories: accessoryData,
      };
    }
     else if (productType === 'accessory') {
      data = {
        name: formData.name,
        code: formData.code,
        productImage: productImage,
        productDetailImage: productDetailImages,
        stock: formData.stock,
        status: formData.status,
        categoryId: formData.categoryId,
        accessories: [
          {
            description: formData.accessory?.description,
            price: formData.accessory?.price,
            type: formData.accessory?.type,
          },
        ],
      };
    }

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


  const accessoryTypeOptions = ['Type A', 'Type B', 'Type C'];

  const generateAccessoryForms = () => {
    const accessoryForms = [];
    if (accessoryCount > 0) {
      for (let i = 1; i <= accessoryCount; i++) {
        accessoryForms.push(
          <div key={i}>
            <h2>{`Accessory ${i}`}</h2>
            <Form.Item
              label={`Description ${i}`}
              name={['accessories', 'description']}
              rules={[{ required: true, message: `Please input the description for accessory ${i}!` }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={`Price ${i}`}
              name={['accessories', 'price']}
              rules={[{ required: true, message: `Please input the price for accessory ${i}!` }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label={`Type ${i}`}
              name={['accessories', 'type']}
              rules={[{ required: true, message: `Please select the type for accessory ${i}!` }]}
            >
              <Select>
                {accessoryTypeOptions.map((type, index) => (
                  <Option key={index} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
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

      <h2>Product Image</h2>
      <Form.Item label="Product Image"  rules={[{ required: true, message: 'Please input the Image name!' }]}>
      <Upload
        name="productImage"
        beforeUpload={() => false}
        value = {productImage}
        onChange={ handleProductImageUpload}
        listType="picture"
        maxCount={1}
      
      >
        <Button icon={<UploadOutlined />}>Click to upload product image</Button>
      </Upload>

      </Form.Item>
      <Form.Item label="Product Detail Image"  rules={[{ required: true, message: 'Please input the Detail Image name!' }]}>
      <Upload
        name="productDetailImage"
        listType="picture"
        beforeUpload={() => false}
        onChange={handleProductDetailImagesUpload}
        multiple
      >
        <Button icon={<UploadOutlined />}>Click to upload product detail images</Button>
      </Upload>
      </Form.Item>

      <Form.Item label="Stock" name="stock" rules={[{ required: true, message: 'Please input the stock!' }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select the status!' }]}>
        <Select placeholder="Select a status">
          <Option value="Available">Available</Option>
          <Option value="Out of Stock">Out of Stock</Option>
          <Option value="New">New</Option>
          <Option value="Upcoming">Upcoming</Option>
        </Select>
      </Form.Item>

      <h2>Category</h2>
      <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select a category!' }]}>
        <Select placeholder="Select a category">
          {generateCategoryOptions()}
        </Select>
      </Form.Item>
      <h2>Product Type</h2>
      <Form.Item label="Product Type" name="productType" initialValue={productType}>
        <Select onChange={handleProductTypeChange}>
          <Option value="birdcage">Bird Cage</Option>
          <Option value="accessory">Accessory</Option>
        </Select>
      </Form.Item>

      {productType === 'birdcage' && (
        <>
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
            rules={[{ required: true, message: 'Please select the cage material!' }]}
          >
            <Select placeholder="Select a material">
              <Option value="Material 1">Material 1</Option>
              <Option value="Material 2">Material 2</Option>
              <Option value="Material 3">Material 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Size"
            name={['cage', 'size']}
            rules={[{ required: true, message: 'Please select the cage size!' }]}
          >
            <Select placeholder="Select a size">
              <Option value="Small">Small</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Large">Large</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name={['cage', 'price']}
            rules={[{ required: true, message: 'Please input the cage price!' }]}
          >
            <Input type="number" />
          </Form.Item>

          {accessoryCount > 0 && generateAccessoryForms()}
          <Button type="primary" htmlType="submit">
            Add birdcage
          </Button>

          <Button onClick={handleAddAccessory}>Add More Accessories</Button>
          <Button onClick={handleRemoveAllAccessories}>Remove All Accessories</Button>
        </>

      )}

      {productType === 'accessory' && (
        <>
          <h2>Accessory Details</h2>
          <Form.Item
            label="Description"
            name={['accessory', 'description']}
            rules={[{ required: true, message: 'Please input the accessory description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name={['accessory', 'price']}
            rules={[{ required: true, message: 'Please input the accessory price!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Type"
            name={['accessory', 'type']}
            rules={[{ required: true, message: 'Please select the accessory type!' }]}
          >
            <Select placeholder="Select a type">
              <Option value="defaultType">Default Type</Option>
              <Option value="defaultType">Default Type</Option>
              <Option value="defaultType">Default Type</Option>
              <Option value="defaultType">Default Type</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Accessory
          </Button>
        </>
      )}

    </Form>
  );
};

export default AddProductForm;
