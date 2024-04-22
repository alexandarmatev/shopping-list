const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllButton = document.getElementById('clear');

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value; 

    // Validate Input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    itemInput.value = '';
};

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

function removeAllItems() {
    const allItems = itemList.querySelectorAll('li');
    for (item of allItems) {
        item.remove();
    }
}

function removeItem(e) {
    if (e.target.className === 'fa-solid fa-xmark') {
        e.target.parentElement.parentElement.remove();
    }
}


// Event Listeners
itemForm.addEventListener('submit', addItem);
clearAllButton.addEventListener('click', removeAllItems);
itemList.addEventListener('click', removeItem);










