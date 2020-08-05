const data = {
    puzzles: [{"answer":"AFGHANISTAN"},{"answer":"ALBANIA"},{"answer":"ALGERIA"},{"answer":"AMERICANSAMOA"},{"answer":"ANGOLA"},{"answer":"ANGUILLA"},{"answer":"ANTARCTICA"},{"answer":"ARGENTINA"},{"answer":"ARMENIA"},{"answer":"ARUBA"},{"answer":"AUSTRALIA"},{"answer":"AUSTRIA"},{"answer":"AZERBAIJAN"},{"answer":"BAHAMAS"},{"answer":"BAHRAIN"},{"answer":"BANGLADESH"},{"answer":"BARBADOS"},{"answer":"BELARUS"},{"answer":"BELGIUM"},{"answer":"BELIZE"},{"answer":"BENIN"},{"answer":"BERMUDA"},{"answer":"BHUTAN"},{"answer":"BOLIVIA"},{"answer":"BOTSWANA"},{"answer":"BRAZIL"},{"answer":"BULGARIA"},{"answer":"BURKINAFASO"},{"answer":"BURUNDI"},{"answer":"CAMBODIA"},{"answer":"CAMEROON"},{"answer":"CANADA"},{"answer":"CAPEVERDE"},{"answer":"CAYMANISLANDS"},{"answer":"CHAD"},{"answer":"CHILE"},{"answer":"CHINA"},{"answer":"COLOMBIA"},{"answer":"COMOROS"},{"answer":"CONGO"},{"answer":"COOKISLANDS"},{"answer":"COSTARICA"},{"answer":"CROATIA"},{"answer":"CUBA"},{"answer":"CYPRUS"},{"answer":"CZECHREPUBLIC"},{"answer":"DENMARK"},{"answer":"DJIBOUTI"},{"answer":"DOMINICA"},{"answer":"ECUADOR"},{"answer":"EGYPT"},{"answer":"ELSALVADOR"},{"answer":"ERITREA"},{"answer":"ESTONIA"},{"answer":"ETHIOPIA"},{"answer":"FAROEISLANDS"},{"answer":"FIJI"},{"answer":"FINLAND"},{"answer":"FRANCE"},{"answer":"FRENCHGUIANA"},{"answer":"GABON"},{"answer":"GAMBIA"},{"answer":"GEORGIA"},{"answer":"GERMANY"},{"answer":"GHANA"},{"answer":"GIBRALTAR"},{"answer":"GREECE"},{"answer":"GREENLAND"},{"answer":"GRENADA"},{"answer":"GUADELOUPE"},{"answer":"GUAM"},{"answer":"GUATEMALA"},{"answer":"GUERNSEY"},{"answer":"GUINEA"},{"answer":"GUYANA"},{"answer":"HAITI"},{"answer":"HONDURAS"},{"answer":"HONGKONG"},{"answer":"HUNGARY"},{"answer":"ICELAND"},{"answer":"INDIA"},{"answer":"INDONESIA"},{"answer":"IRAQ"},{"answer":"IRELAND"},{"answer":"ISLEOFMAN"},{"answer":"ISRAEL"},{"answer":"ITALY"},{"answer":"JAMAICA"},{"answer":"JAPAN"},{"answer":"JERSEY"},{"answer":"JORDAN"},{"answer":"KAZAKHSTAN"},{"answer":"KENYA"},{"answer":"KIRIBATI"},{"answer":"KUWAIT"},{"answer":"KYRGYZSTAN"},{"answer":"LATVIA"},{"answer":"LEBANON"},{"answer":"LESOTHO"},{"answer":"LIBERIA"},{"answer":"LIECHTENSTEIN"},{"answer":"LITHUANIA"},{"answer":"LUXEMBOURG"},{"answer":"MACAO"},{"answer":"MADAGASCAR"},{"answer":"MALAWI"},{"answer":"MALAYSIA"},{"answer":"MALDIVES"},{"answer":"MALI"},{"answer":"MALTA"},{"answer":"MARTINIQUE"},{"answer":"MAURITANIA"},{"answer":"MAURITIUS"},{"answer":"MAYOTTE"},{"answer":"MEXICO"},{"answer":"MONACO"},{"answer":"MONGOLIA"},{"answer":"MONTSERRAT"},{"answer":"MOROCCO"},{"answer":"MOZAMBIQUE"},{"answer":"MYANMAR"},{"answer":"NAMIBIA"},{"answer":"NAURU"},{"answer":"NEPAL"},{"answer":"NETHERLANDS"},{"answer":"NEWCALEDONIA"},{"answer":"NEWZEALAND"},{"answer":"NICARAGUA"},{"answer":"NIGER"},{"answer":"NIGERIA"},{"answer":"NORFOLKISLAND"},{"answer":"NORWAY"},{"answer":"OMAN"},{"answer":"PAKISTAN"},{"answer":"PALAU"},{"answer":"PANAMA"},{"answer":"PARAGUAY"},{"answer":"PERU"},{"answer":"PHILIPPINES"},{"answer":"PITCAIRN"},{"answer":"POLAND"},{"answer":"PORTUGAL"},{"answer":"PUERTORICO"},{"answer":"QATAR"},{"answer":"REUNION"},{"answer":"ROMANIA"},{"answer":"RWANDA"},{"answer":"SAINTHELENA"},{"answer":"SAINTLUCIA"},{"answer":"SAMOA"},{"answer":"SANMARINO"},{"answer":"SAUDIARABIA"},{"answer":"SENEGAL"},{"answer":"SEYCHELLES"},{"answer":"SIERRALEONE"},{"answer":"SINGAPORE"},{"answer":"SLOVAKIA"},{"answer":"SLOVENIA"},{"answer":"SOMALIA"},{"answer":"SOUTHAFRICA"},{"answer":"SPAIN"},{"answer":"SRILANKA"},{"answer":"SUDAN"},{"answer":"SURIANSWER"},{"answer":"SWAZILAND"},{"answer":"SWEDEN"},{"answer":"SWITZERLAND"},{"answer":"TAJIKISTAN"},{"answer":"THAILAND"},{"answer":"TOGO"},{"answer":"TOKELAU"},{"answer":"TONGA"},{"answer":"TUNISIA"},{"answer":"TURKEY"},{"answer":"TURKMENISTAN"},{"answer":"TUVALU"},{"answer":"UGANDA"},{"answer":"UKRAINE"},{"answer":"UNITEDKINGDOM"},{"answer":"UNITEDSTATES"},{"answer":"URUGUAY"},{"answer":"UZBEKISTAN"},{"answer":"VANUATU"},{"answer":"VENEZUELA"},{"answer":"VIETNAM"},{"answer":"WESTERNSAHARA"},{"answer":"YEMEN"},{"answer":"ZAMBIA"},{"answer":"ZIMBABWE"}],
    state: 0,
    letters: {
        spinning: [],
        selected: [],
        spinningSlots: {},
        selectedSlots: []
    }
};

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getRandomWord() {
    return data.puzzles[Math.floor(Math.random()*data.puzzles.length)]
}

function addLetter(letter) {
    const elem = document.createElement("span");
    elem.innerText  = letter;
    elem.classList.add("letter");
    document.getElementById("main").appendChild(elem);
    data.letters.spinning.push({
        elem,
        letter,
        x: 0,
        y: 0
    });

    addSpinningSlots(data.letters.spinning.length);
    invalidateSelectedSlots();
}

function addSpinningSlots(length) {
    data.letters.spinningSlots[length]  = [];

    let numElements = length,
        angle = 0,
        radius = 0.5,
        width = 1,
        height = 1,
        step = (2*Math.PI) / numElements;
    for(let i = 0; i < numElements; i++) {
        let x = width/2 + radius * Math.cos(angle);
        let y = height/2 + radius * Math.sin(angle);
        data.letters.spinningSlots[length].push({ x, y });
        angle += step;
    }
}

function invalidateSelectedSlots() {
    data.letters.selectedSlots = data.letters.spinning.map((_, index) => {
        return index / (data.letters.spinning.length - 1);
    });
}

function spinLastSelected() {
    if (data.letters.selected.length) {
        const lastSelected = data.letters.selected.pop();
        data.letters.spinning.push(lastSelected);
    }
}

function selectFromSpinning(letter) {
    for (let i=0; i<data.letters.spinning.length; i++) {
        if (data.letters.spinning[i].letter === letter) {
            data.letters.selected.push(data.letters.spinning.splice(i, 1)[0]);
            break;
        }
    }
}

function rotatePoint(center, point, angle) {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        x = (cos * (point.x - center.x)) + (sin * (point.y - center.y)) + center.x,
        y = (cos * (point.y - center.y)) - (sin * (point.x - center.x)) + center.y;
    return { x, y };
}

function rotateSlots() {
    Object.keys(data.letters.spinningSlots).forEach(length => {
        data.letters.spinningSlots[length].forEach(slot => {
            let n = rotatePoint({ x: 0.5, y: 0.5 }, slot, 15 - length);
            slot.x = n.x;
            slot.y = n.y;
        })
    });
}

function next() {
    rotateSlots();
    render();
}

function render() {
    let height = window.innerHeight;
    let width = window.innerWidth;

    let bigLettersInCircle = 5;
    let circleSize = (height / 2);
    let fontSize = circleSize / bigLettersInCircle;

    let circleTop = fontSize;
    let circleOffset = (width - circleSize) / 2;

    let lettersTop = circleTop + circleSize + fontSize * 2;
    let lettersSize = circleSize * 2;
    let lettersOffset = circleOffset - circleSize / 2;

    let letters = data.letters.spinning;
    letters.length && data.letters.spinningSlots[letters.length].forEach((slot, index) => {
        let letter = letters[index];
        letter.elem.style.left = (slot.x * circleSize + circleOffset).toFixed(2) + "px";
        let t = slot.y * circleSize + circleTop - slot.y * fontSize;
        let direction = slot.y <= 0.5 ? 1 : -1;
        let squashed = t + direction * fontSize * 2 * Math.abs(slot.y-0.5);
        letter.elem.style.top = squashed.toFixed(2) + "px";
        letter.elem.style["font-size"] = fontSize * (0.5 + slot.y);
        const color = (1 - slot.y) * 190;
        letter.elem.style["color"] = `rgb(${color},${color},${color})`;
    });

    letters = data.letters.selected;
    letters.forEach((letter, index) => {
        const slotOffset = data.letters.selectedSlots[index];
        letter.elem.style.left = (slotOffset * lettersSize + lettersOffset).toFixed(2) + "px";
        letter.elem.style.top = lettersTop.toFixed(2) + "px";
        letter.elem.style.width = fontSize;
        letter.elem.style["font-size"] = fontSize;
    });

    if (data.letters.spinning.length === 0) {
        document.body.className = isCorrect() ? "correct" : "incorrect";
    } else {
        document.body.className = "";
    }

}

function isCorrect() {
    return data.letters.selected.map(letter => letter.letter).join('') === data.puzzle.answer;
}

function linkClicked() {
    if (isCorrect()) {
        window.location.reload();
    } else {
        const link = document.getElementById("end");
        link.innerText = data.puzzle.answer + "!";
    }
}

function main() {
    document.addEventListener("keyup", event => {
        if (event.key === "Backspace") {
            spinLastSelected();
        } else if (event.key === "Enter" && isCorrect()) {
            window.location.reload();
        }
        else if (!event.ctrlKey) {
            let letter = event.key.toUpperCase();
            selectFromSpinning(letter);
        }

        let link = document.getElementById("end");
        if (!data.letters.spinning.length && !link) {
            const link = document.createElement("a");
            document.getElementById("main").appendChild(link);
            link.id = "end";
            link.innerText = isCorrect() ? "Correct! Go to the next one!" : "I give up...";
            link.onclick = linkClicked;
            link.className = "link";
            let rect = link.getBoundingClientRect();
            link.style.left = (window.innerWidth / 2 - rect.width / 2).toFixed(2);
            link.style.top = (window.innerHeight / 3).toFixed(2);
        } else if (data.letters.spinning.length && link) {
            link.parentElement.removeChild(link);
        }
    });

    data.puzzle = getRandomWord();
    let letters = data.puzzle.answer.split('');
    shuffle(letters);

    letters.forEach(letter => addLetter(letter));

    render();

    setInterval(next, 50);
}

main();

