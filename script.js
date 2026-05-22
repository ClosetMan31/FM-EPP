const images = [
      './images/image-product-1.jpg',
      './images/image-product-2.jpg',
      './images/image-product-3.jpg',
      './images/image-product-4.jpg'
    ];

    let currentIndex = 0;

    const mainImage = document.getElementById('main-image');
    const lightboxMainImage = document.getElementById('lightbox-main-image');
    const lightbox = document.getElementById('lightbox');
    const closeLightboxBtn = document.getElementById('close-lightbox');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageThumbnails = document.querySelectorAll('.gallery .thumbnail');
    const lightboxThumbnails = document.querySelectorAll('.lightbox .thumbnail');

    const quantityEl = document.getElementById('quantity');
    const minusBtn = document.getElementById('minus-btn');
    const plusBtn = document.getElementById('plus-btn');
    const addToCartBtn = document.getElementById('add-to-cart');
    
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartBadge = document.getElementById('cart-badge');
    const cartBody = document.getElementById('cart-body');

    const mobilePrevBtn = document.getElementById('mobile-prev-btn');
    const mobileNextBtn = document.getElementById('mobile-next-btn');
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const navMenu = document.getElementById('mobile-nav');
    const navOverlay = document.getElementById('nav-overlay');

    let quantity = 0;
    let itemsInCart = 0;
    const productPrice = 125.00;

    function updateImage(index) {
      currentIndex = index;
      mainImage.src = images[currentIndex];
      lightboxMainImage.src = images[currentIndex];

      pageThumbnails.forEach(thumb => thumb.classList.remove('active'));
      pageThumbnails[currentIndex].classList.add('active');

      lightboxThumbnails.forEach(thumb => thumb.classList.remove('active'));
      lightboxThumbnails[currentIndex].classList.add('active');
    }

    pageThumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => updateImage(parseInt(thumb.getAttribute('data-index'))));
    });

    lightboxThumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => updateImage(parseInt(thumb.getAttribute('data-index'))));
    });

    mainImage.addEventListener('click', () => {
      if (window.innerWidth > 768) {
        lightbox.classList.add('active');
        updateImage(currentIndex);
      }
    });

    closeLightboxBtn.addEventListener('click', () => lightbox.classList.remove('active'));

    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = images.length - 1;
      updateImage(newIndex);
    });

    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= images.length) newIndex = 0;
      updateImage(newIndex);
    });

    if (mobilePrevBtn) {
      mobilePrevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = images.length - 1;
        updateImage(newIndex);
      });
    }

    if (mobileNextBtn) {
      mobileNextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= images.length) newIndex = 0;
        updateImage(newIndex);
      });
    }

    minusBtn.addEventListener('click', () => {
      if (quantity > 0) {
        quantity--;
        quantityEl.innerText = quantity;
      }
    });

    plusBtn.addEventListener('click', () => {
      quantity++;
      quantityEl.innerText = quantity;
    });

    function updateCart() {
      if (itemsInCart > 0) {
        cartBadge.style.display = 'block';
        cartBadge.innerText = itemsInCart;
        
        let totalPrice = (productPrice * itemsInCart).toFixed(2);
        
        cartBody.innerHTML = `
          <div class="cart-item">
            <img src="./images/image-product-1-thumbnail.jpg" alt="Thumbnail" class="cart-item-img" onerror="this.src='https://via.placeholder.com/50'">
            <div class="cart-item-details">
              <p>Fall Limited Edition Sneakers</p>
              <p class="cart-item-price">$125.00 x ${itemsInCart} <b>$${totalPrice}</b></p>
            </div>
            <button class="delete-btn" id="delete-btn">
              <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
            </button>
          </div>
          <button class="checkout-btn">Checkout</button>
        `;

        document.getElementById('delete-btn').addEventListener('click', () => {
          itemsInCart = 0;
          updateCart();
        });

      } else {
        cartBadge.style.display = 'none';
        cartBody.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
      }
    }

    addToCartBtn.addEventListener('click', () => {
      if (quantity > 0) {
        itemsInCart += quantity;
        updateCart();
        
        quantity = 0;
        quantityEl.innerText = quantity;
      }
    });

    cartIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      cartDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
        cartDropdown.classList.remove('active');
      }
    });

    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
      });
    }

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
      });
    }

    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
      });
    }