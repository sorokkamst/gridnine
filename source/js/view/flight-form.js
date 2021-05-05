export const createFormTemplate = () => {

  return `<h2 class="visually-hidden">Блок фильтрации доступных авиабилетов</h2>
  <form action="#" class="page-body__form form" autocomplete="off">
  <fieldset class="form__fieldset sort">
    <legend class="form__fieldset-legend">Сортировать</legend>
    <div class="form__fieldset-container">
      <input type="radio" name="price-time" id="price-increase" class="sort-checkbox" checked>
      <label class="sort__radio-label" for="price-increase">- по возрастанию цены</label>
      <input type="radio" name="price-time" id="price-decrease" class="sort-checkbox">
      <label class="sort__radio-label" for="price-decrease">- по убыванию цены</label>
      <input type="radio" name="price-time" id="time" class="sort-checkbox">
      <label class="sort__radio-label" for="time">- по времени в пути</label>
    </div>
  </fieldset>
  <fieldset class="form__fieldset filter">
    <legend class="form__fieldset-legend">Фильтровать</legend>
    <div class="form__fieldset-container">
      <input type="checkbox" name="transfer" id="one-transfer" class="filter-transfer">
      <label class="filter__checkbox-label" for="one-transfer">- 1 пересадка</label>
      <input type="checkbox" name="transfer" id="no-transfer" class="filter-transfer">
      <label class="filter__checkbox-label" for="no-transfer">- без пересадок</label>
    </div>
  </fieldset>
  <fieldset class="form__fieldset price">
    <legend class="form__fieldset-legend">Цена</legend>
    <div class="form__fieldset-container">
      <label class="price__input-label" for="price-min">От</label>
      <input type="text" name="price-min" value="0" id="price-min" class="price-input">
      <label class="price__input-label" for="price-max">До</label>
      <input type="text" name="price-max" value="10000" id="price-max" class="price-input">
    </div>
  </fieldset>
  <fieldset class="form__fieldset company">
    <legend class="form__fieldset-legend">Авиакомпании</legend>
    <div class="company-container">
      <input type="checkbox" name="company" id="polish-airlines" class="company__transfer">
      <label class="company__label" for="polish-airlines">- LOT Polish Airlines</label>
    </div>
    <div class="company-container">
      <input type="checkbox" name="company" id="aeroflot" class="company__transfer">
      <label class="company__label" for="aeroflot">- Аэрофлот - российские...</label>
    </div>
  </fieldset>
</form>`;
};
