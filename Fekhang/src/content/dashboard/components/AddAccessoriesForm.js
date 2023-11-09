import { Form, Input, Select, Button } from 'antd';
import { useState } from 'react';
import customAxios from '../../../CustomAxios/customAxios';

const { Option } = Select;

const AddAccessoriesForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await customAxios.post('/addaccessories', values);
      console.log('Accessory added successfully:', response.data);
    } catch (error) {
      console.error('Error adding accessory:', error);
    }
  };

  return (
    <Form form={form} name="add_accessory" onFinish={onFinish} style={{paddingTop:'8rem'}}>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input the price!', type: 'number' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Please select the type!' }]}
      >
        <Select>
          <Option value="Accessory Type 1">Accessory Type 1</Option>
          <Option value="Accessory Type 2">Accessory Type 2</Option>
          <Option value="Accessory Type 3">Accessory Type 3</Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Accessory
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAccessoriesForm;
