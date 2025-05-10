import Carousel from "react-multi-carousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/product.action";
import "react-multi-carousel/lib/styles.css";
import { LoadingElementComponent } from "../loadingelement.component";

const getCategoryImg = (imgType) => {
  let CategoriesImg = require("../../assets/images/no-pictures.png");
  if (imgType === "CLOTHING") {
    CategoriesImg = require("../../assets/images/clean-clothes.png");
  }
  if (imgType === "SHOES") {
    CategoriesImg = require("../../assets/images/running-shoes.png");
  }
  if (imgType === "WATCHES") {
    CategoriesImg = require("../../assets/images/wristwatch.png");
  }
  return CategoriesImg;
};
const CategorySection = () => {
  const dispatch = useDispatch();
  const { productLists } = useSelector(
    (reduxData) => reduxData.PRODUCTS_REDUCERS
  );
  const responsive = {
    desktop4K: {
      breakpoint: { max: 4000, min: 1440 },
      items: 6,
      slidesToSlide: 6,
    },
    desktop: {
      breakpoint: { max: 1440, min: 768 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 4,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };
  let CategoriesItem = [];
  productLists.forEach((item) => {
    const existingOption = CategoriesItem.find(
      (option) => option.name === item.category
    );
    if (!existingOption) {
      const newOption = {
        name: item.category,
        value: item.category,
      };
      CategoriesItem.push(newOption);
    }
  });
  const listItems = CategoriesItem.map((item) => {
    return (
      <div key={item.name} className="card-item h-100 p-3">
        <div className="card h-100 d-flex flex-column align-items-center p-4">
          <img
            className="w-100 object-fit-cover"
            src={getCategoryImg(item.name)}
            alt=""
          />
          <a href="#/" className="text-decoration-none">
            <h6 className="fw-bold text-center text-uppercase mt-3 mb-1">
              {item.name}
            </h6>
          </a>
        </div>
      </div>
    );
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="category-section">
      <div className="container px-md-5 py-5">
        <div className="title mb-5">
          <h2 className="fw-bold text-uppercase text-center">
            Product Categories
          </h2>
        </div>
        {CategoriesItem.length > 0 ? (
          <Carousel responsive={responsive}>{listItems}</Carousel>
        ) : (
          <LoadingElementComponent />
        )}
      </div>
    </div>
  );
};
export default CategorySection;
