import React, { useEffect, useState } from "react";
import classes from "./CategoryPage.module.css";
import PageContainer from "../page-container/PageContainer";
import { connect } from "react-redux";
import {
  editRoomCategory,
  addRoomCategory,
  fetchRoomCategories,
} from "../../../redux/actions/room-category-action";
import TextInput from "../../shared-components/TextInput/TextInput";
import { FormButton } from "../../shared-components/Button/Button";
import Modal from "../../shared-components/Modal/Modal";

import Spinner from "../../shared-components/Spinner/Spinner";

import styles from "../../common.module.css";

const CategoryPage = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loadCategories, createCategory, updateCategory } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const { categories } = props;

  let pageContent = <Spinner />;

  const openModalHandler = (category = null) => {
    if (category) {
      setIsEditing(true);
      setCategoryName(category.category_name);
    }
    setIsModalOpen((prevSate) => !prevSate);
  };

  const categoryClickHandler = (category) => {
    setActiveCategoryId(category.id);
    openModalHandler(category);
  };

  const valueChangeHandler = (event) => {
    setCategoryName(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!isEditing) {
      await createCategory({ categoryName });
    } else {
      await updateCategory(activeCategoryId, { categoryName });
    }
    openModalHandler();
  };

  const createButtonClickHandler = () => {
    setIsModalOpen(true);
    setIsEditing(false);
  };
  // LOGICAL EXPRESSIONS

  if (!props.loading) {
    pageContent = categories.map((category) => (
      <div
        className={classes.CategoryCard}
        onClick={() => categoryClickHandler(category)}
        key={category.id}
      >
        <h3 className={classes.CategoryName}>{category.category_name}</h3>
        <h1 className={classes.RoomCount}>{category.rooms.length}</h1>
      </div>
    ));
  }
  return (
    <React.Fragment>
      <PageContainer>
        <br></br>
        <h1 className={styles.PageHeading}> Room categories</h1>
        <FormButton onClick={createButtonClickHandler}>
          CREATE CATEGORY
        </FormButton>
        <div className="row">{pageContent}</div>
      </PageContainer>

      <Modal open={isModalOpen} onToggle={openModalHandler}>
        <form onSubmit={submitHandler}>
          <TextInput
            placeholder="Category name"
            name="categoryName"
            value={categoryName}
            onChange={valueChangeHandler}
            type="text"
          ></TextInput>
          <FormButton loading={props.loading}>Save</FormButton>
        </form>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  categories: state.roomCategory.roomCategories,
  loading: state.roomCategory.loading,
  error: state.roomCategory.error,
});

const mapDispatchToProps = (dispatch) => ({
  updateCategory: (id, data) => dispatch(editRoomCategory(id, data)),
  loadCategories: () => dispatch(fetchRoomCategories()),
  createCategory: (data) => dispatch(addRoomCategory(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
