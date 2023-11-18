// app.js
document.addEventListener('DOMContentLoaded', function () {
  const menuList = document.getElementById('menu-list');
  const menuForm = document.getElementById('menu-form');
  const addItemButton = document.getElementById('addItemButton');
  const totalOrderDisplay = document.getElementById('total-order');

  const menuItems = [];
  let totalOrder = 0;

  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  }

  function renderMenu() {
    menuList.innerHTML = '';
    menuItems.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${item.name} - ${formatCurrency(item.price)}
              <button onclick="editItem(${index})">Edit</button>
              <button onclick="deleteItem(${index})">Delete</button>`;
      menuList.appendChild(listItem);
    });
    calculateTotalOrder(); // Perbarui total setelah render menu
  }

  function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (itemName && !isNaN(itemPrice)) {
      menuItems.push({ name: itemName, price: itemPrice });
      renderMenu();
      clearForm();
    } else {
      alert('Mohon masukkan nama item dan harga yang valid.');
    }
  }

  function editItem(index) {
    const newName = prompt('Masukkan nama item baru:', menuItems[index].name);
    const newPrice = parseFloat(prompt('Masukkan harga item baru:', menuItems[index].price));

    if (newName !== null && !isNaN(newPrice)) {
      menuItems[index].name = newName;
      menuItems[index].price = newPrice;
      renderMenu();
    } else {
      alert('Mohon masukkan nama item dan harga yang valid.');
    }
  }

  function deleteItem(index) {
    const confirmDelete = confirm(`Anda yakin ingin menghapus ${menuItems[index].name}?`);
    if (confirmDelete) {
      menuItems.splice(index, 1);
      renderMenu();
    }
  }

  function clearForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
  }

  function calculateTotalOrder() {
    totalOrder = menuItems.reduce((total, item) => total + item.price, 0);
    totalOrderDisplay.textContent = `Total Pesanan: ${formatCurrency(totalOrder)}`;
  }

  function handleListClick(event) {
    const target = event.target;

    if (target.tagName === 'BUTTON' && target.parentNode.tagName === 'LI') {
      const index = Array.from(target.parentNode.parentNode.children).indexOf(target.parentNode);
      if (target.textContent === 'Edit') {
        editItem(index);
      } else if (target.textContent === 'Delete') {
        deleteItem(index);
      }
    }
  }

  addItemButton.addEventListener('click', addItem);
  menuList.addEventListener('click', handleListClick);

  // Render daftar menu saat aplikasi dimuat
  renderMenu();
});
