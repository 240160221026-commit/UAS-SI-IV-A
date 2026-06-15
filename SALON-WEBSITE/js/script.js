// Data Layanan
const servicesData = [
    { id: 1, name: "Potong Rambut + Styling", price: "Rp 85.000", icon: "fas fa-cut", desc: "Gaya kekinian & konsultasi" },
    { id: 2, name: "Creambath + Pijat Kepala", price: "Rp 110.000", icon: "fas fa-hand-sparkles", desc: "Melembabkan & relaksasi" },
    { id: 3, name: "Facial Brightening", price: "Rp 150.000", icon: "fas fa-smile", desc: "Angkat sel kulit mati" },
    { id: 4, name: "Lulur + Masker Badan", price: "Rp 180.000", icon: "fas fa-water", desc: "Perawatan tubuh mewah" },
    { id: 5, name: "Catok & Smoothing", price: "Rp 200.000", icon: "fas fa-fire", desc: "Rambut halus berkilau" },
    { id: 6, name: "Manicure & Pedicure", price: "Rp 90.000", icon: "fas fa-hand-peace", desc: "Tampil rapi elegan" }
];

// Data Testimoni Default (dengan rating)
let testimonialsData = [
    { id: 1, name: "Anita Putri", text: "Pelayanan sangat ramah, hasil potongan rambut sesuai ekspektasi! Salon cozy banget.", rating: 5, date: "2025-01-15" },
    { id: 2, name: "Melissa Sari", text: "Facialnya bikin kulit glowing! Terapis profesional, pasti kembali lagi.", rating: 5, date: "2025-01-20" },
    { id: 3, name: "Riana Dewi", text: "Harga bersahabat dengan kualitas premium. Creambath recommended!", rating: 4, date: "2025-01-25" },
    { id: 4, name: "Tasya Kamila", text: "Suasananya aesthetic, cocok buat me time. Booking mudah via website.", rating: 5, date: "2025-02-01" },
    { id: 5, name: "Budi Santoso", text: "Potongan rambut rapi dan styling keren. Harga terjangkau.", rating: 4, date: "2025-02-03" }
];

// Load data dari localStorage
function loadTestimonialsFromStorage() {
    const stored = localStorage.getItem('salon_testimonials');
    if (stored) {
        testimonialsData = JSON.parse(stored);
    } else {
        // Simpan data default ke localStorage
        localStorage.setItem('salon_testimonials', JSON.stringify(testimonialsData));
    }
}

// Simpan ke localStorage
function saveTestimonialsToStorage() {
    localStorage.setItem('salon_testimonials', JSON.stringify(testimonialsData));
}

// Render rating stars (untuk tampilan)
function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star-filled">★</span>';
        } else {
            stars += '<span class="star-empty">★</span>';
        }
    }
    return `<div class="testimonial-rating">${stars}</div>`;
}

// Hitung statistik rating
function updateRatingStats() {
    const totalReviews = testimonialsData.length;
    if (totalReviews === 0) {
        document.getElementById('testimonialStats').innerHTML = `
            <div class="stat-card">
                <div class="stat-value">0</div>
                <div class="stat-label">Total Ulasan</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">0.0</div>
                <div class="stat-label">Rating Rata-rata</div>
            </div>
        `;
        return;
    }
    
    const totalRating = testimonialsData.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);
    
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-value">${totalReviews}</div>
            <div class="stat-label">Total Ulasan</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${averageRating}</div>
            <div class="stat-label">⭐ Rating Rata-rata</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${testimonialsData.filter(r => r.rating === 5).length}</div>
            <div class="stat-label">Ulasan ★★★★★</div>
        </div>
    `;
    document.getElementById('testimonialStats').innerHTML = statsHTML;
}

// Render Testimoni (dengan rating dan tombol hapus)
function renderTestimonials() {
    const container = document.getElementById('testimonialContainer');
    if (!container) return;
    
    if (testimonialsData.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: #7f6a58;">Belum ada testimoni. Jadilah yang pertama memberikan penilaian! ✨</div>';
        updateRatingStats();
        return;
    }
    
    // Urutkan dari yang terbaru
    const sortedReviews = [...testimonialsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = '';
    sortedReviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'testimonial-item';
        div.setAttribute('data-id', review.id);
        
        // Format tanggal
        const formattedDate = new Date(review.date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        div.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <h4 style="margin: 10px 0 5px;">${escapeHtml(review.name)}</h4>
            ${renderStars(review.rating)}
            <p class="testimonial-text">"${escapeHtml(review.text)}"</p>
            <div class="testimonial-date">📅 ${formattedDate}</div>
            <button class="delete-review" data-id="${review.id}">
                <i class="fas fa-trash-alt"></i> Hapus
            </button>
        `;
        container.appendChild(div);
    });
    
    // Event listener untuk tombol hapus
    document.querySelectorAll('.delete-review').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            deleteReview(id);
        });
    });
    
    updateRatingStats();
}

// Hapus testimoni
function deleteReview(id) {
    if (confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
        testimonialsData = testimonialsData.filter(review => review.id !== id);
        saveTestimonialsToStorage();
        renderTestimonials();
        showToast('Testimoni berhasil dihapus!', false);
    }
}

// Escape HTML untuk keamanan
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Inisialisasi sistem rating bintang
function initStarRating() {
    const stars = document.querySelectorAll('.star-rating');
    const ratingInput = document.getElementById('ratingValue');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            ratingInput.value = value;
            
            // Update tampilan bintang
            stars.forEach(s => {
                const starValue = parseInt(s.getAttribute('data-value'));
                if (starValue <= value) {
                    s.classList.add('active');
                    s.style.color = '#ffc107';
                } else {
                    s.classList.remove('active');
                    s.style.color = '#ddd';
                }
            });
        });
        
        // Hover effect
        star.addEventListener('mouseenter', function() {
            const value = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                const starValue = parseInt(s.getAttribute('data-value'));
                if (starValue <= value) {
                    s.style.color = '#ffc107';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            const currentRating = parseInt(ratingInput.value);
            stars.forEach(s => {
                const starValue = parseInt(s.getAttribute('data-value'));
                if (currentRating > 0 && starValue <= currentRating) {
                    s.style.color = '#ffc107';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
    });
}

// Handle submit review/penilaian
function initReviewForm() {
    const form = document.getElementById('reviewForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reviewerName').value.trim();
        const rating = parseInt(document.getElementById('ratingValue').value);
        const reviewText = document.getElementById('reviewText').value.trim();
        const messageDiv = document.getElementById('reviewMessage');
        
        // Validasi
        if (!name) {
            showToast('Nama harus diisi!', true);
            messageDiv.innerHTML = '<span style="color: #c0392b;">❌ Nama harus diisi!</span>';
            return;
        }
        
        if (rating === 0) {
            showToast('Silakan berikan penilaian dengan mengklik bintang!', true);
            messageDiv.innerHTML = '<span style="color: #c0392b;">❌ Silakan berikan penilaian bintang!</span>';
            return;
        }
        
        if (!reviewText) {
            showToast('Komentar harus diisi!', true);
            messageDiv.innerHTML = '<span style="color: #c0392b;">❌ Komentar harus diisi!</span>';
            return;
        }
        
        if (reviewText.length < 5) {
            showToast('Komentar minimal 5 karakter!', true);
            messageDiv.innerHTML = '<span style="color: #c0392b;">❌ Komentar minimal 5 karakter!</span>';
            return;
        }
        
        // Buat testimoni baru
        const newReview = {
            id: Date.now(),
            name: name,
            text: reviewText,
            rating: rating,
            date: new Date().toISOString().split('T')[0]
        };
        
        testimonialsData.push(newReview);
        saveTestimonialsToStorage();
        renderTestimonials();
        
        // Reset form
        form.reset();
        document.getElementById('ratingValue').value = '0';
        document.querySelectorAll('.star-rating').forEach(star => {
            star.style.color = '#ddd';
            star.classList.remove('active');
        });
        
        messageDiv.innerHTML = '<span style="color: #2c5e3f;">✅ Terima kasih atas penilaian Anda! Testimoni telah ditambahkan.</span>';
        showToast('Penilaian berhasil ditambahkan!', false);
        
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 4000);
    });
}

// Fungsi Render Layanan
function renderServices() {
    const grid = document.getElementById('serviceGrid');
    if (!grid) return;
    grid.innerHTML = '';
    servicesData.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <i class="${service.icon}"></i>
            <h3>${service.name}</h3>
            <p>${service.desc}</p>
            <div class="price">${service.price}</div>
            <button class="btn quick-book" data-servicename="${service.name}" style="margin-top: 15px; padding: 8px 20px; font-size: 0.8rem;">Pesan Sekarang</button>
        `;
        grid.appendChild(card);
    });

    document.querySelectorAll('.quick-book').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceName = btn.getAttribute('data-servicename');
            const selectEl = document.getElementById('serviceSelect');
            if (selectEl) {
                for (let i = 0; i < selectEl.options.length; i++) {
                    if (selectEl.options[i].text.startsWith(serviceName)) {
                        selectEl.selectedIndex = i;
                        break;
                    }
                }
                document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
                const container = document.querySelector('.booking-container');
                container.style.transition = '0.3s';
                container.style.boxShadow = '0 0 0 3px #d4af7a';
                setTimeout(() => { container.style.boxShadow = ''; }, 800);
            }
        });
    });
}

// Populate select option service
function populateServiceSelect() {
    const select = document.getElementById('serviceSelect');
    if (!select) return;
    select.innerHTML = '<option value="">-- Pilih Layanan --</option>';
    servicesData.forEach(service => {
        const option = document.createElement('option');
        option.value = service.name;
        option.textContent = `${service.name} - ${service.price}`;
        select.appendChild(option);
    });
}

// Toast notification helper
function showToast(message, isError = false) {
    const toast = document.getElementById('toastMsg');
    toast.textContent = message || (isError ? "Gagal melakukan booking" : "Booking berhasil!");
    toast.style.backgroundColor = isError ? '#a3412e' : '#2c5e3f';
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Simpan booking ke localStorage
function saveBookingToLocal(bookingData) {
    let bookings = JSON.parse(localStorage.getItem('salon_bookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('salon_bookings', JSON.stringify(bookings));
}

// Handle booking form
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const customerName = document.getElementById('customerName').value.trim();
        const customerPhone = document.getElementById('customerPhone').value.trim();
        const serviceSelected = document.getElementById('serviceSelect').value;
        const bookingDate = document.getElementById('bookingDate').value;
        const bookingTime = document.getElementById('bookingTime').value;
        const notes = document.getElementById('notes').value.trim();

        if (!customerName || !customerPhone || !serviceSelected || !bookingDate || !bookingTime) {
            showToast("Semua field wajib diisi!", true);
            return;
        }
        
        const phoneRegex = /^[0-9+\-\s]{8,15}$/;
        if (!phoneRegex.test(customerPhone)) {
            showToast("Format nomor telepon tidak valid.", true);
            return;
        }

        const [hour, minute] = bookingTime.split(':');
        const hourNum = parseInt(hour, 10);
        if (hourNum < 9 || hourNum > 20 || (hourNum === 20 && parseInt(minute,10) > 0)) {
            showToast("Jam operasional 09:00 - 20:00. Silakan pilih jam lain.", true);
            return;
        }

        const today = new Date();
        today.setHours(0,0,0,0);
        const selectedDateObj = new Date(bookingDate);
        if (selectedDateObj < today) {
            showToast("Tanggal booking tidak boleh kurang dari hari ini.", true);
            return;
        }

        const serviceItem = servicesData.find(s => s.name === serviceSelected);
        const priceDisplay = serviceItem ? serviceItem.price : "Harga akan diinfo";

        const bookingObj = {
            id: Date.now(),
            nama: customerName,
            telepon: customerPhone,
            layanan: serviceSelected,
            tanggal: bookingDate,
            waktu: bookingTime,
            catatan: notes,
            harga: priceDisplay,
            createdAt: new Date().toISOString()
        };

        saveBookingToLocal(bookingObj);
        
        document.getElementById('formMessage').innerHTML = `<span style="color: #2c5e3f;">✅ Terima kasih ${customerName}! Booking ${serviceSelected} pada ${bookingDate} pukul ${bookingTime} berhasil. Kami akan menghubungi Anda segera.</span>`;
        showToast(`Booking berhasil untuk ${serviceSelected}`, false);
        
        form.reset();
        setTimeout(() => {
            const msgDiv = document.getElementById('formMessage');
            if(msgDiv) msgDiv.innerHTML = '';
        }, 6000);
    });
}

// Set min date untuk input date
function setMinDateForBooking() {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Smooth scroll untuk tombol explore
function initExploreButton() {
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        });
    }
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Inisialisasi semua fungsi
function init() {
    loadTestimonialsFromStorage();
    renderServices();
    populateServiceSelect();
    renderTestimonials();
    initBookingForm();
    setMinDateForBooking();
    initMobileMenu();
    initExploreButton();
    initStarRating();
    initReviewForm();
    
    const existing = localStorage.getItem('salon_bookings');
    if(existing) {
        console.log(`✅ Memiliki ${JSON.parse(existing).length} riwayat booking tersimpan.`);
    }
    console.log(`✅ Memiliki ${testimonialsData.length} testimoni dengan fitur penilaian.`);
}

// Jalankan ketika DOM siap
document.addEventListener('DOMContentLoaded', init);