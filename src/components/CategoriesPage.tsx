import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppHooks";
import { getAllCategories } from "../redux/reducers/categoryReducer";
import { Dropdown } from "react-bootstrap";

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    console.log(`Selected Category: ${category}`);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {selectedCategory || "Choose a category"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map((cat, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleCategorySelect(cat.name)}>
            {cat.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoriesPage;
