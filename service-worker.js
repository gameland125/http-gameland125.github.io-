/* ===========================
   Service Worker (PS4 Safe)
   =========================== */

async function initOfflineCache() {
    // مرورگر PS4 از Service Worker پشتیبانی نمی‌کند
    if (!('serviceWorker' in navigator)) {
        console.log("PS4 Browser: Service Worker Unsupported");
        return true; // ادامه اجرای هاست
    }

    try {
        const reg = await navigator.serviceWorker.register("./service-worker.js", {
            scope: "./"
        });

        await navigator.serviceWorker.ready;

        console.log("Service Worker Ready");

        return true;

    } catch (e) {

        console.warn("Service Worker Failed:", e);

        // حتی اگر خطا داد هاست متوقف نشود
        return true;
    }
}

window.addEventListener("load", async () => {

    await initOfflineCache();

    // ادامه اجرای هاست
    if (typeof startHost === "function") {
        startHost();
    }

    if (typeof runExploit === "function") {
        runExploit();
    }

    if (typeof loadGoldHEN === "function") {
        loadGoldHEN();
    }

});
