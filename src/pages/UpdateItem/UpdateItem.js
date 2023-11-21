import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemDetails } from "../../store/actions/itemDetailsActions";
import { updateProduct } from "../../store/actions/updateProductActions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

const conditionOptions = [
  "New",
  "Open Box",
  "Used",
  "Refurbished",
  "For Parts or Not Working",
];

const UpdateItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newImage, setNewImage] = useState(null);

  const { itemDetails, isLoading, error } = useSelector(
    (state) => state.itemDetails
  );

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    brand: "",
    condition: "",
    price: "",
    location: "",
    mobileNumber: "",
    username: "",
    uid: "",
    timestamp: "",
    imageUrl: "",
  });

  useEffect(() => {
    dispatch(fetchItemDetails(itemId));
  }, [dispatch, itemId]);

  useEffect(() => {
    if (itemDetails) {
      setFormData({
        category: itemDetails.category || "",
        title: itemDetails.title || "",
        description: itemDetails.description || "",
        brand: itemDetails.brand || "",
        condition: itemDetails.condition || "",
        price: itemDetails.price || "",
        location: itemDetails.location || "",
        mobileNumber: itemDetails.mobileNumber || "",
        username: itemDetails.username || "",
        uid: itemDetails.uid || "",
        timestamp: itemDetails.timestamp || "",
        imageUrl: itemDetails.imageUrl || "",
      });
    }
  }, [itemDetails]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewImage(selectedImage);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleUpdate = () => {
  //   console.log("Update button clicked");

  //   dispatch(updateProduct(formData, itemId));
  //   navigate(`/item/${itemId}`);
  // };

  const handleUpdate = async () => {
    console.log("Update button clicked");

    try {
      if (newImage) {
        const imageRef = ref(storage, "products/" + newImage.name);
        await uploadBytes(imageRef, newImage);
        const newImageUrl = await getDownloadURL(imageRef);

        setFormData({
          ...formData,
          imageUrl: newImageUrl,
        });
      }

      dispatch(updateProduct(formData, itemId));
      navigate(`/item/${itemId}`);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <Container sx={{ margin: 5 }}>
      <Typography variant="h4" gutterBottom>
        Update Item
      </Typography>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error: {error}</Typography>
      ) : (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* <TextField
            label="UID"
            value={formData.uid}
            name="uid"
            variant="outlined"
            disabled
          />
          <TextField
            label="Timestamp"
            value={formData.timestamp}
            name="timestamp"
            variant="outlined"
            disabled
          /> */}

          <label className="form-label">
            Change Photo:
            <input
              className="form-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          <TextField
            label="Category"
            value={formData.category}
            name="category"
            variant="outlined"
            disabled
          />
          <TextField
            label="Ad Title"
            value={formData.title}
            name="title"
            variant="outlined"
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Description"
            value={formData.description}
            name="description"
            variant="outlined"
            multiline
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Brand"
            value={formData.brand}
            name="brand"
            variant="outlined"
            onChange={handleInputChange}
            required
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="condition">Condition</InputLabel>
            <Select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              label="Condition"
              required
            >
              {conditionOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Price"
            value={formData.price}
            name="price"
            variant="outlined"
            type="number"
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Location"
            value={formData.location}
            name="location"
            variant="outlined"
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Username"
            value={formData.username}
            name="username"
            variant="outlined"
            disabled
          />
          <TextField
            label="Mobile Number"
            value={formData.mobileNumber}
            name="mobileNumber"
            variant="outlined"
            type="number"
            onChange={handleInputChange}
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Update Item
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default UpdateItem;
