function loadGoldHen(){
    fetch("goldhen.bin")
    .then(r => r.arrayBuffer())
    .then(buf => {
        // inject payload
    });
}
