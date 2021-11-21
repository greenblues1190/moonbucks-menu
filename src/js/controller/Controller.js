import Model from '../model/Model.js';
import {
  EMPTY_VALUE,
  NOT_NUMBER,
  OUT_OF_PRICE_RANGE,
} from '../config/config.js';

export default class Controller {
  constructor(view) {
    this.model = new Model();
    this.view = view;

    this.loadMenuList('espresso');
  }

  async loadMenuList(category) {
    try {
      await this.model.loadMenuListByCategory(category);
    } catch (e) {
      console.error(e);
    }

    this.view.render(this.model.getMenuItemList());
  }

  loadCategory(e) {
    const category = this.view.selectCategory(e);
    this.loadMenuList(category);
  }

  async addMenuItem() {
    const { name, price } = this.view.getMenuInput();
    const trimmedName = this._validateMenuName(name);
    // const trimmedPrice = this._validateMenuPrice(price);
    const trimmedPrice = 0;

    try {
      await this.model.addMenuItem(trimmedName, trimmedPrice);
    } catch (e) {
      alert(e);
    }

    this.view.render(this.model.getMenuItemList());
    this.view.clearMenuInput();
  }

  async editMenuItem(e) {
    const menuId = this.view.getMenuId(e);
    const newName = this._validateMenuName(this.view.getNewMenuName(e));
    // const newPrice = this._validateMenuPrice(this.view.getNewMenuPrice(e));

    try {
      await this.model.editMenuItem(menuId, newName);
    } catch (e) {
      alert(e);
    }

    this.view.render(this.model.getMenuItemList());
  }

  async toggleSoldOutMenu(e) {
    const menuId = this.view.getMenuId(e);

    try {
      await this.model.toggleSoldOutMenu(menuId);
    } catch(e) {
      alert(e)
    }

    this.view.render(this.model.getMenuItemList());
  }

  async removeMenuItem(e) {
    const menuId = this.view.getMenuId(e);

    if (this.view.getWillRemoveMenuItem(e)) {
      try {
        await this.model.removeMenuItem(menuId);
      } catch(e) {
        alert(e)
      }
      this.view.render(this.model.getMenuItemList());
    }
  }

  // private method

  _validateMenuName(name) {
    const trimmedName = name.trim();

    if (trimmedName === '') {
      throw EMPTY_VALUE;
    }

    return trimmedName;
  }

  _validateMenuPrice(price) {
    const trimmedPrice = price.trim();
    const re = /^\d+$/;

    if (!re.test(trimmedPrice)) {
      throw NOT_NUMBER;
    }

    const intPrice = parseInt(trimmedPrice);
    if (intPrice < 0 || intPrice > 999999) {
      throw OUT_OF_PRICE_RANGE;
    }

    return trimmedPrice;
  }
}
