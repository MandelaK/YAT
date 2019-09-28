const fs = require('fs');
const chalk = require('chalk');

const NOTES_DIR = `notes/json`;

const getNotes = () => {
  return 'Your notes ...';
};

const addNote = (title, body, path = 'notes.json') => {
  const notesDir = `${NOTES_DIR}/${path}`;
  const fileNotes = loadNotes(notesDir);
  // filter out notes with duplicate titles
  const duplicateNote = fileNotes.find(note => note.title === title);
  if (!duplicateNote) {
    fileNotes.push({
      title,
      body
    });
    saveNotes(fileNotes, notesDir);
  } else {
    console.log(
      chalk.red.inverse('Please create a note with a different title!')
    );
  }
};

const removeNote = (title, path) => {
  const notesDir = `${NOTES_DIR}/${path}`;
  const allNotes = loadNotes(notesDir);
  const targetNotes = allNotes.filter(note => note.title !== title);

  if (targetNotes.length > 0) {
    saveNotes(targetNotes, notesDir);
  } else {
    console.log(chalk.red(`Note not found in ${notesDir}`));
  }
};

const saveNotes = (notes, path) => {
  const noteDataJSON = JSON.stringify(notes);
  fs.writeFileSync(path, noteDataJSON);
  console.log(chalk.green.inverse('Notes Saved!'));
};

/**
 * @param path this is the path of your json file
 * Loads data from json file and returns JSON object
 *
 * @returns JSON object of type Notes
 */
const loadNotes = path => {
  try {
    const dataBuffer = fs.readFileSync(path);
    const dataJSON = dataBuffer.toString();

    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = (path = 'notes.json') => {
  debugger;
  notesDir = `${NOTES_DIR}/${path}`;
  notes = loadNotes(notesDir);
  if (notes.length > 1) {
    console.log(chalk.inverse('Below are your notes:'));
    notes.forEach(note => {
      console.log(note.title);
    });
  } else {
    console.log(chalk.red.inverse(`No notes found in ${notesDir}`));
  }
};

const readNote = (title, path = 'notes.json') => {
  notesDir = `${NOTES_DIR}/${path}`;
  notes = loadNotes(notesDir);

  targetNote = notes.find(note => note.title === title);

  if (targetNote) {
    console.log(chalk.inverse(`Title: ${title}`));
    console.log(targetNote.body);
  } else {
    console.log(
      chalk.red.inverse(`There is no note titled "${title}" in ${notesDir}`)
    );
  }
};

const updateNote = (body, title, path = 'notes.json', overwrite = false) => {
  const notesDir = `${NOTES_DIR}/${path}`;
  notes = loadNotes(notesDir);
  targetNote = notes.find(note => note.title === title);

  if (targetNote) {
    debugger;
    if (!overwrite) {
      const updatedNote = targetNote.body.concat(` ${body}`);
      targetNote.body = updatedNote;
    } else {
      targetNote.body = body;
    }
    saveNotes(notes, notesDir);
  } else {
    console.log(`Note titled "${title}" doesn't exist in ${notesDir}`);
  }
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote,
  updateNote
};
