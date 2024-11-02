import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setData } from "../../redux/slices/ItemSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 20px;
  column-gap: 20px;
  .product-card {
    display: block;
    position: relative;
    width: 250px;
    border-radius: 8px;
    box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.2);
    line-height: 25px;
    font-size: 15px;
    overflow: hidden;
    padding-bottom: 5px;
    margin-top: 15px;
    transition: all 0.2s ease-in-out;
    border: 1px solid var(--border-color);

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 0 16px 0px rgba(0, 0, 0, 0.2);
    }
  }
  img {
    width: 250px;
  }
  p {
    padding: 0 10px;
  }
  .price {
    font-size: 20px;
    padding-bottom: 25px;
  }
  button {
    background-color: green;
    color: #fff;
    font-size: 15px;
    border: none;
    border-radius: 5px;
    padding: 10px 25px;
    width: 220px;
    position: absolute;
    bottom: 5px;
    width: 230px;
    left: 10px;
    cursor: pointer;
  }
`;
const ProductsStore = () => {
  const data = useSelector((state) => state.items.item);

  const dispatch = useDispatch();
  useEffect(() => {
    const getItems = async (url) => {
      const res = await fetch(url);
      const json = await res.json();
      return json;
    };
    getItems("https://dummyjson.com/products").then((data) => {
      dispatch(setData(data.products));
    });
  }, []);

  return (
    <StyledItem>
      {data &&
        data.map((item) => (
          <div className="product-card" key={item.id}>
            <img key={item.id} src={item.thumbnail} alt={item.title} />
            <p className="description">{item.description}</p>
            <p className="price">$ {item.price}</p>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    item,
                  })
                )
              }
            >
              {" "}
              + Add to cart
            </button>
          </div>
        ))}
    </StyledItem>
  );
};
export default ProductsStore;
