// events.js - Gameland PWA Event Management
// Operator: Qassem Akbarzadeh | Kashmar, Darabi 15

// Scroll snap for the PS4
ui.mainContainer.addEventListener('scroll', () => {
    // Only apply if using a PS4
    if (user.platform != "PS4" || !ui.initialScreen) return;
    
    // Simple vertical snap logic
    if (ui.mainContainer.scrollTop > lastScrollY) {
        if (lastSection !== "exploit") {
            document.getElementById('exploitContainer').scrollIntoView({ block: "end", behavior: "smooth" });
            lastSection = "exploit";
        }
    } else if (ui.mainContainer.scrollTop < lastScrollY) {
        if (lastSection !== "initial") {
            ui.initialScreen.scrollIntoView({ block: "end", behavior: "smooth" });
            lastSection = "initial";
        }
    }
    lastScrollY = ui.mainContainer.scrollTop;
});

// Launch jailbreak event handler
const initiateJb = () => {
    if (user.blockJailbreak) return;
    user.blockJailbreak = true;
    
    // Ensure we trigger HEN choice
    if (typeof chooseHEN === 'function') chooseHEN();
    
    // Start jailbreak process
    jailbreak();
};

ui.exploitRunBtn.addEventListener('click', initiateJb);
ui.psLogoContainer.addEventListener('click', initiateJb);

// Tabs switching logic
const switchTab = (tabName) => {
    const sections = [ui.toolsSection, ui.linuxSection, ui.advancedPayloadsSection, ui.customPayloadsSection];
    const tabs = [ui.toolsTab, ui.linuxTab, ui.advancedPayloadsTab, ui.customPayloadsTab];

    // Hide all, reset all tabs
    sections.forEach(s => s.classList.add('hidden'));
    tabs.forEach(t => t.setAttribute("aria-selected", "false"));

    // Activate selected
    let targetSection, targetTab;
    switch(tabName) {
        case 'tools': targetSection = ui.toolsSection; targetTab = ui.toolsTab; break;
        case 'linux': targetSection = ui.linuxSection; targetTab = ui.linuxTab; break;
        case 'advanced': targetSection = ui.advancedPayloadsSection; targetTab = ui.advancedPayloadsTab; break;
        case 'custom': targetSection = ui.customPayloadsSection; targetTab = ui.customPayloadsTab; break;
    }

    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetTab.setAttribute("aria-selected", "true");
        targetSection.innerHTML = '';
        
        // Render based on category
        const filtered = payloadsList.filter(p => p.category === tabName);
        renderPayloads(filtered);
    }

    ui.payloadsList.scrollTop = 0;
    saveLastTab(tabName);
};

ui.toolsTab.addEventListener('click', () => switchTab('tools'));
ui.linuxTab.addEventListener('click', () => switchTab('linux'));
ui.advancedPayloadsTab.addEventListener('click', () => switchTab('advanced'));
ui.customPayloadsTab.addEventListener('click', () => switchTab('custom'));

// Save ps4Fw settings
ui.ps4FwSelect.addEventListener('change', function () {
    user.ps4Fw = ui.ps4FwSelect.value;
    localStorage.setItem('ps4Fw', ui.ps4FwSelect.value);
    ui.ps4FwSelect.style.border = "1px solid white";
});

// Stop the auto jailbreak retry
ui.stopAutoJbBtn.addEventListener('click', () => {
    if (typeof autoJbInterval !== 'undefined') clearInterval(autoJbInterval);
    sessionStorage.setItem('autoJbRetry', 'false');
    ui.stopAutoJbBtn.classList.add('hidden');
    
    // Restore original text
    const defaultText = (localStorage.getItem("theme") === "compact") ? (window.lang.title || "PSFree Enhanced") : window.lang.clickToStart;
    if(ui.clickToStartText) ui.clickToStartText.textContent = defaultText;
});

// Settings close event
document.getElementById("close-settings")?.addEventListener('click', function () {
    localStorage.setItem("NewUser", "0");
});
