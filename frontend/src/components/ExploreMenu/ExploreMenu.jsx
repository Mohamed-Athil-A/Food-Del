import "./exploreMenu.css";
import { menu_list } from "../../assets/assets";
import Search from "../Search/Search";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { searchItem, onChangeHandler, setCLick, click } =
    useContext(StoreContext);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingrediants and culinary. Our mission is to
        satisfy your cravings and elevate your dining experience, one delecious
        meal at a time
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              className="explore-menu-list-item"
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt="menu-image"
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
      {click && (
        <Search
          searchItem={searchItem}
          onChangeHandler={onChangeHandler}
          setCLick={setCLick}
        />
      )}
    </div>
  );
};

export default ExploreMenu;
