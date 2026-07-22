function setAutoJbRetry(checked) {
    localStorage.setItem('autoJbRetry', checked);
    sessionStorage.setItem('autoJbRetry', checked);

    if (!checked) return;
    if (confirm(window.lang.autoJbRetryConfirm)) {
        settingsPopup();
        jailbreak();
    }
}

// When jailbreak succeds, this will be stopped
function autoJailbreak() {
    if (sessionStorage.getItem('jailbreakNow') == "true") {
        jailbreak();
        return;
    }

    var checked = (localStorage.getItem('autoJbRetry') || 'true') === 'true';
    var sessionChecked = sessionStorage.getItem('autoJbRetry') == 'true';
    ui.autoJbRetry.checked = checked;

    if (window.ps4Fw < 6.70 || window.ps4Fw > 9.60 || !window.ps4Fw) return;

    if (sessionStorage.getItem('cacheInstalled') === 'true') {
        sessionStorage.removeItem('cacheInstalled');
        jailbreak();
        return;
    }

    if (checked && sessionChecked) {
        jailbreak();
    }
}

function autoJailbreakTimer() {
    var timer = 3;
    ui.stopAutoJbBtn.classList.toggle('hidden');
    autoJbInterval = setInterval(() => {
        ui.clickToStartText.textContent = window.lang.jailbreakCountDown.replace('{seconds}', timer);
        ui.clickToStartText.style.fontSize = "15px";
        if (timer <= 0) {
            clearInterval(autoJbInterval);
            jailbreak();
        }
        timer--;
    }, 1000);
}
