let titles = [];
let notes = [];
let priorities = [];
let finished = [];
let deletedNotes = [];
let deletedTitles = [];
sheetsound = new Audio('sheetsound.mp3');
crumplingsound = new Audio('crumplingsound.mp3');
crumplingsound.volume = 0.1;

function openWindow() {
    document.getElementById('textarea').classList.remove('d-none'); //Funktion, die textarea onclick öffnet

}
function deleteNote(index) {
    crumplingsound.play();
    deletedNotes.push(notes[index]);
    deletedTitles.push(titles[index]);
    setArray('deletedTitles', deletedTitles);
    setArray('deletedNotes', deletedNotes);
    // createTrash();                              // onclick Funktion, die angeklicktes HTML Element aus array und aus der Anzeige löscht
    titles.splice(index, 1);                    //ein Element (Zahl nach dem Komma) wird an der Stelle "index" (vor dem Komma), also an der angeklickten Stelle aus dem array namens "titles" entfernt
    notes.splice(index, 1);
    let priorityIndex = priorities.indexOf(index);
    let finishedIndex = finished.indexOf(index);


    /*
    let finishedIndex = finished.findIndex (findIndexinArray(e, index));

    function findIndexinArray(e, index) {
        return e == index
    } */
    if (priorityIndex != -1) {                  /*was genau passiert hier?* --> was ist mit -1 gemeint? --> ein Element weniger?*/
        priorities.splice(priorityIndex, 1);
    }
    if (finishedIndex != -1) {
        finished.splice(finishedIndex, 1);
    }
    setArray('titles', titles);
    setArray('notes', notes);
    setArray('priorities', priorities);
    setArray('finished', finished);


    //ein Element (Zahl nach dem Komma) wird an der Stelle "index" (vor dem Komma), also an der angeklickten Stelle aus dem array namens "notes" entfernt
    refreshNote();                  //Funktion refreshNote() wird aufgerufen, bei der der Inhalt des containers mit der ID "notes" wieder geleert wird

}


function createTrash() {
    document.getElementById('trash').innerHTML = '';
    for (let i = 0; i < deletedNotes.length; i++) {
        document.getElementById('trash').innerHTML += `
        <div class="note-container" id="note-container${i}">
        <div class ="title"><b>${deletedTitles[i]}</b>
        </div>  <br>
        <div class="note"> ${deletedNotes[i]} </div>
        </div>`;
    }
}

function openTrash() {
    createTrash();
    document.getElementById('trash').classList.remove('d-none');
    document.getElementById('trash').style.display = 'flex';
    document.getElementById('notes').style.display = 'none';
}

function showNotes() {
    document.getElementById('trash').style.display = 'none';
    document.getElementById('notes').style.display = 'flex';
}

/*diese Funktion soll nur den angeklickten Container rot färben und beim Hinzufügen einer weiteren Notiz den roten Container NICHT löschen --> funktioniert nicht!*/
function setPriority(i) {
    document.getElementById(`note-container${i}`).classList.add('red');
    if (!priorities.includes(i)) {
        priorities.push(i);
    }
    setArray('priorities', priorities);
}

function finishNote(i) {
    document.getElementById(`note-container${i}`).classList.remove('red');
    document.getElementById(`note-container${i}`).classList.add('green');
    if (!priorities.includes(i)) {
        finished.push(i);
    }
    setArray('finished', finished);
}


function addNote() {
    let newTitle = document.getElementById('input-field').value;    //der Eingabe in das input-Feld wird eine Variable zugeordnet
    let newNote = document.getElementById('textarea').value;        //der Eingabe in die textarea wird eine Variable zugeordnet
    if (newTitle && newNote != '') {
        sheetsound.play();
        notes.push(newNote);                                            //die Variable für die textarea wird in das array notes hinzugefügt
        titles.push(newTitle);
        setArray('notes', notes);
        setArray('titles', titles);
        refreshNote();                                                  //die Variable für das input-Feld wird in das array titles hinzugefügt
        //die Funktione refreshNote() wird aufgerufen, durch die der Inhalt des containers 'notes' erst geleert wird und dann die neue Eingabe hinzugefügt wird

    } else {
        alert('please add a title or a text');
    }
}
function refreshNote() {                                           //die Funktion refreshNote() wird ausgeführt
    let myNewNote = document.getElementById('notes');             //dem Inhalt des containers mit der ID 'notes' wird eine Variable zugeordnet
    myNewNote.innerHTML = '';
    //der Inhalt des containers mit der ID 'notes' wird geleert (noch im Hintergrund; ohne Anzeige)

    for (let i = 0; i < notes.length; i++) {

        if (priorities.includes(i)) {                                                         //eine for-Schleife wird ausgeführt, in der durch Klick immer wieder die angegebenen Funktionen ausgeführt werden können; die Schleife wird so oft ausgeführt bis i gleich der Länge des arrays 'notes' ist, also theoretisch unendlich oft, da das array leer ist
            document.getElementById('notes').innerHTML +=                                        //die for-Schleife wirkt sich auf den Inhalt des containers mit der ID 'notes' aus; dieser wird mit folgenden Elementen gefüllt...
                `<div class="note-container red" id="note-container${i}">
             <div class ="title"><b>${titles[i]}</b>
             <div> <div class="tooltip"> <img onclick="finishNote(${i})"src ="tick.png"> <span class="tooltiptext position2"> Done </span> </div>
             <div class="tooltip"> <img onclick="setPriority(${i})" src ="priority.png"> <span class="tooltiptext">High Priority </span>
             </div> <div class="tooltip"> <img onclick="deleteNote(${i})" src ="trash.png">  <span class="tooltiptext position2"> Delete </span> </div>
             </div> </div>  <br>
             <div class="note"> ${notes[i]} </div>
             </div>`;
        } else if (finished.includes(i)) {                                              //wenn 1. if falsch ist, dann überprüfe diese bedingung                                                      //eine for-Schleife wird ausgeführt, in der durch Klick immer wieder die angegebenen Funktionen ausgeführt werden können; die Schleife wird so oft ausgeführt bis i gleich der Länge des arrays 'notes' ist, also theoretisch unendlich oft, da das array leer ist
            document.getElementById('notes').innerHTML +=                                                                        //die for-Schleife wirkt sich auf den Inhalt des containers mit der ID 'notes' aus; dieser wird mit folgenden Elementen gefüllt...
                `<div class="note-container green" id="note-container${i}">
             <div class ="title"><b>${titles[i]}</b>
             <div> <div class="tooltip"> <img onclick="finishNote(${i})"src ="tick.png"> <span class="tooltiptext position2"> Done </span> </div>
             <div class="tooltip"> <img onclick="setPriority(${i})" src ="priority.png"> <span class="tooltiptext">High Priority </span>
             </div> <div class="tooltip"> <img onclick="deleteNote(${i})" src ="trash.png">  <span class="tooltiptext position2"> Delete </span> </div>
             </div> </div>  <br>
             <div class="note"> ${notes[i]} </div>
             </div>`;
        } else {
            document.getElementById('notes').innerHTML +=                           //die for-Schleife wirkt sich auf den Inhalt des containers mit der ID 'notes' aus; dieser wird mit folgenden Elementen gefüllt...
                `<div class="note-container" id="note-container${i}">
             <div class ="title"><b>${titles[i]}</b>
             <div> <div class="tooltip"> <img onclick="finishNote(${i})"src ="tick.png"> <span class="tooltiptext position2"> Done </span> </div>
             <div class="tooltip"> <img onclick="setPriority(${i})" src ="priority.png"> <span class="tooltiptext">High Priority </span>
             </div> <div class="tooltip"> <img onclick="deleteNote(${i})" src ="trash.png">  <span class="tooltiptext position2"> Delete </span> </div>
             </div> </div>  <br>
             <div class="note"> ${notes[i]} </div>
             </div>`;
        }
        /* setArray(notes); */

        //Hinweis: folgenden Kommentare beziehen sich auf die for- Schleife, aber ich weiß nicht wie man daneben kommentiert
        // die div mit der id "note-container" wird befüllt mit Eingaben aus dem array 'titles'; das "i" in eckigen Klammern [] ist das i aus der for-Schleife, das pro click um ein Element erweitert wird (weil i++)
        //durch click auf das Ausrufezeichen icon wird die Funktion setPriority aufgerufen (funktioniert nicht), nur die angeklickte Notiz rot färben soll
        //durch click auf das "trash-icon" wird die Funktion deleteNote aufgerufen - in geschweiften Klammern wird eine Variable angegeben (muss nicht 'i' sein), die oben bei Funktion "index" heißt
        //es wird schließlich eine div erzeugt mit der Eingabe aus dem input-field; das "i" in eckigen Klammern [] ist das "i" aus der for-Schleife, das bei jeder Ausführung mit 1 erhöht wird, also um 1 Element erweitert wird

        document.getElementById('input-field').value = ''; //das input-field wird nach Ausführung der Funktion refreshNote wieder geleert
        document.getElementById('textarea').value = ''; //die textarea wird nach Ausführung der Funktion refreshNote wieder geleert
    }
}

function init() {
    notes = getArray("notes");              // was genau mache ich in diesen Zeilen eigentlich; warum werden array-Namen mit Funktion getArray gleichgesetzt?
    titles = getArray("titles");
    priorities = getArray("priorities");
    finished = getArray("finished");
    refreshNote();
    deletedTitles = getArray("deletedTitles");
    deletedNotes = getArray("deletedNotes");
}

function getArray(key) {
    let result = JSON.parse(localStorage.getItem(key));
    if (result) {
        return result;
    } else {
        return [];
    }
}


function setArray(key, array) {                                       //was ist in meinem Code der "key" zum Laden u. Speichern des arrays
    localStorage.setItem(key, JSON.stringify(array));

}
