// Storage Controller

const StorageCtrl = (function() {
    // Public methods
    return {
        storeItems: function(item) {
            let items;
            // Check if any items in Local Storage
            if (localStorage.getItem('items') === null) {
                items = [];
                // Push new item
                items.push(item);
                // Set Local Storage
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // Get what is already in ls
                items = JSON.parse(localStorage.getItem('items'));
                // Push new item
                items.push(item);
                // Set Local Storage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function() {
            let items;
            // Check if any items in Local Storage
            if (localStorage.getItem('items') === null) {
                items = [];
            } else {
                // Get what is already in ls
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index) {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index) {
                if (id === item.id) {
                    items.splice(index, 1);
                }
            });

            localStorage.setItem('items', JSON.stringify(items));
        },
        clearItemsFromStorage: function() {
            localStorage.removeItem('items');
        }
    }
})();


// Item Controller
const ItemCtrl = (function() {
    // Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        // items: [
        //     // {
        //     //     id: 0,
        //     //     name: 'Steak Dinner',
        //     //     calories: 1200
        //     // },
        //     // {
        //     //     id: 1,
        //     //     name: 'Cookie',
        //     //     calories: 400
        //     // },
        //     // {
        //     //     id: 2,
        //     //     name: 'Eggs',
        //     //     calories: 300
        //     // }
        // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calories) {
            let ID;
            // Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Calories to number 
            calories = parseInt(calories);
            // Create new item
            newItem = new Item(ID, name, calories);
            // Add to items array
            data.items.push(newItem);
            return newItem;
        },
        getTotalCalories: function() {
            let total = 0;
            data.items.forEach(function(item) {
                total += item.calories;
            });
            data.totalCalories = total;

            return data.totalCalories;
        },
        getItemByID: function(id) {
            let found = null;
            data.items.forEach(function(item) {
                if (item.id === id) {
                    found = item;
                }
            });

            return found;
        },
        updateItem: function(name, calories) {
            // Calories to number
            calories = parseInt(calories);
            let found = null;
            data.items.forEach(function(item) {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function(id) {
            // Get IDs
            const ids = data.items.map(function(item) {
                return item.id;
            });
            // Get index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function() {
            data.items = [];
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        logData: function() {
            return data;
        }
    }
})();



// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemlist: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    // Public Methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(item => {
                html += `<li id="item-${item.id}" class="collection-item"><strong>${item.name}: </strong><em>${item.calories} Callories</em>
                <a href="#" class="edit-item secondary-content"><i class="fa fa-pencil"></i></a></li>`;
            });

            document.querySelector(UISelectors.itemlist).innerHTML = html;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item) {
            // Show the list 
            document.querySelector(UISelectors.itemlist).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            li.className = 'collection-item';
            // Add id
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Callories</em>
            <a href="#" class="edit-item secondary-content"><i class="fa fa-pencil"></i></a>`;
            // Insert item
            document.querySelector(UISelectors.itemlist).insertAdjacentElement('beforeend', li);
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // Turn Node list into array
            listItems = Array.from(listItems);
            listItems.forEach(function(listItem) {
                const itemID = listItem.getAttribute('id');
                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Callories</em>
                    <a href="#" class="edit-item secondary-content"><i class="fa fa-pencil"></i></a>`;
                }
            });
        },
        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        clearItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // Turn node list into Array
            listItems = Array.from(listItems);

            listItems.forEach(function(item) {
                item.remove();
            });
        },
        hideList: function() {
            document.querySelector(UISelectors.itemlist).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function() {
            return UISelectors;
        }
    }
})();



// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();

        // Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // Add icon event
        document.querySelector(UISelectors.itemlist).addEventListener('click', itemEditClick);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Add icon event
        document.querySelector(UISelectors.itemlist).addEventListener('click', itemEditClick);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Clear items list
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

    // Add item submit 
    const itemAddSubmit = function(e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();
        if (input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add item to UI list
            UICtrl.addListItem(newItem);
            //  Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add Total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Store in LS
            StorageCtrl.storeItems(newItem);

            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Click edit item
    const itemEditClick = function(e) {
        if (e.target.parentNode.classList.contains('edit-item')) {
            // Get list item id (item-0, item-0)
            const listId = e.target.parentNode.parentNode.id;
            // Break into an array
            const listIdArr = listId.split('-');
            // Get acrual ID
            const id = parseInt(listIdArr[1]);
            // Get item
            const itemToEdit = ItemCtrl.getItemByID(id);
            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);
            // Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    // Update item submit
    const itemUpdateSubmit = function(e) {
        // Get item input
        const input = UICtrl.getItemInput();
        // Update item
        const UpdatedItem = ItemCtrl.updateItem(input.name, input.calories);
        // Update UI
        UICtrl.updateListItem(UpdatedItem);

        //  Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add Total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Update local Storage
        StorageCtrl.updateItemStorage(UpdatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // Delete item submit
    const itemDeleteSubmit = function(e) {
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete list item from UI
        UICtrl.deleteListItem(currentItem.id);

        //  Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add Total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Delete from LS
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // Clear items event
    const clearAllItemsClick = function() {
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        //  Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add Total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Сlear Storage
        StorageCtrl.clearItemsFromStorage();

        // Remove from UI
        UICtrl.clearItems();

        // Hide UL
        UICtrl.hideList();

    }

    // Public Methods
    return {
        init: function() {
            // Clear edit state / set initial set
            UICtrl.clearEditState();
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if any items 
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }
            //  Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add Total calories to UI
            UICtrl.showTotalCalories(totalCalories);


            // Load event listeners
            loadEventListeners();
        }
    }


})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App

App.init();