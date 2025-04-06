document.addEventListener('DOMContentLoaded', function() {
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update the preview based on selected color
            let color = '';
            if (this.classList.contains('color-option-black')) {
                color = '#3a3a3a';
            } else if (this.classList.contains('color-option-white')) {
                color = '#f5f5f5';
            } else if (this.classList.contains('color-option-grey')) {
                color = '#888888';
            }
            
            document.querySelector('#preview-canvas').style.backgroundColor = color;
        });
    });
    
    // File upload functionality
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('design-upload');
    const designImage = document.getElementById('design-image');
    
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Process uploaded file
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            designImage.src = event.target.result;
            designImage.style.display = 'block';
            
            // Position in the middle of the canvas
            designImage.style.top = '50%';
            designImage.style.left = '50%';
            designImage.style.transform = 'translate(-50%, -50%)';
        };
        reader.readAsDataURL(file);
    });
    
    // Make the design image draggable
    let isDragging = false;
    let offsetX, offsetY;
    
    designImage.addEventListener('mousedown', function(e) {
        isDragging = true;
        const bounds = designImage.getBoundingClientRect();
        offsetX = e.clientX - bounds.left;
        offsetY = e.clientY - bounds.top;
        
        designImage.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const canvasContainer = document.querySelector('.canvas-container');
        const bounds = canvasContainer.getBoundingClientRect();
        
        let left = e.clientX - bounds.left - offsetX;
        let top = e.clientY - bounds.top - offsetY;
        
        // Keep the image within the canvas
        const maxLeft = bounds.width - designImage.offsetWidth;
        const maxTop = bounds.height - designImage.offsetHeight;
        
        left = Math.max(0, Math.min(left, maxLeft));
        top = Math.max(0, Math.min(top, maxTop));
        
        designImage.style.left = left + 'px';
        designImage.style.top = top + 'px';
        designImage.style.transform = 'none';
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            designImage.style.cursor = 'move';
        }
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Sample cart array to store items
    let cart = [];
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productImg = productCard.querySelector('.product-img').src;
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Add to cart array
            cart.push({
                img: productImg,
                title: productTitle,
                price: productPrice
            });
            
            // Update cart UI (simplified for demo)
            alert(`${productTitle} added to cart!`);
            
            // In a real implementation, you would update a cart UI component
            console.log('Current cart:', cart);
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Collect form data
        const formData = {
            name: name,
            phone: phone,
            email: email,
            message: message
        };
        
        // Simulate sending data to WhatsApp (in a real implementation, 
        // you would use WhatsApp Business API or a third-party service)
        console.log('Form data to send to WhatsApp:', formData);
        
        alert(`Thank you, ${name}! Your message has been received. We'll contact you shortly via WhatsApp or email.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // If you wanted to implement a cart UI toggle:
    /*
    const cartToggle = document.createElement('button');
    cartToggle.className = 'cart-toggle';
    cartToggle.innerHTML = '🛒';
    document.body.appendChild(cartToggle);
    
    const cartContainer = document.createElement('div');
    cartContainer.className = 'cart-container';
    cartContainer.innerHTML = `
        <div class="cart-header">
            <h3>Your Cart</h3>
            <button class="cart-close">×</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span>₹0</span>
            </div>
            <button class="checkout-btn">Proceed to Checkout</button>
        </div>
    `;
    document.body.appendChild(cartContainer);
    
    cartToggle.addEventListener('click', function() {
        cartContainer.classList.toggle('open');
    });
    
    document.querySelector('.cart-close').addEventListener('click', function() {
        cartContainer.classList.remove('open');
    });
    */
});
