const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const items = getItemsFromStorage();
    items.forEach(item => addItemToDOM(item));
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value; 

    // Validate Input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }

    // Create item DOM element
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
};

function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
}


function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);
    
    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeAllItems() {
    const allItems = itemList.querySelectorAll('li');
    for (item of allItems) {
        item.remove();
    }

    // Clear from localStorage
    localStorage.removeItem('items');

    checkUI();
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}


function onClickItem(e) {
    if (e.target.className === 'fa-solid fa-xmark') {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        // Remove item from DOM
        item.remove();

        // Remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(itemToRemove) {
    let itemsFromStorage = getItemsFromStorage();

    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter(item => item !== itemToRemove);

    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const filter = e.target.value.toLowerCase();
    
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if (itemName.indexOf(filter) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
     
}

function checkUI() {
    itemInput.value = '';
    
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearAllButton.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearAllButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}

// Initalize app
function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    clearAllButton.addEventListener('click', removeAllItems);
    itemList.addEventListener('click', onClickItem);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();














