// votd and version
var votd = document.getElementById("votd");
var votdSelect = document.getElementById("bible");

votdSelect.addEventListener('change', function () {
    var votdSelected = votdSelect.options[votdSelect.selectedIndex].text;
    const url_regex = /version=([A-Z0-9\-]+)/;
    const selected = /\(([A-Z0-9\-]+)\)/;

    let match = url_regex.exec(votd.src);
    let choice = selected.exec(votdSelected);

    if (match) {
        votd.src = votd.src.replace(match[1], choice[1]);
        console.log(document.getElementById("votd"));
    } else {
        console.log('No match');
    }
});

// Handle Saved Verses in Storage
function addVerse(stored_verses, verse) {
    stored_verses.push(verse);

    chrome.storage.sync.set({ verses: stored_verses }, function () {
        console.log('Added verse: ' + verse);
    });
}

function getVerses() {
    chrome.storage.sync.get(['verses'], function (result) {
        console.log('Value currently is ' + result.verses);
        return result.verses;
    });
}

function checkVerses() {
    if (typeof getVerses() !== "undefined") {
        return true;
    } else {
        return false;
    }
}

// Save Verse 
var saveBtn = document.getElementById("saveButton");

saveBtn.addEventListener("click", async function () {
    // fetch the json     
    saved_verse = await extractVerse()

    if (checkVerses()) {
        addVerse(getVerses(), saved_verse)
    } else {
        addVerse([], saved_verse)
    }

    console.log(saved_verse)
});

// Extract Verse
function extractVerse() {
    extracted_verse = fetch("https://cors-anywhere.herokuapp.com/https://www.biblegateway.com/votd/get/?format=json&version=KJV", {
    })
        .then(response => response.json())
        .then(json =>
            condensed = {
                verse: json.votd.text + ' <a href="' + json.votd.permalink + '"> &#40;' + json.votd.reference + '&#41; </a>',
                date: parseInt(json.votd.month * 30) + parseInt(json.votd.day) + parseInt((json.votd.year - 2021) * 365),
                cp: json.votd.copyrightlink
            })
        .catch(error => console.log('Authorization failed : ' + error.message));

    return extracted_verse;
}

// View Saved Verses
var viewBtn = document.getElementById("viewButton");

viewBtn.addEventListener("click", function () {
    var saved_url = "verses.html";

    chrome.tabs.create({
        url: saved_url
    });
});