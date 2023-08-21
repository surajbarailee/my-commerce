import React, { useState, useEffect } from "react";
import { Loader } from "./loader";
import {
  getProducts,
  deleteProduct,
} from "../controllers/productApi.";

const SingleProduct = ({ productDetail ,fetchProducts}) => {
  const [isBeingDeleted, setisBeingDeleted] = useState(false);

  const handleDelete = async () => {
    setisBeingDeleted(true);

    try {
      await deleteProduct(productDetail.id);
      setTimeout(async() => {
        setisBeingDeleted(false);
        fetchProducts()
      }, 1000);
    } catch (error) {
      setisBeingDeleted(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <img
          src={
            productDetail.thumbnail
              ? productDetail.thumbnail
              : productDetail.imageUrl
          }
          alt={productDetail.Name}
        />
      </div>
      <div className="mt-4 text-lg font-medium truncate ">
        {productDetail.name}
      </div>
      <div className="text-md truncate ">{productDetail.description}</div>
      <div className="text-lg font-medium text-gray-500">
        ${productDetail.price}
      </div>
      <div>
        <button
          type="button"
          className="mt-5 text-white bg-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2"
          onClick={handleDelete}
          disabled={isBeingDeleted}
        >
          {isBeingDeleted ? ".. Deleting .." : "Delete Item"}
        </button>

        <button
          type="button"
          className="mt-4 text-black bg-gray-100 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Details
        </button>
      </div>
    </div>
  );
};

const ListProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [lastEvaluatedKey, setlastEvaluatedKey] = useState("");

  const fetchProducts = async () => {
    const result = await getProducts();
    setProducts(result.data);
    setlastEvaluatedKey(result.lastEvaluatedKey)
    setIsLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="mx-auto max-w-2xl  sm:px-6 sm:py-5 lg:max-w-7xl items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center sm:py-5">
        AVAILABLE PRODUCTS
      </h2>
      {isLoading && <Loader />}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-1 px-1">
        {!isLoading && products.length === 0 ? <h1>No products found</h1> : products.map((product, index) => (
          <SingleProduct key={index} productDetail={product} fetchProducts={fetchProducts}/>
        ))} 
        
      </div>
    </div>
  );
};

export default ListProducts;
