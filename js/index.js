const $items = document.getElementById('items');
const inputSearch = document.getElementsByClassName('inputSearch')[0]

const displayItems = (items) =>{
    $items.innerHTML= ''
    for (const item of items) {
        const $post = document.createElement('div');
        $post.className = 'tile';
        $post.innerHTML = `
            <img id="${item.id}" class="imgItem " width="200" height="200" src="./${item.imgUrl}" alt="item">
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
            <button class="addToCart">Add to cart</button>
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

const displayModal = () => {
    for (const item of items){
        const $modal = document.createElement('div')
        $modal.className = 'modal'
        $modal.innerHTML = ` `
    $items.appendChild($modal);
    }
}

displayItems(items);



const body = document.querySelector("body");
const filterContainers = document.getElementsByClassName('filterContainer');
const priceTitles = document.getElementsByClassName('priceTitle')
const modalOverlay = document.getElementsByClassName('modalOverlay')[0]
const itemModal = document.getElementsByClassName('itemModal')[0]
const imgItems = document.getElementsByClassName('imgItem')
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
 
Array.from(imgItems).forEach((imgItem) => {
    imgItem.addEventListener('click', (e) => {
        modalOverlay.style.display = "flex";
        body.style.overflow = "hidden";
        const itemModal = items.find((item)=> +e.target.id === item.id)
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
    });
})

itemModal.addEventListener('click', (e) => e.stopPropagation());

modalOverlay.addEventListener('click' ,(event) => {
    modalOverlay.style.display = "none";
    body.style.overflow = "auto";
});

inputSearch.addEventListener('input', (e)=> {
    const value = e.target.value.toLowerCase()
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(value))
    displayItems(filteredItems)
})

const filter = {
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
    filter[settingsName] = filter[settingsName].filter(settings => settings !== value);
};

const hasFilters = () => {
    return Object.values(filter).some((settings) => settings.length) || (filter.priceRange[0] || filter.priceRange[1]);
}

const filterItems = () => {
    if (hasFilters()) {
        const filteredItems = items.filter((item) => {
            let flagColor = true;
            let flagMemory = true;
            let flagOs = true;
            let flagDisplay = true;
            let flagPrice = true;
            
            if (filter.color.length) {
                flagColor = item.color.some(color => filter.color.includes(color));
            } 
    
            if (filter.memory.length) {
                flagMemory = filter.memory.includes(item.storage);
            } 
    
            if (filter.os.length) {
                flagOs = filter.os.includes(item.os);
            } 
    
            if (filter.display.length) {
                filter.display.forEach(([minInches, maxInches]) => {
                    flagDisplay = minInches < item.display && maxInches > item.display;
                });
            }
    
            if (filter.priceRange[0] || filter.priceRange[1]) {
                flagPrice = (filter.priceRange[0] || 0) <= item.price && (filter.priceRange[1] || Infinity) >= item.price; 
            }
    
            return flagColor && flagMemory && flagOs && flagDisplay && flagPrice;
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