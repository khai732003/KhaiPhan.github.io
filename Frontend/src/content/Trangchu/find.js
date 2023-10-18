import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../Trangchu/find.scss'
const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');

    const handleSearch = () => {
        // Implement your search logic here
        console.log('Search Term:', searchTerm);
        console.log('Selected Type:', selectedType);
        console.log('Selected Brand:', selectedBrand);
    };

    return (
        <div className='find'>
            <div className="container">
                <h3><center><strong>TÌM KIẾM SẢN PHẨM</strong></center></h3>
                <Form>
                    <Row className='Row'>
                        {/* Search Input */}
                        <Col md={3}>
                            <Form.Group controlId="searchTerm">
                                <Form.Control
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}

                                />
                                
                            </Form.Group>
                        </Col>

                        {/* Type Dropdown */}
                        <Col md={3}>
                            <Form.Group controlId="selectedType">
                                <Form.Control
                                    as="select"
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                >
                                    <option value="">Chọn loại</option>
                                    <option value="type1">Loại 1</option>
                                    <option value="type2">Loại 2</option>
                                    {/* Add more options as needed */}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        {/* Brand Dropdown */}
                        <Col md={3}>
                            <Form.Group controlId="selectedBrand">
                                <Form.Control
                                    as="select"
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                >
                                    <option value="">Chọn thương hiệu</option>
                                    <option value="brand1">Thương hiệu 1</option>
                                    <option value="brand2">Thương hiệu 2</option>
                                    {/* Add more options as needed */}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        {/* Search Button */}
                        <Col md={3} >
                            <Button variant="primary" onClick={handleSearch}>
                                TÌM KIẾM
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default ProductSearch;
