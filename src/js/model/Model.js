import Api from '../api/Api.js';
import { MENU_NAME_EXISTS, MENU_NAME_NOT_EXISTS } from '../config/config.js';

export default class Model {
  constructor(category) {
    this.category = category;
    this.menuList = [];

    this.loadMenuListByCategory(category);
  }

  async loadMenuListByCategory(category) {
    this.category = category;
    this.menuList = await Api.getAllMenuByCategory(category);
  }

  async addMenuItem(name, price) {
    this._findIndexByMenuName(name);

    await Api.addMenu(this.category, name);
    await this.loadMenuListByCategory(this.category);
  }

  async editMenuItem(id, name) {
    this._findDuplicatedMenuName(name);

    await Api.editMenu(this.category, id, name);
    await this.loadMenuListByCategory(this.category);
  }

  async toggleSoldOutMenu(id) {
    await Api.toggleSoldOutMenu(this.category, id);
    await this.loadMenuListByCategory(this.category);
  }

  async removeMenuItem(id) {
    if (id < 0) {
      throw MENU_NAME_NOT_EXISTS;
    }

    await Api.removeMenu(this.category, id);
    await this.loadMenuListByCategory(this.category);
  }

  // setter, getter

  setCategory(category) {
    this.category = category;
  }

  getCategory() {
    return this.category;
  }

  getMenuItemList() {
    return this.menuList;
  }

  getMenuCount() {
    return this.menuList.length;
  }

  // private method

  _findIndexByMenuName(name) {
    const result = this.menuList.find((menuItem) => menuItem.name === name);
    if (result) {
      throw MENU_NAME_EXISTS;
    }
  }

  _findDuplicatedMenuName(name, id) {
    const result = this.menuList.find(
      (menuItem) => menuItem.name === name && menuItem.id !== id,
    );
    if (result) {
      throw MENU_NAME_EXISTS;
    }
  }
}
