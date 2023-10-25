
import { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;




const AddProductForm = () => {
  const [accessoryCount, setAccessoryCount] = useState(0);
  const [productImage, setProductImage] = useState('');
  const [productDetailImages, setProductDetailImages] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
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

  // ...

  const handleAddDetailImageLink = () => {
    if (showUpload) {
      setProductDetailImages([]);
    } else {
      setProductDetailImages([...productDetailImages, '']);
    }
  };
  

const handleRemoveDetailImageLink = (index) => {
  const updatedLinks = [...productDetailImages];
  updatedLinks.splice(index, 1);
  setProductDetailImages(updatedLinks);
};

const handleRemoveAllDetailImageLinks = () => {
  setProductDetailImages([]);
};





  ///////////////////////////
  const handleProductImageUpload = async (options) => {
    const { file } = options;
    if (file.status === 'done') {
      const formData = new FormData();
      formData.append('file', file.originFileObj);
      formData.append('upload_preset', 'klbxvzvn'); // Thay thế 'klbxvzvn' bằng tên thiết lập trước Cloudinary của bạn
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dcr9jaohf/image/upload', formData);
        setProductImage(response.data.secure_url);
        console.log(response);
      } catch (error) {
        console.error('Lỗi tải lên hình ảnh sản phẩm:', error);
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
        setProductDetailImages((prev) => [...prev, ...uploadedImages]);
      } catch (error) {
        console.error('Error uploading product detail images:', error);
      }
    }
  };
  
  
  const handleSubmit = async (formData) => {
    const formattedAccessories = (formData.accessories || []).map((accessory, index) => {
      if (accessory && accessory.description) {
        const { description, price, type } = accessory;
        return {
          description,
          price,
          type: type || "defaultType", // Replace "defaultType" with the default type if needed
        };
      } else {
        return {};
      }
    });
  
    const data = {
      name: formData.name,
      code: formData.code,
      productImage: formData.productImage || productImage,
      productDetailImage: formData.productDetailImage || productDetailImages,
      stock: formData.stock,
      status: formData.status,
      categoryId: formData.categoryId,
      cage: {
        description: formData.cage?.description,
        material: formData.cage?.material,
        size: formData.cage?.size,
        price: formData.cage?.price,
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


      <h2>CC</h2>




{!showUpload ? (
  <Form.Item label="Product Image Link" name="productImage" rules={[{ required: true, message: 'Please input the product image link!' }]}>
    <Input value={productImage} onChange={(e) => setProductImage(e.target.value)} />
  </Form.Item>
) : (
<Form.Item label="Product Image" name="productImage" rules={[{ required: true, message: 'Please upload the product detail image!' }]}>
  {productImage ? (
    <img src={productImage} alt="Product" style={{ maxWidth: '100%' }} />
  ) : (
    <Upload
      name="productImage"
      beforeUpload={() => false}
      onChange={handleProductImageUpload}
      listType="picture"
    >
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  )}
</Form.Item>

)}

<Button onClick={() => {
  if (!showUpload) {
    setProductDetailImages(productDetailImages.filter(link => link.trim() !== ''));
  } else {
    setProductDetailImages([]);
  }
  setShowUpload(!showUpload);
}}>
  {showUpload ? 'Input Detail Image Links Instead' : 'Upload Detail Images Instead'}
</Button>

{!showUpload ? (
  productDetailImages.map((link, index) => (
    <div key={index}>
      <Form.Item
        label={`Product Detail Image ${index + 1}`}
        name={['productDetailImage', index]}
        rules={[{ required: true, message: `Please input product detail image link ${index + 1}!` }]}
      >
        <Input />
      </Form.Item>
      {productDetailImages.length > 1 && (
        <Button onClick={() => handleRemoveDetailImageLink(index)} style={{ marginBottom: 16 }}>
          Remove Image Link {index + 1}
        </Button>
      )}
    </div>
  ))
) : (
  <Form.Item label="Upload Product Detail Image" name="productDetailImageUpload" rules={[{ required: true, message: 'Please upload the product detail image!' }]}>
    <Upload
      name="productDetailImage"
      listType="picture"
      beforeUpload={() => false}
      onChange={handleProductDetailImagesUpload}
      multiple
    >
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  </Form.Item>
)}

<Button onClick={() => {
  if (!showUpload) {
    setProductDetailImages(productDetailImages.filter(link => link.trim() !== ''));
  } else {
    setProductDetailImages([]);
  }
  setShowUpload(!showUpload);
}}>
  {showUpload ? 'Input Detail Image Links Instead' : 'Upload Detail Images Instead'}
</Button>

<Button onClick={handleAddDetailImageLink}>Add More Detail Image Links</Button>
<Button onClick={handleRemoveAllDetailImageLinks}>Remove All Detail Image Links</Button>




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


