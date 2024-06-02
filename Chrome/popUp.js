document.getElementById('saveButton').addEventListener('click', saveOrUpdateNote);
let editingNoteIndex = null;

function saveOrUpdateNote() {
    let noteDate = document.getElementById('noteDate').value;
    let noteTitle = document.getElementById('noteTitle').value;
    let noteBody = document.getElementById('noteBody').value;

    let note = { date: noteDate, title: noteTitle, body: noteBody };
    let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

    if (editingNoteIndex !== null) {
        notes[editingNoteIndex] = note;
        editingNoteIndex = null;
    } else {
        notes.push(note);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    clearInputs();
}

function displayNotes() {
    let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
    let notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        let noteDiv = document.createElement('div');
        noteDiv.innerHTML = `
            <p><strong>${note.title}</strong> (${note.date})</p>
            <p>${note.body}</p>
            <button id="editButton-${index}">Edit</button>
            <button id="deleteButton-${index}">Delete</button>
            <hr>`;
        notesList.appendChild(noteDiv);

        document.getElementById(`editButton-${index}`).addEventListener('click', function() {
            editNote(index);
        });
        document.getElementById(`deleteButton-${index}`).addEventListener('click', function() {
            deleteNote(index);
        });
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function editNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes'));
    document.getElementById('noteDate').value = notes[index].date;
    document.getElementById('noteTitle').value = notes[index].title;
    document.getElementById('noteBody').value = notes[index].body;
    editingNoteIndex = index;
}

function clearInputs() {
    document.getElementById('noteDate').value = '';
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteBody').value = '';
}

// Initial display of notes
displayNotes();

