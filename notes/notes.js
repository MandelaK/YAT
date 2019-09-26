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
  const duplicateNotes = fileNotes.filter(singleNote => {
    return singleNote.title === title;
  });

  if (duplicateNotes.length === 0) {
    fileNotes.push({
      title,
      body
    });
  } else {
    chalk.red('Please create a note with a different title!');
  }
  saveNotes(fileNotes, notesDir);
};

const saveNotes = (notes, path) => {
  const noteDataJSON = JSON.stringify(notes);
  fs.writeFileSync(path, noteDataJSON);
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

module.exports = {
  getNotes,
  addNote
};
