import React, { useState, useEffect } from 'react';
import customAxios from '../../CustomAxios/customAxios';
import { useNavigate, useParams } from 'react-router-dom';

function CustomProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedAccessories, setSelectedAccessories] = useState([]);
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await customAxios.get('/newaccessories'); // Replace with your actual API endpoint
                setAccessories(response.data);
            } catch (error) {
                console.error("Error fetching accessories:", error);
            }
        };

        fetchAccessories();
    }, []);

    const handleAccessorySelect = (accessoryId) => {
        if (selectedAccessories.includes(accessoryId)) {
            setSelectedAccessories(selectedAccessories.filter((id) => id !== accessoryId));
        } else {
            setSelectedAccessories([...selectedAccessories, accessoryId]);
        }
    };

    const handleBuyCustomProduct = async () => {
        try {
            const selectedAccessoryDTOs = selectedAccessories.map((accessoryId) => {
                const selectedAccessory = accessories.find((accessory) => accessory.id === accessoryId);
                return {
                    id: selectedAccessory.id,
                    description: selectedAccessory.description,
                    price: selectedAccessory.price,
                    type: selectedAccessory.type
                };
            });

            await customAxios.post(`/product/clone-and-add-accessories/${id}`, selectedAccessoryDTOs);
            navigate(`/order-detail/${id}`);
        } catch (error) {
            console.error("Error while cloning product and adding accessories:", error);
        }
    };

    return (
        <div>
            <h2>Select Accessories:</h2>
            {accessories.map((accessory) => (
                <div key={accessory.id}>
                    <input
                        type="checkbox"
                        id={accessory.id}
                        checked={selectedAccessories.includes(accessory.id)}
                        onChange={() => handleAccessorySelect(accessory.id)}
                    />
                    <label htmlFor={accessory.id}>{accessory.description}</label>
                </div>
            ))}
            <button onClick={handleBuyCustomProduct}>Buy Custom Product</button>
        </div>
    );
}

export default CustomProduct;
