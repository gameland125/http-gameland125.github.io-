function loadPayload(path) {
    fetch(path)
    .then(res => res.arrayBuffer())
    .then(buf => {
        console.log("Payload Loaded");
        // اینجا inject واقعی انجام میشه
    });
}
