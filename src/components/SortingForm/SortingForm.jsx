import React, { useState } from "react";
import "./sortingForm.scss";

export const SortingForm = ({ filterSubmit, onReset }) => {
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [argument, setArgument] = useState("");

  function handleNameChange(e) {
    if (e.target.value === "name") {
      setCondition("");
    }
    setName(e.target.value);
  }

  function handleConditionChange(e) {
    setCondition(e.target.value);
  }

  function handleArgumentChange(e) {
    setArgument(e.target.value);
  }

  function onClearFilter() {
    setName("");
    setCondition("");
    setArgument("");
    onReset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    filterSubmit({ name, condition, argument });
  }

  const isNameSelected = name === "name";
  return (
    <form className="sort" onSubmit={handleSubmit}>
      <select
        className="sort__select"
        name="name"
        value={name}
        onChange={handleNameChange}
        required
      >
        <option disabled value="">
          Поле...
        </option>
        <option value="name">Название</option>
        <option value="quantity">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select
        className="sort__select"
        name="condition"
        value={condition}
        onChange={handleConditionChange}
        required
      >
        <option disabled value="">
          Условие...
        </option>
        <option value="equal">Равно</option>
        <option value="contain">Содержит</option>
        <option disabled={isNameSelected} value="greater">
          Больше
        </option>
        <option disabled={isNameSelected} value="less">
          Меньше
        </option>
      </select>
      <input
        name="argument"
        value={argument}
        onChange={handleArgumentChange}
        type="text"
        placeholder="Значение"
        required
        className="sort__field"
      />
      <button className="sort__btn" type="reset" onClick={onClearFilter}>
        Сброс
      </button>
      <button className="sort__btn" type="submit">
        Фильтр
      </button>
    </form>
  );
};
