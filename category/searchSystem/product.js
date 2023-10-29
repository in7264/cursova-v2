// JavaScript код для завантаження та відображення інформації про товари з файлу JSON
fetch('products.json') // Передпоставте шлях до вашого файлу JSON
.then(response => response.json())
.then(data => {
    const productList = document.getElementById('product-list');
    data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Ціна: ${product.price} грн</p>
            <p>${product.description}</p>
            <button class="buy-button" data-product="${product.name}">Купити</button>
        `;
        productList.appendChild(productDiv);
    });

    // Ініціалізація обробників подій після завантаження товарів
    initializeEventHandlers();
})
.catch(error => console.error('Помилка завантаження товарів:', error));

// JavaScript код для додавання товарів до корзини та збереження їх в localStorage
function initializeEventHandlers() {
const buyButtons = document.querySelectorAll('.buy-button');
const cartItems = document.getElementById('cart-items');

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const cartItem = document.createElement('li');
        cartItem.textContent = `1 x ${productName}`;
        cartItems.appendChild(cartItem);

        // Зберігаємо стан корзини в localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(productName);
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

// Відображення збереженого вмісту корзини при завантаженні сторінки
const savedCart = JSON.parse(localStorage.getItem('cart'));
if (savedCart) {
    savedCart.forEach(productName => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `1 x ${productName}`;
        cartItems.appendChild(cartItem);
    });
}
}