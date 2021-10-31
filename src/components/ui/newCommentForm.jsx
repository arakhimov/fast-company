import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import TextAreaField from "../common/form/textAreaField";

const NewCommentForm = ({ users, onAddComment }) => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    message: "",
    user: { name: "", value: "" }
  });

  useEffect(() => validate(), [data]);

  const validatorConfig = {
    user: {
      isRequired: { message: "Выберите имя пользователя" }
    },
    message: {
      isRequired: { message: "Введите текст сообщения" }
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
    onAddComment(data.message, data.user._id);
    setData({
      message: "",
      user: { name: "", value: "" }
    });
  };

  return (
    <div className="card mb-4 p-3">
      <h1>New comment</h1>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <SelectField
          defaultValue="Выберите пользователя"
          name="user"
          options={users}
          value={data.user.name}
          onChange={handleChange}
          error={errors.user}
        />
        <TextAreaField
          rows="3"
          name="message"
          value={data.message}
          onChange={handleChange}
          error={errors.message}
        />
        <button
          className="btn btn-primary w-25 align-self-end"
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
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onAddComment: PropTypes.func
};

export default NewCommentForm;
