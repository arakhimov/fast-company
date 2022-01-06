import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import api from "../../API";
import { useProfession } from "../../hooks/useProfession";
import { useQuality } from "../../hooks/useQuality";
import { validator } from "../../utils/validator";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioField";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";

const EditForm = ({ data: initialData, update }) => {
  const [data, setData] = useState({
    _id: initialData._id,
    name: initialData.name,
    email: initialData.email,
    sex: initialData.sex,
    profession: initialData.profession,
    qualities: initialData.qualities
  });
  const [errors, setErrors] = useState({});
  const { professions } = useProfession();
  const { qualities } = useQuality();
  const history = useHistory();

  // useEffect(() => {
  //   // api.professions.fetchAll().then((data) => setProfessions(data));
  //   // api.qualities.fetchAll().then((data) => setQualities(data));
  // }, []);

  useEffect(() => validate(), [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Электронная почта введена некорректно" }
    },
    name: {
      isRequired: { message: "Имя обязателено для заполнения" }
    },
    profession: {
      isRequired: { message: "Выберите одну из профессий" }
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
    update(data);
    history.push(`/users/${data._id}`);
  };

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <SelectField
        label="Профессия"
        name="profession"
        onChange={handleChange}
        options={professions}
        defaultValue="Choose..."
        value={data.profession.name}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "other", value: "other" }
        ]}
        name="sex"
        label="Выберите ваш пол"
        onChange={handleChange}
        value={data.sex}
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        name="qualities"
        label="Выберите ваши качества"
        defaultValue={data.qualities}
      />
      <button
        className="btn btn-primary w-25"
        type="submit"
        disabled={!isValid}
      >
        Обновить
      </button>
    </form>
  );
};

EditForm.propTypes = {
  data: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
};

export default EditForm;
