import React, { useEffect, useState } from 'react';
import './checkout.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/totalAmount");
        console.log("Fetched total amount:", response.data.totalAmount); 
        setTotalAmount(response.data.totalAmount);
      } catch (error) {
        console.error("There was an error fetching the total amount!", error);
      }
    };

    fetchTotalAmount();
  }, []);

  return (
    <div className="container checkout-container">
      <div className="container">
        <div className="price">
          <h1>Awesome, that's Rs. {totalAmount}!</h1>
        </div>
        <div className="card__container">
          <div className="card1">
            <div className="row paypal">
              <div className="left">
                <input id="pp" type="radio" name="payment" />
                <div className="radio"></div>
                <label htmlFor="pp">UPI</label>
              </div>
              <div className="right">
                <img src="https://cdn.zeebiz.com/sites/default/files/2024/01/03/274966-upigpay.jpg" alt="UPI" />
              </div>
            </div>
            <div className="row credit">
              <div className="left">
                <input id="cd" type="radio" name="payment" />
                <div className="radio"></div>
                <label htmlFor="cd">Debit/ Credit Card</label>
              </div>
              <div className="right">
                <img src="https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png" alt="visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/MasterCard_early_1990s_logo.svg/200px-MasterCard_early_1990s_logo.svg.png" alt="mastercard" />
              </div>
            </div>
            <div className="row cardholder">
              <div className="info">
                <label htmlFor="cardholdername">Name</label>
                <input placeholder="e.g. Richard Bovell" id="cardholdername" type="text" />
              </div>
            </div>
            <div className="row number">
              <div className="info">
                <label htmlFor="cardnumber">Card number</label>
                <input id="cardnumber" type="text" pattern="[0-9]{16,19}" maxLength="19" placeholder="8888-8888-8888-8888"/>
              </div>
            </div>
            <div className="row details">
              <div className="left">
                <label htmlFor="expiry-date">Expiry</label>
                <select id="expiry-date">
                  <option>MM</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <span>/</span>
                <select id="expiry-date">
                  <option>YYYY</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
              <div className="right">
                <label htmlFor="cvv">CVC/CVV</label>
                <input type="text" maxLength="4" placeholder="123"/>
                <span data-balloon-length="medium" data-balloon="The 3 or 4-digit number on the back of your card." data-balloon-pos="up">i</span>
              </div>
            </div>
          </div>
        </div>
        <div className="button">
          <button onClick={() => navigate("/")}><i className="ion-locked"></i> Confirm and Pay </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
