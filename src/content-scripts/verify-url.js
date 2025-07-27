try {
    var http = new XMLHttpRequest();
    http.open('HEAD', document.URL, false);
    http.send();
    http.status === 200;
} catch (_) {
    false;
}
