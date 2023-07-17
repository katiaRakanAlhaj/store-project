import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useSelector } from 'react-redux';
const CreateAdvertisement = () => {
  const [advertisementType, setAdvertisementType] = useState('');
  const [image, setImage] = useState('');
  const [store, setStore] = useState('');
  const [link, setLink] = useState('');
  const [stores, setStores] = useState([]);
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch data from the server');
        console.log(error);
      });
  }, []);
  const handleDeleteImage = () => {
    setImage('');
  };
  const renderImageOptions = () => (
    <>
      <select
        className="form-control w-100 mt-3"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      >
        <option value="">Select Image</option>
        {stores.map((store) => (
          <option key={store.id} value={store.image}>
            {store.title}
          </option>
        ))}
      </select>
      <div className="text-center mt-3">
        {image && (
          <img
            src={image}
            alt="Selected Image"
            className="rounded-circle"
            style={{ width: '150px' }}
          />
        )}
      </div>
      {image && (
        <button
          className="btn btn-danger text-white w-100 mt-3 font-weight-bold"
          type="button"
          onClick={handleDeleteImage}
        >
          Delete Image
        </button>
      )}
    </>
  );
  return (
    <div className="store">
      {isLoggedIn && (
        <div className="alert alert-danger mt-1 w-50 d-flex justify-content-center text-center mx-auto">
          Login successful! Role: {role}
        </div>
      )}
      <h2 className="text-center mt-1 text-white">Create Advertisement</h2>
      <div className="form-control container w-50">
        <select
          className="form-control w-100"
          value={advertisementType}
          onChange={(e) => setAdvertisementType(e.target.value)}
        >
          <option value="">Select Advertisement Type</option>
          <option value="image">Image</option>
          <option value="store">Store</option>
          <option value="link">Link</option>
        </select>
        {advertisementType === 'image' && renderImageOptions()}
        {advertisementType === 'store' && (
          <div>
            {renderImageOptions()}
            <select
              className="form-control w-100 mt-3"
              value={store}
              onChange={(e) => setStore(e.target.value)}
            >
              <option value="">Select Store</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.title}
                </option>
              ))}
            </select>
          </div>
        )}
        {advertisementType === 'link' && (
          <div>
            {renderImageOptions()}
            <input
              className="form-control w-100 mt-3"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Link"
            />
            {link && <a href={link}>Link to the image</a>}
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateAdvertisement;
