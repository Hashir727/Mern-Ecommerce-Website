import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const backendUrl = "http://localhost:4000";
  
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // const addToCart = async (itemId, size) => {
  //   if (!size) {
  //     toast.error("Please select a size");
  //     return;
  //   }

  //   let cartData = structuredClone(cartItems);

  //   if (cartData[itemId]) {
  //     if (cartData[itemId][size]) {
  //       cartData[itemId][size] += 1;
  //     } else {
  //       cartData[itemId][size] = 1;
  //     }
  //   } else {
  //     cartData[itemId] = {};
  //     cartData[itemId][size] = 1;
  //   }
  //   setCartItems(cartData);
  //   if (token) {
  //     try {
  //       await axios.post(
  //         "http://localhost:4000/api/cart/add",
  //         { itemId, size },
  //         { headers: { token } }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message);
  //     }
  //   }
  // };
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
  
    let cartData = structuredClone(cartItems); // Clone current cart state
  
    if (!cartData[itemId]) {
      // If item doesn't exist, initialize it
      cartData[itemId] = {};
    }
  
    // Update size count or initialize it
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
  
    setCartItems(cartData); // Update state
  
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`, // Use your backend URL
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };
  

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          } else {
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  // const updateQuantity = async (itemId, size, quantity) => {
  //   let cartData = structuredClone(cartItems);

  //   cartData[itemId][size] = quantity;

  //   setCartItems(cartData);

  //   if (token) {
  //     try {
  //       await axios.post(
  //         backendUrl + "/api/cart/update",
  //         { itemId, size, quantity },
  //         { headers: { token } }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message);
  //     }
  //   }
  // };
  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity <= 0) return; // Optional: Prevent zero or negative quantities
  
    let cartData = structuredClone(cartItems);
  
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity; // Update the specific size's quantity
      setCartItems(cartData);
  
      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId, size, quantity },
            { headers: { token } }
          );
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      }
    } else {
      toast.error("Item or size not found in cart");
    }
  };
  

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/list"
      );
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/cart/get",
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};