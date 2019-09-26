const chalk = require('chalk');
const yargs = require('yargs');

const note = require('./notes/notes');

// create add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'provide note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'provide the note body',
      demandOption: true,
      type: 'string'
    },
    path: {
      describe: 'which note file do you want to use?',
      type: 'string'
    }
  },
  handler: argv => {
    note.addNote(argv.title, argv.body, argv.path);
  }
});

// create remove command

yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'what is the note title you want to remove?',
      demandOption: true,
      type: 'string'
    },
    path: {
      describe: 'where is the notebook you want to delete?',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => {
    note.removeNote(argv.title, argv.path);
  }
});

// create list command
yargs.command({
  command: 'list',
  describe: 'return a list of notes',
  handler: () => console.log('Here are your notes!')
});

// create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  handler: () => console.log('Enjoy your notes!')
});

yargs.parse();
