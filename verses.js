function getVerses() {
    chrome.storage.sync.get(['verses'], function (result) {
        console.log('Value currently is ' + result.verses);
        return result.verses;
    });
}

// Display Saved Verses
var savedVerses = document.getElementById("saved_verses");

let verses = getVerses();
console.log(verses);
var outputHTML = "";

for (let i = verses.length - 1; i >= 0; i--) {
    outputHTML += "<div>" + verses[i].verse + "</div>";
}

console.log(outputHTML)
savedVerses.innerHTML = outputHTML;

