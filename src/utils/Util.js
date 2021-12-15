export function getCurrentDate() {
    let time = new Date();
    let z = time.getTimezoneOffset() * 60 * 1000;
    let tLocal = time - z;
    tLocal = new Date(tLocal);
    let iso = tLocal.toISOString();
    iso = iso.slice(0, 19);
    iso = iso.replace('T', ' ');
    return iso;
}

export function convertToSeconds(time) {
    return ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ':' +
    ("0" + Math.floor((time / 1000) % 60)).slice(-2) + '.' +
    ("0" + ((time / 10) % 100)).slice(-2);
}