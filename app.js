const ItemCtrl = (() => {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", calories: 1200 },
      // { id: 1, name: "Cookie", calories: 400 },
      // { id: 2, name: "Eggs", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    getItems: () => data.items,
    addItem: (name, calories) => {
      console.log(name, calories);
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);

      newItem = new Item(ID, name, calories);
      data.items.push(newItem);
      return newItem;
    },
    getItemById: (id) => {
      let found = null;
      data.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: (item) => (data.currentItem = item),
    getCurrentItem: () => data.currentItem,
    getTotalCalories: () => {
      let total = 0;
      data.items.forEach((item) => {
        total += item.calories;
      });

      data.totalCalories = total;
      return data.totalCalories;
    },
    logData: () => data,
  };
})();

const UICtrl = (() => {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };

  return {
    populateItemList: (items) => {
      let html = "";

      items.forEach((item) => {
        html += `
         <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
         </li>
         `;
      });

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: (item) => {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `
         <strong>${item.name}: </strong><em>${item.calories} Calories</em>
         <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInputs: () => {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: () => {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    showTotalCalories: (totalCalories) => {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: () => {
      UICtrl.clearInputs();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: () => UISelectors,
  };
})();

const App = ((ItemCtrl, UICtrl) => {
  const itemAddSubmit = (e) => {
    const input = UICtrl.getItemInput();

    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      UICtrl.addListItem(newItem);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      UICtrl.clearInputs();
    }

    e.preventDefault();
  };

  const itemUpdateSubmit = (e) => {
    if (e.target.classList.contains("edit-item")) {
      const listID = e.target.parentNode.parentNode.id;

      const listIDArr = listID.split("-");
      const id = parseInt(listIDArr[1]);

      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit);

      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemUpdateSubmit);
  };

  return {
    init: () => {
      UICtrl.clearEditState();

      const items = ItemCtrl.getItems();
      console.log(items);

      UICtrl.populateItemList(items);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
