const $items = document.getElementById('items');
const inputSearch = document.getElementsByClassName('inputSearch')[0]

const displayItems = (items) =>{
    $items.innerHTML= ''
    for (const item of items) {
        const $post = document.createElement('div');
        $post.className = 'tile';
        $post.innerHTML = `
            <img id="${item.id}" class="imgItem" onclick="openModal(${item.id})" width="200" height="200" src="./${item.imgUrl}" alt="item">
            <div class="title">${item.name}</div>
            <div class="stock_status">
                <div class="eclipse">
                    <svg class="" width="15" height="15" viewBox="0 0 15 15" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.62498 10.1063L3.01873 7.50002L2.13123 8.38127L5.62498 11.875L13.125 4.37502L12.2437 3.49377L5.62498 10.1063Z"
                            fill="#1BC943" />
                    </svg>
                </div>
                <b>${item.orderInfo.inStock}</b>&nbsp;left in stock
            </div>
            <div class="price"> Price: <b> ${item.price}</b> $</div>
            <button class="addToCart" onclick="addItemToCart(${item.id})">Add to cart</button>
            <div class="reviews modalReviews">
                <div class="redLike">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.99996 17.7917L8.79163 16.6917C4.49996 12.8 1.66663 10.2333 1.66663 7.08333C1.66663 4.51667 3.68329 2.5 6.24996 2.5C7.69996 2.5 9.09163 3.175 9.99996 4.24167C10.9083 3.175 12.3 2.5 13.75 2.5C16.3166 2.5 18.3333 4.51667 18.3333 7.08333C18.3333 10.2333 15.5 12.8 11.2083 16.7L9.99996 17.7917Z"
                            fill="#F05454" />
                    </svg>
                    <div class="positiveReviews"> <b> ${item.orderInfo.reviews} </b>Positive reviews <br> Above avarage</div>
                    <div class="orders"> <b>${item.orderInfo.orders}</b> orders</div>
                </div>
            </div>
        `;
        $items.appendChild($post);
    }
};

const openModal = (id) => {
    modalOverlay.style.display = "flex";
    body.style.overflow = "hidden";
    const itemModal = items.find((item)=> id === item.id)
    const imgModal = document.querySelector('.imgModal')
    imgModal.src = `${itemModal.imgUrl}`
    const modalTitle = document.querySelector('.modalTitle')
    modalTitle.innerHTML = `${itemModal.name}`
    const reviewsModal = document.querySelector('.reviewsModal')
    reviewsModal.innerHTML = `${itemModal.orderInfo.reviews}% `
    const modalOrders = document.querySelector('.modalOrders')
    modalOrders.innerHTML = `${itemModal.orderInfo.orders} `
    const  color = document.querySelector('.color')
    color.innerHTML = `${itemModal.color} `
    const  operatingSystem = document.querySelector('.operatingSystem')
    operatingSystem.innerHTML = `${itemModal.os} `
    const  chip = document.querySelector('.chip')
    chip.innerHTML = `${itemModal.chip.name} `
    const  height = document.querySelector('.height')
    height.innerHTML = `${itemModal.size.height} cm`
    const  width = document.querySelector('.width')
    width.innerHTML = `${itemModal.size.width} cm`
    const  depth = document.querySelector('.depth')
    depth.innerHTML = `${itemModal.size.depth} cm`
    const  weight = document.querySelector('.weight')
    weight.innerHTML = `${itemModal.size.weight} kg`
    const  modalPrice = document.querySelector('.modalPrice')
    modalPrice.innerHTML = `${itemModal.price} $`
    const  stockLeft = document.querySelector('.stockLeft')
    stockLeft.innerHTML = `${itemModal.orderInfo.inStock}`
};

displayItems(items);

const body = document.querySelector("body");
const filterContainers = document.getElementsByClassName('filterContainer');
const priceTitles = document.getElementsByClassName('priceTitle')
const modalOverlay = document.getElementsByClassName('modalOverlay')[0]
const itemModal = document.getElementsByClassName('itemModal')[0]
const priceRange = document.getElementById('priceRange')

Array.from(filterContainers).forEach((filterContainer) => {
    filterContainer.addEventListener('click', (e) => {
        filterContainer.children[0].classList.toggle('opened');
        filterContainer.children[1].classList.toggle('opened');
    });
});
 
Array.from(priceTitles).forEach((priceTitle) => {
    priceTitle.addEventListener('click', (e) => {
        priceTitle.classList.toggle('opened');
        priceRange.classList.toggle('opened');
    });
});

itemModal.addEventListener('click', (e) => e.stopPropagation());

modalOverlay.addEventListener('click' ,(event) => {
    modalOverlay.style.display = "none";
    body.style.overflow = "auto";
});

inputSearch.addEventListener('input', (e)=> {
    const value = e.target.value.toLowerCase();
    filter.search = value;
    filterItems();
});

const filter = {
    search: '',
    color: [],
    memory: [],
    os: [],
    display: [],
    priceRange: [null, null],
};

const containers = document.getElementsByClassName('container');

const addFilter = (settingsName, value) => {
    filter[settingsName].push(value);
};

const removeFilter = (settingsName, value) => {
    filter[settingsName] = filter[settingsName].filter(settings => JSON.stringify(settings) !== JSON.stringify(value));
};

const hasFilters = () => {
    return Object.values(filter).some((settings) => settings.length) || (filter.priceRange[0] || filter.priceRange[1]) || filter.search;
}

const filterItems = () => {
    if (hasFilters()) {
        const filteredItems = items.filter((item) => {
            let flagSearch = true;
            let flagColor = true;
            let flagMemory = true;
            let flagOs = true;
            let flagDisplay = true;
            let flagPrice = true;
            
            if (filter.search.length) {
                flagSearch = item.name.toLowerCase().includes(filter.search);
            } 

            if (filter.color.length) {
                flagColor = item.color.some(color => filter.color.includes(color));
            } 
    
            if (filter.memory.length) {
                flagMemory = filter.memory.includes(item.storage);
            } 
    
            if (filter.os.length) {
                flagOs = filter.os.includes(item.os);
            } 
            console.log(filter.display);
            if (filter.display.length) {
                filter.display.forEach(([minInches, maxInches]) => {
                    flagDisplay = minInches < item.display && maxInches > item.display;
                });
            }
    
            if (filter.priceRange[0] || filter.priceRange[1]) {
                flagPrice = (filter.priceRange[0] || 0) <= item.price && (filter.priceRange[1] || Infinity) >= item.price; 
            }
    
            return flagSearch && flagColor && flagMemory && flagOs && flagDisplay && flagPrice;
        });
        displayItems(filteredItems);
    } else {
        displayItems(items);
    }
}

Array.from(containers).forEach((container)=> {
    container.addEventListener('change', (e) => {
        const settingsName = e.currentTarget.parentNode.dataset.settings;
        const value = settingsName === 'display' ? JSON.parse(e.target.value) : 
                      settingsName === 'memory' ? +e.target.value : e.target.value;
        if (e.target.checked) {
            addFilter(settingsName, value);
        } else {
            removeFilter(settingsName, value);
        }

        filterItems();
    })
})

const rangePrice = document.getElementsByClassName('rangePrice')

Array.from(rangePrice).forEach((price, index)=> {
    price.addEventListener('input', (e) => {
        filter.priceRange[index] = +e.target.value || null;
        if (isNaN(+e.target.value)){
            e.target.value = "";
        } 
    });
    price.addEventListener('blur', (e)=> {
        if (index === 0) {
            e.target.value = e.target.value > 179 && e.target.value < 2499 ? e.target.value : "179";
        } else {
            e.target.value = e.target.value > 179 && e.target.value < 2499 ? e.target.value :  "2499";
        }
        filterItems()
    })
})

const cart = document.getElementsByClassName('cartCircle')[0]
const shoppingCart = document.getElementsByClassName ('shoppingCart')[0]
let counter = 0
cart.addEventListener('click', (e)=> {
    counter++
    if (counter % 2 !== 0) {
        shoppingCart.style.display = 'block';
    } else{
        shoppingCart.style.display = 'none';
    }
});

const buyBtn = document.getElementsByClassName('addToCart')

const cartItemsElement = document.querySelector('.cartItems');
const itemsCircle = document.querySelector('.itemsCircle');
const amountNumber = document.querySelector('.amountNumber');
const priceNumber = document.querySelector('.priceNumber');
const buyItems = document.querySelector('.buyItems');

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

const displayCartItems = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    let totalAmount = 0;
    let totalPrice = 0;
    cartItemsElement.innerHTML = '';

    Object.values(cartItems).forEach(({ item: cartItem, quantity }) => {
        const itemElement = document.createElement('div');
        totalAmount += quantity;
        totalPrice += cartItem.price * quantity;
        itemElement.className = 'itemCart';
        itemElement.innerHTML = `
            <div class="cartImage">
                <img class="cartImage" src="${cartItem.imgUrl}" alt="itemCart">
            </div>
            <div class="itemDesc"> <span class="itemNameCart">${cartItem.name}</span> <span
                    class="itemPriceCart">${cartItem.price}$</span></div>
            <div class="changeAmount">
                <div class="arrow left" style="background: ${quantity === 1 ? 'grey' : '#0E49B5'}" onclick="changeCartItem(${cartItem.id}, 'decrease')">&#60;
                </div>
                <div class="itemAmount">${quantity}</div>
                <div class="arrow right" style="background: ${quantity === 4 ? 'grey' : '#0E49B5'}" onclick="changeCartItem(${cartItem.id}, 'increase')">&#62</div>
                <div class="removeItem" onclick="changeCartItem(${cartItem.id}, 'delete')">X</div>
            </div>
        `;

        cartItemsElement.appendChild(itemElement);
    });

    priceNumber.innerHTML = totalPrice;
    amountNumber.innerHTML = totalAmount;
    itemsCircle.innerHTML = totalAmount;

    buyItems.disabled = !totalAmount;
}

const addItemToCart = (id) => {
    if (cartItems[id]) {
        cartItems[id].quantity++
    } else {
        cartItems[id] = {
            item: items.find((item) => item.id === id),
            quantity: 1,
        };
    }

    displayCartItems();
};

const changeCartItem = (id, action) => {
    switch (action) {
        case 'decrease': {
            if (cartItems[id].quantity > 1) {
                cartItems[id].quantity--;
            }
            break;
        }

        case 'increase': {
            if (cartItems[id].quantity < 4) {
                cartItems[id].quantity++;
            }
            break;
        }

        case 'delete': {
            delete cartItems[id];
        }
    }

    displayCartItems();
};

displayCartItems();