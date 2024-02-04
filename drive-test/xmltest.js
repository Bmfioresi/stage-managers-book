async function searchFile() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '')
    xhr.onreadystatechange = function (e) {
        console.log(xhr.response);
    };
    xhr.send
}