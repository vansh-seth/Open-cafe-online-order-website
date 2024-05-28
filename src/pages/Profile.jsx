import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [productNames, setProductNames] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchUserData();
            fetchProductData();
        }
    }, [user, navigate]);

    const fetchUserData = async () => {
        try {
            const response = await axios.post('http://localhost:3002/api/userData', { email: user.email });
            if (response.data.name) {
                setUserName(response.data.name);
            } else {
                console.error('No name found in response:', response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/allProductData');
            const products = response.data.products;
            setProductNames(products.map(product => product.productName));
            setQuantities(products.map(product => product.quantity));
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="profile-container">
            <h1>Welcome {userName}!</h1>
            <div className="cards-container">
                {productNames.map((productName, index) => (
                    <div className="card" key={index}>
                        <h1>{productName}</h1>
                        <p>Quantity: {quantities[index]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
