// show cart
(function() {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');
  cartInfo.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
  })
})();

// add item to the cart
(function() {
  const cartBtn = document.querySelectorAll('.store-item-icon');
  cartBtn.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      if (event.target.parentElement.classList.contains('store-item-icon')) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf('img') + 3;
        let partPath = fullPath.slice(pos);

        const item = {};
        item.img = `img-cart${partPath}`;
        let cartBody = event.target.parentElement.parentElement.nextElementSibling;
        let name = cartBody.querySelector('.store-item-name').innerText;
        item.name = name;
        let price = cartBody.querySelector('#store-item-price').innerText;
        item.price = price;
        
        const createCartItem = document.createElement('div');
        createCartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
        createCartItem.innerHTML = `
          <img src=${item.img} alt="" class="img-fluid rounded-circle" id="item-img">
          <div class="item-text">
            <p class="cart-item-title font-weight-bold mb-0">${item.name}</p>
            <span>$</span>
            <span class="cart-item-price mb-0">${item.price}</span>
          </div>
          <a href="#" class="cart-item-remove">
            <i class="fas fa-trash"></i>
          </a>
        `;
        const cart = document.querySelector('#cart');
        const cartTotalContainer = document.querySelector('.cart-total-container');
        cart.insertBefore(createCartItem, cartTotalContainer);
        showTotals();
      }
    })
  })
  /* show total */
  function showTotals() {
    const total = [];
    const items = document.querySelectorAll('.cart-item-price');
    items.forEach(item => {
      total.push(parseFloat(item.textContent));
    })
    const totalMoney = total.reduce(function(total, item) {
      total += item;
      return total;
    }, 0);
    const totalFinal = totalMoney.toFixed(2);
    document.querySelector('.cart-total').innerHTML = totalFinal;
    document.querySelector('.item-total').innerHTML = totalFinal;
    document.querySelector('#item-count').innerHTML = total.length;
  }
})();
