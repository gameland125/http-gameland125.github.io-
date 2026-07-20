// @ts-nocheck

/**
 * تنظیم وضعیت تلاش مجدد خودکار
 * @param {boolean} checked - وضعیت تیک زده شده در تنظیمات
 */
function setAutoJbRetry(checked) {
    localStorage.setItem('autoJbRetry', checked);
    sessionStorage.setItem('autoJbRetry', checked);

    if (!checked) {
        if (autoJbInterval) clearInterval(autoJbInterval);
        return;
    }

    // اگر کاربر به صورت دستی فعال کرد، تاییدیه بگیر و اجرا کن
    if (confirm(window.lang.autoJbRetryConfirm || "آیا مایل به فعال‌سازی اجرای خودکار هستید؟")) {
        settingsPopup();
        jailbreak();
    }
}

/**
 * تابع اصلی برای بررسی شروع خودکار اکسپلویت در هنگام لود صفحه
 */
function autoJailbreak() {
    // جلوگیری از اجرا اگر قبلاً موفق شده و به about:blank نرفته است
    if (sessionStorage.getItem('jbSuccess') === 'true') return;

    // مخصوص فرمورهای 6.7x
    if (sessionStorage.getItem('jailbreakNow') == "true") {
        jailbreak();
        return;
    }

    var checked = (localStorage.getItem('autoJbRetry') || 'true') === 'true'; 
    var sessionChecked = sessionStorage.getItem('autoJbRetry') !== 'false'; // پیش‌فرض فعال در نشست جاری

    if (ui.autoJbRetry) ui.autoJbRetry.checked = checked;

    // بررسی محدوده پشتیبانی فرمور
    if (window.ps4Fw < 6.70 || window.ps4Fw > 9.60 || !window.ps4Fw) return;

    // اگر در تنظیمات فعال است و در این نشست غیرفعال نشده است
    if (checked && sessionChecked) {
        autoJailbreakTimer();
    }
}

/**
 * مدیریت تایمر معکوس برای شروع اکسپلویت
 */
function autoJailbreakTimer() {
    var timer = 3; // ثانیه معکوس
    
    // نمایش دکمه توقف اگر در UI وجود دارد
    if (ui.stopAutoJbBtn) ui.stopAutoJbBtn.classList.remove('hidden');

    // پاک کردن اینتروال‌های قبلی احتمالی
    if (autoJbInterval) clearInterval(autoJbInterval);

    autoJbInterval = setInterval(() => {
        // به‌روزرسانی متن در صفحه نمایش
        if (ui.clickToStartText) {
            let msg = window.lang.jailbreakCountDown ? 
                      window.lang.jailbreakCountDown.replace('{seconds}', timer) : 
                      `اجرای خودکار در ${timer} ثانیه...`;
            ui.clickToStartText.textContent = msg;
            ui.clickToStartText.style.fontSize = "15px";
        }

        if (timer <= 0) {
            clearInterval(autoJbInterval);
            if (ui.stopAutoJbBtn) ui.stopAutoJbBtn.classList.add('hidden');
            jailbreak();
        }
        timer--;
    }, 1000);
}

/**
 * تابعی برای متوقف کردن دستی تایمر توسط کاربر
 */
function stopAutoJailbreak() {
    if (autoJbInterval) {
        clearInterval(autoJbInterval);
        sessionStorage.setItem('autoJbRetry', 'false'); // در این نشست دیگر خودکار اجرا نشود
        if (ui.stopAutoJbBtn) ui.stopAutoJbBtn.classList.add('hidden');
        if (ui.clickToStartText) ui.clickToStartText.textContent = window.lang.clickToStart || "برای شروع کلیک کنید";
        log("اجرای خودکار متوقف شد.", "orange");
    }
}
