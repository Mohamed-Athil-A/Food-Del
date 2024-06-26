import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  //passing the foodlist item
  const [food_list, setFoodList] = useState([]);
  // const [category, setCategory] = useState([]);

  //passing the cartItemss
  const [cartItems, setCartItems] = useState({});
  console.log(cartItems);

  //passing the token
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  console.log(data);

  //search filter state
  const [click, setCLick] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const onChangeHandler = (e) => {
    setSearchItem(e.target.value);
  };

  //passing the url
  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
    //if the user adding the item for the first time in the cart
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo?.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  //fetching catagory list
  // const fetchCategoryList = async () => {
  //   const resposnse = await axios.post(`${url}/api/category/add`);
  //   console.log(resposnse.data);
  //   setCategory(resposnse.data.data);
  // };

  //fetching filtered food

  //fetch the FoodList from the database
  const fecthFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    setFoodList(response.data.data);
  };
  const loadCarData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );

    setCartItems(response.data.cartData);
  };

  //if the token is in the local storage, set the token to prevent the user logout after refreshing
  useEffect(() => {
    async function loadData() {
      fecthFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCarData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    food_list,
    data,
    setData,
    click,
    setCLick,
    searchItem,
    setSearchItem,
    onChangeHandler,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
