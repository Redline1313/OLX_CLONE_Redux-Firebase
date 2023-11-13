import { faFigma } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faClose,
  faGear,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import NoData from "../../assets/not-found.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./ViewMore.css";
import Card2 from "../../components/Card2/Card2";
import Cards from "../../components/Cards/Cards";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import "react-loading-skeleton/dist/skeleton.css";
import CustomSkeleton2 from "../../components/CustomSkeleton/CustomSkeleton2";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import {
  ViewFetchProducts,
  setSortBy,
  setPriceRange,
  toggleDisplayCard2,
  setSortedProducts,
} from "../../store/actions/viewMoreActions";
import { useDispatch, useSelector } from "react-redux";

const ViewMore = () => {
  const [show, setIsShow] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");
  const queryParmasSearch = queryString.parse(location.search);
  const searchQuery = queryParmasSearch.searchQuery || "";

  // const [products, setProducts] = useState([]);
  // const [sortBy, setSortBy] = useState("Newly listed");
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(1000000);
  // const [displayCard2, setDisplayCard2] = useState(true);
  // const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const viewMoreState = useSelector((state) => state.viewMore);

  const { products, sortBy, minPrice, maxPrice, displayCard2, loading } =
    viewMoreState;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(ViewFetchProducts());
  }, [dispatch]);

  const closeFilter = () => {
    setIsShow(false);
  };

  const filterProducts = () => {
    if (!products) {
      return [];
    }
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
      console.log("products", products);
    }
    filtered = filtered.filter((product) => {
      const productTitle = product.title.toLowerCase();
      return productTitle.includes(searchQuery.toLowerCase());
    });
    console.log("Before price filter:", filtered);

    filtered = filtered.filter((product) => {
      const productPrice = parseFloat(product.price);
      return productPrice >= minPrice && productPrice <= maxPrice;
    });

    console.log("After price filter:", filtered);
    return filtered;
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    dispatch(setSortBy(selectedSortOption));

    let sortedProducts = [...filteredProducts];
    if (selectedSortOption === "Newly listed") {
      sortedProducts.sort((a, b) => b.timestamp - a.timestamp);
    } else if (selectedSortOption === "Lowest price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSortOption === "Highest price") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    dispatch(setSortedProducts(sortedProducts));
    console.log("sortedProducts", sortedProducts);
  };

  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      dispatch(setPriceRange(parseFloat(value), maxPrice));
    } else if (name === "maxPrice") {
      dispatch(setPriceRange(minPrice, parseFloat(value)));
    }
  };

  const toggleCardDisplay2 = () => {
    dispatch(toggleDisplayCard2());
  };

  const filteredProducts = filterProducts();

  const highlightSearchQuery = (text) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi");

    return text.split(regex).map((part, index) => {
      if (regex.test(part)) {
        return (
          <span className="highlighted" key={index}>
            {part}
          </span>
        );
      }

      return part;
    });
  };
  const numberOfAds = filteredProducts.length;

  return (
    <div className="ViewMore-Wrapper">
      <h2>
        {selectedCategory
          ? `${selectedCategory} in Pakistan`
          : "All Categories in Pakistan"}
      </h2>

      <div className="Container-ViewMore">
        <div className="Sidebar">
          Filter
          <div className="line"></div>
          <div className="box-Categories">
            <h3>Categories</h3>
            <ul>
              <a href="#"> All Categories</a>

              <a href="#">
                <li>Mobiles</li>
              </a>
              <a href="#">
                <li>vehicles</li>
              </a>
              <a href="#">
                <li>Animals</li>
              </a>
              <a href="#">
                <li>Electronice Appliances</li>
              </a>
              <a href="#">
                <li>Kids</li>
              </a>
            </ul>
          </div>
          <div className="line"></div>
          <h3>LOCATION</h3>
          <div className="box-location">
            <select className="select-input" name="" id="">
              <option value="khi">Karachi</option>
              <option value="fsd">Faisalabad</option>
              <option value="lhr">Lahore</option>
              <option value="Isl">Islamabad</option>
            </select>
          </div>
          <div className="box-price">
            <h3>PRICE</h3>
            <p>Min Price: Rs {minPrice}</p>
            <p>Max Price: Rs {maxPrice}</p>
            <input
              type="range"
              name="minPrice"
              value={minPrice}
              onChange={handlePriceRangeChange}
              min="0"
              max="100000"
            />
            <input
              type="range"
              name="maxPrice"
              value={maxPrice}
              onChange={handlePriceRangeChange}
              min="0"
              max="1000000"
            />
          </div>
          <div className="line"></div>
          <div className="box-Sell">
            <a href="/category">
              <h4>Want to see your stuff here?</h4>
              <p>
                Make some extra cash by selling things in your community. Go on,
                it's quick and easy.
              </p>
              <button>Sell</button>
            </a>
          </div>
        </div>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="Main-Section">
          <div className="Main-top-bar">
            <div className="Main-top-bar-ads">
              <p>
                <b>{numberOfAds} ads</b>
              </p>
            </div>
            <div className="sort-filter-button">
              <button onClick={() => setIsShow(true)}>
                <FontAwesomeIcon
                  icon={faGears}
                  style={{ color: "white", marginRight: "4px" }}
                />
                <b>Filter</b>
              </button>
            </div>
            <div className="Main-top-bar left-bar">
              <p>view</p>
              <div
                className="sort-icon bars"
                onClick={() => toggleCardDisplay2()}
              >
                <FontAwesomeIcon icon={faBars} />
              </div>
              <div
                className="sort-icon figma"
                onClick={() => toggleCardDisplay2()}
              >
                <FontAwesomeIcon icon={faFigma} />
              </div>
              <p>sort by:</p>
              <select value={sortBy} onChange={handleSortChange}>
                <option value="Newly listed">
                  <>Newly listed</>
                </option>
                <option value="Lowest price">Lowest price</option>
                <option value="Highest price">Highest price</option>
              </select>
            </div>
          </div>
          <div className="line"></div>
          <div className="Display-Cards">
            {loading ? (
              <CustomSkeleton2 />
            ) : filteredProducts.length === 0 ? (
              <div className="Display-Cards-NoData">
                <h2>
                  Oops... we didn't find anything that matches this search
                </h2>
                <p>
                  Try to search for something more general, change the filters
                  or check for spelling mistakes
                </p>
                <img src={NoData} alt="No Data Found" />
              </div>
            ) : displayCard2 ? (
              filteredProducts.map((product, index) => (
                <Card2
                  key={index}
                  itemId={product.itemId}
                  image={product.imageUrl}
                  price={highlightSearchQuery(product.price)}
                  title={highlightSearchQuery(product.title)}
                  brand={highlightSearchQuery(product.brand)}
                  location={highlightSearchQuery(product.location)}
                  timestamp={product.timestamp}
                />
              ))
            ) : (
              filteredProducts.map((product, index) => (
                <div className="Display-Cards2" key={index}>
                  <Cards
                    itemId={product.itemId}
                    image={product.imageUrl}
                    price={highlightSearchQuery(product.price)}
                    title={highlightSearchQuery(product.title)}
                    brand={highlightSearchQuery(product.brand)}
                    location={highlightSearchQuery(product.location)}
                    timestamp={product.timestamp}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <BackToTopButton />
      {show && (
        <div className="sort-filter-container">
          <div className="Close-Filter">
            <button onClick={closeFilter}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div className="Filter-Sidebar">
            <div className="Filter-box-Categories">
              <h3>Categories</h3>
              <ul>
                <a href="#"> All Categories</a>

                <a href="#">
                  <li>Mobiles</li>
                </a>
                <a href="#">
                  <li>vehicles</li>
                </a>
                <a href="#">
                  <li>Animals</li>
                </a>
                <a href="#">
                  <li>Electronice Appliances</li>
                </a>
                <a href="#">
                  <li>Kids</li>
                </a>
              </ul>
            </div>
            <div className="line"></div>
            <div className="Filter-box-location">
              <h3>LOCATION</h3>
              <select className="select-in" name="" id="">
                <option value="khi">Karachi</option>
                <option value="fsd">Faisalabad</option>
                <option value="lhr">Lahore</option>
                <option value="Isl">Islamabad</option>
              </select>
            </div>
            <div className="Filter-box-price">
              <h3>PRICE</h3>
              <p>Min Price: Rs {minPrice}</p>
              <p>Max Price: Rs {maxPrice}</p>
              <input
                type="range"
                name="minPrice"
                value={minPrice}
                onChange={handlePriceRangeChange}
                min="0"
                max="100000"
              />
              <input
                type="range"
                name="maxPrice"
                value={maxPrice}
                onChange={handlePriceRangeChange}
                min="0"
                max="100000"
              />
            </div>
          </div>
          <div className=" Filter-cardsType">
            <div
              className="sort-filter-icon SFI"
              onClick={() => toggleDisplayCard2()}
            >
              <FontAwesomeIcon icon={faBars} style={{ marginRight: "5px" }} />{" "}
              LIST
            </div>
            <div
              className="sort-filter-icon SFI "
              onClick={() => toggleDisplayCard2()}
            >
              <FontAwesomeIcon icon={faFigma} style={{ marginRight: "5px" }} />
              MOSAIC
            </div>
          </div>
          <div className="line"></div>
          <div className="Filter-list">
            <select value={sortBy} onChange={handleSortChange}>
              <option value="Newly listed">
                <p>Newly listed</p>
              </option>
              <option value="Lowest price">Lowest price</option>
              <option value="Highest price">Highest price</option>
            </select>
          </div>
          <div className="line"></div>
          <div className="sort-filter-button-close">
            <button onClick={closeFilter}>
              <FontAwesomeIcon
                icon={faGears}
                style={{ color: "white", marginRight: "4px" }}
              />
              <b>Apply Filter</b>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMore;
