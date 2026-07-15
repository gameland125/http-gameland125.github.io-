'use strict';

(function () {
  var statusDot = document.getElementById('status-dot');
  var statusTitle = document.getElementById('status-title');
  var statusText = document.getElementById('status-text');
  var reloadButton = document.getElementById('reload-button');

  function setStatus(state, title, message) {
    if (statusDot) {
      statusDot.className = 'status-dot ' + state;
    }

    if (statusTitle) {
      statusTitle.textContent = title;
    }

    if (statusText) {
      statusText.textContent = message;
    }
  }

  function showConnectionStatus() {
    if (navigator.onLine) {
      setStatus(
        'online',
        'برنامه آماده است',
        'اتصال برقرار است و فایل‌های برنامه برای استفاده آفلاین ذخیره می‌شوند.'
      );
    } else {
      setStatus(
        'offline',
        'حالت آفلاین فعال است',
        'برنامه با استفاده از فایل‌های ذخیره‌شده اجرا شده است.'
      );
    }
  }

  if (reloadButton) {
    reloadButton.addEventListener('click', function () {
      window.location.reload();
    });
  }

  window.addEventListener('online', showConnectionStatus);
  window.addEventListener('offline', showConnectionStatus);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./service-worker.js', {
        scope: './'
      })
        .then(function () {
          showConnectionStatus();
        })
        .catch(function () {
          setStatus(
            'error',
            'ذخیره آفلاین فعال نشد',
            'اتصال امن HTTPS و محل قرارگیری فایل‌ها را بررسی کنید.'
          );
        });
    });
  } else {
    setStatus(
      'warning',
      'مرورگر از حالت آفلاین پشتیبانی نمی‌کند',
      'برنامه همچنان به‌صورت عادی قابل استفاده است.'
    );
  }
})();
