import React, { useEffect, useState } from "react";
import classes from "./CategoryPage.module.css";
import PageContainer from "../DashboardContainer/DashboardContainer";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  editRoomCategory,
  addRoomCategory,
  fetchRoomCategories,
  deleteRoomCategory,
} from "../../../redux/actions/room-category-action";
import TextInput from "../../shared-components/TextInput/TextInput";
import {
  FormButton,
  DeleteButton,
} from "../../shared-components/Button/Button";
import Modal from "../../shared-components/Modal/Modal";
import ConfirmationModal from "../../shared-components/ConfirmationModal/ConfirmationModal";
import Spinner from "../../shared-components/Spinner/Spinner";

import styles from "../../common.module.css";

const CategoryPage = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loadCategories, createCategory, updateCategory } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const deleteCategoryHandler = async (id) => {
    await props.deleteCategory(id);
    setShowConfirmation(false);
  };
  const toggleConfirmationHandler = (id) => {
    setActiveCategoryId(id);
    setShowConfirmation((prevState) => !prevState);
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
      <div className={classes.CategoryCard} key={category.id}>
        <div className={classes.CardHeader}>
          <h3
            className={classes.CategoryName}
            onClick={() => categoryClickHandler(category)}
          >
            {category.category_name}
          </h3>
          <DeleteButton onClick={() => toggleConfirmationHandler(category.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </DeleteButton>
        </div>
        <div
          className={classes.RoomDetails}
          onClick={() => categoryClickHandler(category)}
        >
          <h1 className={classes.RoomCount}>{category.rooms.length}</h1>
          <h1 className={classes.RoomTitle}>
            {category.rooms.length !== 1 ? "ROOMS" : "ROOM"}
          </h1>
        </div>
      </div>
    ));
  }
  return (
    <React.Fragment>
      <PageContainer>
        <h1 className={styles.PageHeading}> Room categories</h1>
        <FormButton onClick={createButtonClickHandler}>
          CREATE CATEGORY
        </FormButton>
        <div className="row">{pageContent}</div>
      </PageContainer>
      <ConfirmationModal
        open={showConfirmation}
        continue={() => deleteCategoryHandler(activeCategoryId)}
        cancel={toggleConfirmationHandler}
      >
        Are you sure you want to delete this category?
      </ConfirmationModal>
      <Modal open={isModalOpen} onToggle={openModalHandler}>
        <form onSubmit={submitHandler} className={classes.CategoryForm}>
          <h3 className={styles.PageHeading}>
            {isEditing ? "CHANGE CATEGORY NAME" : "CREATE ROOM CATEGORY"}
          </h3>
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
  deleteCategory: (id) => dispatch(deleteRoomCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
