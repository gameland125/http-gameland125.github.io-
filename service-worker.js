<script>
(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .catch(function () {
                console.log('Service Worker registration failed.');
            });
    } else {
        console.log('PS4 Browser: Service Worker unsupported. Continuing...');
    }
})();
</script>
