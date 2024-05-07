import iphone from '../assets/iphone9.webp';
import '../Component/Cart.css'
import { useContext, useState, useEffect } from 'react'; // Import useContext
import { ProductContext } from '../App';


const Cart = () => {

    const productsData = useContext(ProductContext);

    const [quantities, setQuantities] = useState(productsData.map(() => 1));
    const [subtotal, setSubtotal] = useState(0); // State for subtotal
    const [total, setTotal] = useState(0); // State for total

    useEffect(() => {
        // Calculate subtotal
        const subtotalValue = productsData.reduce((acc, product, index) => {
            return acc + product.price * quantities[index];
        }, 0);
        setSubtotal(subtotalValue);

        // Calculate total (including shipping or other charges)
        // For now, assuming shipping is free
        setTotal(subtotalValue);
    }, [productsData, quantities]);

    // Function to handle incrementing the quantity
    const handleIncrement = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index] += 1;
        setQuantities(newQuantities);
    };

    // Function to handle decrementing the quantity
    const handleDecrement = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index] -= 1;
        if (newQuantities[index] < 1) {
            newQuantities[index] = 0; // Ensure quantity doesn't go below 1
        }
        setQuantities(newQuantities);
    };

    const calculateTotalPrice = (price, quantity) => {
        return price * quantity;
    };

    return (
        <div>
            <div className="content">
                {productsData.map((product, index) => (
                    <div className="card mb-3" key={product.id}>
                        <div className="row no-gutters">
                            <div className="col-md-3 images-container">
                                <img className="images" src={iphone} alt="iphone"  />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text"><small className="text-muted">{product.brand}</small></p>
                                    <p className="card-text">
                                        {product.description.split(' ').slice(0, 8).join(' ')}
                                        {product.description.split(' ').length > 8 ? '...' : ''}
                                    </p>
                                    <p className="card-text"><small className="text-muted">{product.category}</small></p>
                                </div>
                            </div>
                            <div className="col-md-3 cart-actions"  style={{ width: '500px', height: '250px' }}>
                                <div className="quantity-price-wrapper">
                                    <div className="quantity-wrapper">
                                        <button className="quantity-btn" onClick={() => handleDecrement(index)}>-</button>
                                        <input type="text" className="quantity-input" value={quantities[index]} readOnly />
                                        <button className="quantity-btn" onClick={() => handleIncrement(index)}>+</button>
                                    </div>
                                    <p className="price">${product.price}</p>
                                    <p className="priceperquantity">${calculateTotalPrice(product.price, quantities[index])}</p>
                                </div>
                                <button className="remove-btn">Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="subtotal">
                <div className="subtotal-label">
                    <label>SUB-TOTAL:</label>
                </div>
                <div className="subtotal-value">
                    <p>${subtotal}</p> {/* Replace with your actual subtotal value */}
                </div>
            </div>
            <div className="shipping">
                <div className="shipping-label">
                    <label>SHIPPING:</label>
                </div>
                <div className="shipping-value">
                    <p><b>FREE</b></p> {/* Replace with your actual shipping value */}
                </div>
            </div>
            <hr />
            <div className="total">
                <div className="total-label">
                    <label><b></b>TOTAL:</label>
                </div>
                <div className="total-value">
                    <p><b>${total}</b></p> {/* Replace with your actual shipping value */}
                </div>
            </div>
        </div>
    )
}

export default Cart