const ItemCtrl = (() => {
  const Item = (id, name, calories) => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: [
      { id: 0, name: "Steak Dinner", calories: 1200 },
      { id: 1, name: "Cookie", calories: 400 },
      { id: 2, name: "Eggs", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    getItems: () => {
      return data.items;
    },
    logData: () => {
      return data;
    },
  };
})();

const UICtrl = (() => {
  const UISelectors = {
    itemList: "#item-list",
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
  };
})();

const App = ((ItemCtrl, UICtrl) => {
  return {
    init: () => {
      const items = ItemCtrl.getItems();
      console.log(items);

      UICtrl.populateItemList(items);
    },
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
