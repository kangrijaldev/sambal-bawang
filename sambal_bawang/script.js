// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        once: true,
        offset: 100
    });

    // Quantity selector logic
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const qtyInput = document.getElementById('qty');
    const checkoutBtn = document.getElementById('checkout-btn');

    if(minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            if(currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            qtyInput.value = currentValue + 1;
        });
    }

    // WhatsApp Checkout logic
    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const qty = qtyInput ? qtyInput.value : 1;
            const price = 35000;
            const total = qty * price;
            
            // Format to Rupiah
            const formatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            });

            const message = `Halo Sambal Nusantara! Saya ingin memesan Sambal Bawang Signature.%0A%0AJumlah: ${qty} botol%0ATotal Harga: ${formatter.format(total)}%0A%0AMohon info cara pembayarannya. Terima kasih!`;
            
            // Phone number format: use country code (62 for Indonesia) without the + sign
            const phoneNumber = '6281234567890';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
