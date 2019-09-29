const chalk = require('chalk');
const yargs = require('yargs');

const note = require('./notes');

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
  builder: {
    path: {
      describe: 'where are your notes located?',
      type: 'string'
    }
  },
  handler: argv => {
    note.listNotes(argv.path);
  }
});

// create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {
    title: {
      describe: 'provide the title of the note you would like to read',
      demandOption: true,
      type: 'string'
    },
    path: {
      describe: 'provide the path of the note you would like to read',
      type: 'string'
    }
  },
  handler: argv => {
    note.readNote(argv.title, argv.path);
  }
});

// create update command
yargs.command({
  command: 'update',
  describe: 'update a note',
  builder: {
    title: {
      describe: 'current title of the note you want to update',
      demandOption: true,
      type: 'string'
    },
    path: {
      describe: 'path of the target note',
      type: 'string'
    },
    body: {
      describe: 'new body of the note',
      demandOption: true,
      type: 'string'
    },
    overwrite: {
      describe: 'overwrite old body completely',
      type: 'boolean'
    }
  },
  handler: argv => {
    note.updateNote(argv.body, argv.title, argv.path, argv.overwrite);
  }
});

yargs.parse();
