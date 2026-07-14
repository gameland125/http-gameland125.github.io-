// Optimized main.js for Gameland PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js', { scope: './' })
            .then((registration) => {
                console.log('ServiceWorker registered with scope:', registration.scope);
                // تغییر وضعیت در صفحه به "آماده استفاده آفلاین"
                const statusElement = document.querySelector('.status-text');
                if (statusElement) {
                    statusElement.innerHTML = 'GAMELAND برای استفاده آفلاین آماده است <span style="color: #4caf50;">●</span>';
                }
            })
            .catch((error) => {
                console.error('ServiceWorker registration failed:', error);
                const statusElement = document.querySelector('.status-text');
                if (statusElement) {
                    // نمایش خطای دقیق‌تر
                    statusElement.innerHTML = 'خطا در فعال‌سازی کش! (احتمالاً به دلیل عدم استفاده از HTTPS)';
                    statusElement.style.color = '#ff5252';
                }
            });
    });
} else {
    // اگر مرورگر اصلاً پشتیبانی نکند
    const statusElement = document.querySelector('.status-text');
    if (statusElement) {
        statusElement.innerHTML = 'این مرورگر از قابلیت آفلاین پشتیبانی نمی‌کند.';
    }
}

// تابع بارگذاری مجدد برای دکمه پایین صفحه
function reloadPage() {
    location.reload();
}
