// This is a sandbox-ey testing area to get started with Typescript.
// the eventual goal here will be to re-write the "objects.js" using typescript
export class PostItNote {
    constructor(id, noteColor, textColor) {
        this.id = id;
        this.noteColor = noteColor;
        this.textColor = textColor;
    }
}
// Dynamic Types
// https://github.com/Richard-Burd/typescript-sandbox/blob/master/practice_files/dynamicTypes.ts
let PostItNoteInstances = [];
let myNote = new PostItNote(PostItNoteInstances.length + 1, "blue", "dark-blue");
