async function teste() {
    const response = await window.api.ping();

    console.log(response);
    
}

teste();