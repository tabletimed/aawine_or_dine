async function StartGame() {
    console.log("gamestarted");

    let data = "";

    let progress = 0;
    let total = 100;

    let numSmashMale = 0;
    let numSmashFemale = 0;
    let numSmashTotal = 0;
    let smashAgeTotal = 0;
    let smashImageLinks = [];

    let numPassMale = 0;
    let numPassFemale = 0;
    let numPassTotal = 0;
    let passAgeTotal = 0;
    let passImageLinks = [];


    const NameHolder = document.getElementById("name");
    const ImgHolder = document.getElementById("mugshot");
    const buttons = document.getElementById("buttons");


    function resetItems() {
        NameHolder.innerHTML = "";
        ImgHolder.innerHTML = "";
    }

    // fetch data
    await fetch("aasoptest.csv")
        .then((res) => res.text())
        .then((text) => {
            // setup name and mugshot
            data = text.split(",");

        })
        .catch((e) => console.error(e));

    // get dataset info
    const columnNum = 7;
    total = data.length / columnNum - 1;
    console.log("total: " + total);

    // dataset querying variables
    let index = 1;
    const nameOffset = 0;
    const imgOffset = 5;
    const img2Offset = 6;
    const ageOffset = 1;
    const sexOffset = 2;

    function generateCharaInfo() {
        const newName = document.createTextNode(data[columnNum * index + nameOffset]);
        const newImage = new Image(200, 200);
        newImage.src = data[columnNum * index + imgOffset];
        // console.log(data);
        if (NameHolder != null) {
            NameHolder.appendChild(newName);
        }
        if (ImgHolder != null) {
            ImgHolder.appendChild(newImage);
        }
    }

    generateCharaInfo()

    // setup smash/pass stuff
    const smashButton = document.createElement('button');
    smashButton.textContent = "SMASH";
    smashButton.addEventListener('click', function () {

        if (data[columnNum * index + sexOffset] === "Male") {
            console.log("smashed male");
            numSmashMale++;
        } else if (data[columnNum * index + sexOffset] === "Female") {
            console.log("smashed female");
            numSmashFemale++;
        }
        numSmashTotal++;
        smashAgeTotal += Number(data[columnNum * index + ageOffset]);
        smashImageLinks.push(data[columnNum * index + img2Offset]);

        if (index == Math.floor(total)) {
            window.location.href = "/result.html";
            updateResultPage();
        }
        resetItems();
        index++;
        generateCharaInfo();
    });

    if (buttons != null) {
        buttons.appendChild(smashButton);
    }

    const passButton = document.createElement('button');
    passButton.textContent = "pass...";
    passButton.addEventListener('click', function () {

        if (data[columnNum * index + sexOffset] === "Male") {
            console.log("passed male");
            numPassMale++;
        } else if (data[columnNum * index + sexOffset] === "Female") {
            console.log("passed female");
            numPassFemale++;
        }
        numPassTotal++;
        passAgeTotal += Number(data[columnNum * index + ageOffset]);
        passImageLinks.push(data[columnNum * index + img2Offset]);

        if (index == Math.floor(total)) {
            window.location.href = "/result.html";
            updateResultPage();
        }
        resetItems();
        index++;
        generateCharaInfo();
    });

    if (buttons != null) {
        buttons.appendChild(passButton);
    }

    function updateResultPage() {
        // const results = document.getElementById("results");

        // const numSmashed = document.createTextNode("num smashed: " + numSmashTotal);
        // const smashedAverageAge = document.createTextNode("smash average age: " + Math.floor(smashAgeTotal / numSmashTotal));
        // results.appendChild(numSmashed);
        // results.appendChild(smashedAverageAge);

        // const numPassed = document.createTextNode("num passed: " + numPassTotal);
        // const passedAverageAge = document.createTextNode("pass average age: " + Math.floor(passAgeTotal / numPassTotal));
        // results.appendChild(numPassed);
        // results.appendChild(passedAverageAge);

        // const smashed = document.getElementById("smashed");
        // smashImageLinks.forEach(element => {
        //     const newImage = new Image(50);
        //     newImage.src = element;
        //     smashed.appendChild(newImage);
        // });

        // const passed = document.getElementById("passed");
        // passImageLinks.forEach(element => {
        //     const newImage = new Image(50);
        //     newImage.src = element;
        //     passed.appendChild(newImage);
        // });

        console.log("num smashed: " + numSmashTotal);
        console.log("smash average age: " + Math.floor(smashAgeTotal / numSmashTotal));
        
        console.log("num passed: " + numPassTotal);
        console.log("pass average age: " + Math.floor(passAgeTotal / numPassTotal));
        
    }

}

StartGame();