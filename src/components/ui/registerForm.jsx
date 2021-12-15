import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfession } from "../../hooks/useProfession";
// import api from "../../API";
import { useQuality } from "../../hooks/useQuality";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioField";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: { name: "", value: "" },
    sex: "male",
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});

  const { professions } = useProfession();
  const { qualities } = useQuality();
  const { signUp } = useAuth();

  const history = useHistory();

  // useEffect(() => {
  //   api.professions.fetchAll().then((data) => setProfessions(data));
  //   api.qualities.fetchAll().then((data) => setQualities(data));
  // }, []);

  useEffect(() => validate(), [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Электронная почта введена некорректно" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: { message: "Пароль должен содержать хотя бы одно число" },
      isMin: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: { message: "Выберите одну из профессий" }
    },
    license: {
      isRequired: {
        message:
          "Для продолжения работы с сервисом необходимо подтвердить лицензионное соглашение"
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await signUp(data);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
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
      />

      <CheckBoxField
        name="license"
        value={data.license}
        onChange={handleChange}
        error={errors.license}
      >
        <p className="mb-0">
          Подтвердить <a href="">лицензионное соглашение</a>
        </p>
      </CheckBoxField>

      <button
        className="btn btn-primary w-25"
        type="submit"
        disabled={!isValid}
      >
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
