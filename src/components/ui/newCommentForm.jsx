import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextAreaField from "../common/form/textAreaField";

const NewCommentForm = ({ onAddComment }) => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    content: ""
  });

  useEffect(() => validate(), [data]);

  const validatorConfig = {
    content: {
      isRequired: { content: "Введите текст сообщения" }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onAddComment(data);
    setData({
      content: ""
    });
  };

  return (
    <div className="card mb-4 p-3">
      <h1>New comment</h1>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <TextAreaField
          rows="3"
          name="content"
          value={data.content}
          onChange={handleChange}
          error={errors.content}
        />
        <button
          className="btn btn-primary align-self-end"
          type="submit"
          disabled={!isValid}
        >
          Опубликовать
        </button>
      </form>
    </div>
  );
};

NewCommentForm.propTypes = {
  onAddComment: PropTypes.func
};

export default NewCommentForm;
