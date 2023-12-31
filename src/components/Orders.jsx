import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../contexts/ProductContext";

const Orders = ({ userId }) => {
  const [selectedCategory, setSelectedCategory] = useState("To Ship");
  const [orders, setOrders] = useState([]);
  const { products } = useContext(ProductContext);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/orders", {
          params: {
            category: selectedCategory,
            id: userId,
          },
        });
        console.log("Fetched orders data:", response.data);

        const ordersWithProductInfo = response.data.map((order) => {
          const product = products.find(
            (product) => product.id === order.product_id
          );
          return {
            ...order,
            product_name: product ? product.product_name : "Product Not Found",
            image_url_1: product ? product.image_url_1 : "",
            price: product ? product.price : 0,
            // Add other product-related fields as needed
          };
        });

        setOrders(ordersWithProductInfo);
      } catch (error) {
        if (error.response) {
          // Handle errors
        }
      }
    };

    fetchData();
  }, [selectedCategory, products, userId]);

  return (
    <div className="p-6">
      <br />
      <br />
      <br />
      <br />
      <div className="flex space-x-4 bg-gray-800 text-white p-4">
        <Link
          to="/orders"
          className={`${
            selectedCategory === "To Ship" ? "border-b-2 border-white" : ""
          } px-4 py-2`}
          onClick={() => handleCategoryChange("To Ship")}
        >
          To Ship
        </Link>
        <Link
          to="/orders"
          className={`${
            selectedCategory === "To Receive" ? "border-b-2 border-white" : ""
          } px-4 py-2`}
          onClick={() => handleCategoryChange("To Receive")}
        >
          To Received
        </Link>
        <Link
          to="/orders"
          className={`${
            selectedCategory === "Completed" ? "border-b-2 border-white" : ""
          } px-4 py-2`}
          onClick={() => handleCategoryChange("Completed")}
        >
          Completed Orders
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">{selectedCategory} Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border-b py-2">
              <div className="flex items-center">
                <div className="w-16 h-16 overflow-hidden rounded-full mr-4">
                  <img
                    src={order.image_url_1}
                    alt={order.product_name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-bold">{order.product_name}</div>
                  <div>PHP {order.price}</div>
                  {(selectedCategory === "toship" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMarkAsShipped(order.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Mark as Shipped
                      </button>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  )) ||
                    (selectedCategory === "toreceive" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCompleteOrder(order.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Orders;
