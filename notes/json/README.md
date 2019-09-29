This directory contains JSON notes saved by users. Note that you can change this directory by changing the `NOTES_DIR` variable defined in the `notes.js` module.

Each individual json file is treated as a `notebook` to which individual notes are saved. When creating notes, you can pass a non-existent notebook directory, and it will be created for you. By default, failure to pass the `path` attribute will mean that notes are stored or searched from `notes.json`

When creating new notes, just pass the filename of the `notebook`, including the file extension. For example, run the command `node notes/index.js add --title="My first Note" --body="Body" --path="misc.json"` to create a file in the path `notes/json/misc.json` ... If you don't pass a path argument, the note will be save in your `NOTES_DIR` under the `notes.json` file.

Notes are not tracked by git.
