import React from "react";
import products from "../MockData/mockproducts.json";

const SingleProduct = ({ productDetail }) => {
  return (
    <div className="flex flex-col">
      <div>
        <img src={productDetail.ImageURL} alt={productDetail.Name} />
      </div>
      <div className="mt-4 text-lg font-medium truncate ">
        {productDetail.Name}
      </div>
      <div className="text-md truncate ">
        {productDetail.Description}
      </div>
      <div className="text-lg font-medium text-gray-500">
        ${productDetail.Price}
      </div>
      <div>
        <button
          type="button"
          className="mt-4 text-white bg-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Delete
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
  return (
    <div className="mx-auto max-w-2xl  sm:px-6 sm:py-5 lg:max-w-7xl items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center sm:py-5">AVAILABLE PRODUCTS</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-1 px-1">
        {products.map((product, index) => (
          <SingleProduct key={index} productDetail={product} />
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
