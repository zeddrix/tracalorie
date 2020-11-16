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
    logData: () => {
      return data;
    },
  };
})();

const UICtrl = (() => {
  return {};
})();

const App = ((ItemCtrl, UICtrl) => {
  console.log(ItemCtrl.logData());

  return {
    init: () => {
      console.log("Initializing app...");
    },
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
