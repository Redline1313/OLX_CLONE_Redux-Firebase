import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, storage } from "../../config/firebase";
import "./Additem.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/actions/addItemActions";
// import { serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { serverTimestamp } from "@firebase/firestore";
import { Container, Typography } from "@mui/material";
const conditionOptions = [
  "New",
  "Open Box",
  "Used",
  "Refurbished",
  "For Parts or Not Working",
];

const conditionaLocation = ["Karachi", "Faisalabad", "Lahore", "Islamabad"];

const AddItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category");

  const [category, setCategory] = useState(initialCategory || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [locationInput, setLocation] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsernameInput(user.displayName || "");
        setUid(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const imageRef = ref(storage, "products/" + image.name);
      await uploadBytes(imageRef, image);

      const imageUrl = await getDownloadURL(imageRef);
      let obj = {
        uid: uid,
        category: category,
        title: title,
        description: description,
        brand: brand,
        condition: condition,
        price: price,
        location: locationInput,
        mobileNumber: mobileNumber,
        imageUrl: imageUrl,
        username: usernameInput,
        timestamp: serverTimestamp(),
      };

      dispatch(addItem(obj));

      toast.success("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred while adding the item");
    } finally {
      setIsSubmitting(false);
      navigate("/");
    }
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <Container maxWidth="md" className="add-item-container">
      <Typography variant="h4" className="add-item-title">
        POST YOUR AD
      </Typography>
      <form onSubmit={handleSubmit} className="add-form">
        <label className="form-label">
          Category:
          <input
            className="form-input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            readOnly
          />
        </label>
        <label className="form-label">
          Ad Title:
          <input
            className="form-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Description:
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Brand:
          <input
            className="form-input"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Condition:
          <select
            className="form-select"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            placeholder="Select the Condition"
          >
            {conditionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Price:
          <input
            className="form-input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Upload Photo:
          <input
            required
            className="form-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <label className="form-label">
          Location:
          <select
            className="form-input"
            value={locationInput}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Select Location"
          >
            {conditionaLocation.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="form-label">
          Username:
          <input
            className="form-input"
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
            readOnly
          />
        </label>

        <label className="form-label">
          Mobile Number:
          <input
            className="form-input"
            type="number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </label>
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <i className="spinner">
              <FontAwesomeIcon
                icon={faSpinner}
                className={isSubmitting ? "spin" : ""}
              />
            </i>
          ) : (
            "Post now"
          )}
        </button>
      </form>

      <ToastContainer className="toast-position" position="bottom-right" />
      <BackToTopButton />
    </Container>
  );
};

export default AddItem;
