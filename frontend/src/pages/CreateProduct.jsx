import React, { useState } from "react";

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({
    productName: "",
    imageUrl: "",
    description: "",
    price: "",
  });

  const handleProductNameChange = (e) => {
    setProductName(e.target.value.trim());
    setErrors((prevErrors) => ({ ...prevErrors, productName: "" }));
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value.trim());
    setErrors((prevErrors) => ({ ...prevErrors, imageUrl: "" }));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.trim());
    setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
  };

  const isFormValid = (event) => {
    // ... (validation logic)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid(event)) {
      return;
    }
  };

  return (
    <div className="mx-auto max-w-2xl ">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3 ">
        <InputField
          label="Product Name"
          type="text"
          value={productName}
          onChange={handleProductNameChange}
          error={errors.productName}
        />

        <InputField
          label="Image URL"
          type="url"
          value={imageUrl}
          onChange={handleImageUrlChange}
          error={errors.imageUrl}
        />

        <InputField
          label="Description"
          type="textarea"
          value={description}
          onChange={handleDescriptionChange}
          error={errors.description}
        />

        <InputField
          label="Price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          error={errors.price}
        />

        <div className="w-full mb-4">
          <button
            type="submit"
            className=" mt-4 text-white bg-gray-800 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;

const InputField = ({ label, type, value, onChange, error }) => {
  const rowsLength = 7
  const className = `appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white ${
    error ? "border-red-200" : "border-gray-700"
  }`
  return (
    <div className="w-full mb-4">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      {type === 'textarea'?<textarea
        className={className}
        id={label.toLowerCase()}
        type={type}
        value={value}
        onChange={onChange}
        rows={rowsLength}
        required
      />:
      <input
        className={className}
        id={label.toLowerCase()}
        type={type}
        value={value}
        onChange={onChange}
        required
      />}
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};
