function calculateAVLT() {
    const age = Math.floor(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if(age < 8 || age > 17) {
        document.getElementById('age-error').style.visibility = "visible";
        return;
    }

    fetch('./data/avlt.json')
        .then(response => response.json())
        .then(jsonData => {
            for(let i = 1; i <= 8; i++) {
                let average = jsonData[gender]['average'][age]['t' + i];
                let standard_deviation = jsonData[gender]['standard-deviation'][age]['t' + i];
                let score = document.getElementById('T' + i).value;

                if(score < 0 || score > 15) {
                    document.getElementById('T' + i + '-error').style.display = "unset";
                    return;
                }

                document.getElementById('score' + i).innerHTML = "";
                let span = document.createElement('span');
                span.textContent = score;
                document.getElementById('score' + i).appendChild(span);
                document.getElementById('T' + i + '-average').textContent = average;
                document.getElementById('T' + i + '-SD').textContent = standard_deviation;
                document.getElementById('T' + i + '-scoreZ').textContent = ((score - average) / standard_deviation).toFixed(2);
            }
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
    }

function calculateRCFT() {
    let age = Math.floor(document.getElementById('age-years').value);
    const months = Math.floor(document.getElementById('age-months').value);

    if(age >= 6 && age < 10) {
        if(months >= 6 && months <=11)
            age += 0.5;
        else if (months < 0 || months > 12) {
            document.getElementById('age-error').style.visibility = "visible";
            return;
        }
    }
    else if(age < 6) {
        document.getElementById('age-error').style.visibility = "visible";
        return;
    }
    else if(age >= 18) {
        age = 17;
    }

    fetch('./data/rcft.json')
        .then(response => response.json())
        .then(jsonData => {
            for(let i = 1; i <= 3; i++) {
                let average = jsonData['average'][age]['t' + i];
                let standard_deviation = jsonData['standard-deviation'][age]['t' + i];
                let score = document.getElementById('T' + i).value;

                // if(score < 0 || score > 15) {
                //     document.getElementById('T' + i + '-error').style.display = "unset";
                //     return;
                // }

                document.getElementById('score' + i).innerHTML = "";
                let span = document.createElement('span');
                span.textContent = score;
                document.getElementById('score' + i).appendChild(span);
                document.getElementById('T' + i + '-average').textContent = average;
                document.getElementById('T' + i + '-SD').textContent = standard_deviation;
                document.getElementById('T' + i + '-scoreZ').textContent = ((score - average) / standard_deviation).toFixed(2);
            }
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });

    console.log(age);
}

function AVLT() {
    window.location.href = "AVLT.html";
}

function RCFT() {
    window.location.href = "RCFT.html";
}

function menu() {
    window.location.href = "index.html";
}

function refresh() {
    window.location.reload();
}

function copyTable() {
    // Get the table element by its ID
    const table = document.getElementById('scores');

    // Create a range to select the table contents
    const range = document.createRange();
    range.selectNode(table);

    // Select the table contents
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy the selected content to the clipboard
    document.execCommand('copy');

    // Clean up the selection
    selection.removeAllRanges();

    alert('Table copied to clipboard!');
}

