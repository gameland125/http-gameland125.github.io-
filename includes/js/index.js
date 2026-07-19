// ... (کدهای قبل از تابع badHoistJailbreak)

async function badHoistJailbreak() {
  if (window.entrypoint672_result < 1) {
    log("An error occured during Bad Hoist Entrypoint\nRetrying..", "orange");
    await sleep(2000);
    location.reload();
    return;
  }
  else
    log("Bad Hoist Entrypoint succeeded");
  if (window.exploitsetup672_result < 1) {
    log("An error occured during Exploit Setup\nPlease refresh page and try again...", "red");
    return;
  }
  else
    log("Exploit Setup complete\n");
  log("Starting Kernel Exploit...");
  await sleep(200); // Wait 200ms

  // فرض بر این است که فایل 672kexploit.js وجود دارد و تابع KernelExploit672 را تعریف می‌کند
  await loadScript('./includes/js/exploits/672kexploit.js'); 
  var result = KernelExploit672();

  if (result === 0 || result === 91) {
    log("\nKernel exploit succeeded", "green");
    
    // اجرای GoldHEN
    try {
        // اولویت با تابع loadGoldHEN است اگر وجود داشته باشد
        if (typeof loadGoldHEN === 'function') {
            loadGoldHEN();
            log("loadGoldHEN called.");
        } else {
            // اگر loadGoldHEN نبود، از getPayload672 استفاده می‌کنیم
            // اطمینان حاصل کنید که sessionStorage.getItem('payload_path') مقدار معتبری دارد
            var payloadPath = sessionStorage.getItem('payload_path');
            if (payloadPath) {
                getPayload672(payloadPath);
                log("getPayload672 called with path: " + payloadPath);
            } else {
                console.error("payload_path not found in sessionStorage for getPayload672.");
                // در این حالت، ممکن است نیاز باشد پِی‌لود را به صورت دستی انتخاب کنید
                // alert("GoldHEN payload path not set. Please select a payload.");
            }
        }
    } catch(e) {
        console.error("Error loading HEN:", e);
        log("Error loading HEN: " + e, "red");
    }

    log("\nBad Hoist by Fire30, 6.7x Kernel Exploit by Sleirsgoevy");
    log("Implementation taken from Feyzee61");
    
    // ریدایرکت مخفی با تاخیر 2 ثانیه‌ای برای اطمینان از اجرای پِی‌لود
    setTimeout(() => {
      window.location.replace("about:blank");
    }, 2000); 

  } else if (result === 179) {
    log("\nAlready jailbroken, skipping..", "green");
    
    // برای حالت Already jailbroken هم مشابه بالا عمل می‌کنیم
    try {
        if (typeof loadGoldHEN === 'function') {
            loadGoldHEN();
            log("loadGoldHEN called for already jailbroken.");
        } else {
            var payloadPath = sessionStorage.getItem('payload_path');
            if (payloadPath) {
                getPayload672(payloadPath);
                log("getPayload672 called for already jailbroken with path: " + payloadPath);
            } else {
                console.error("payload_path not found in sessionStorage for getPayload672 (already jailbroken).");
                // alert("GoldHEN payload path not set. Please select a payload.");
            }
        }
    } catch(e) {
        console.error("Error loading HEN (already jailbroken):", e);
        log("Error loading HEN (already jailbroken): " + e, "red");
    }
    
    setTimeout(() => {
      window.location.replace("about:blank");
    }, 2000);

  } else {
    log("\nAn error occured during Kernel Exploit\nPlease restart console and try again...", "red");
  }
}

// ... (کدهای بعد از تابع badHoistJailbreak)
