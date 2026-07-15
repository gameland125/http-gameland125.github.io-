// GoldHEN Auto Trigger
window.onload = async () => {
    const statusBox = document.getElementById('status-box');
    const restartBtn = document.getElementById('restart-button');

    try {
        statusBox.innerText = "در حال اجرای اکسپلویت...";
        // تابع اجرای HEN (فرضی - طبق پیاده‌سازی پروژه شما)
        await runGoldHEN(); 
        
        statusBox.className = "status-box success";
        statusBox.innerText = "با موفقیت اجرا شد! در حال انتقال...";
        
        setTimeout(() => {
            window.location.href = "about:blank";
        }, 2000);

    } catch (e) {
        statusBox.className = "status-box error";
        statusBox.innerText = "خطا در اجرا. لطفا دوباره تلاش کنید.";
        restartBtn.style.display = "block";
    }
};
