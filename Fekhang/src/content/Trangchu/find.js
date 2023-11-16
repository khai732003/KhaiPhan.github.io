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
                <h3><center><strong>SEARCH</strong></center></h3>
                <Form>
                    <Row className='Row'>
                        Search Input
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
                                    <option value="">Choose Type</option>
                                    <option value="type1">Type 1</option>
                                    <option value="type2">Type 2</option>
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
                                    <option value="">Choose Brand</option>
                                    <option value="brand1">Brand 1</option>
                                    <option value="brand2">Brand 2</option>
                                    {/* Add more options as needed */}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        {/* Search Button */}
                        <Col md={3} >
                            <Button variant="primary" onClick={handleSearch}>
                                SEARCH
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default ProductSearch;
