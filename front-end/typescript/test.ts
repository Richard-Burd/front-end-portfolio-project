// This is a sandbox-ey testing area to get started with Typescript.
// the eventual goal here will be to re-write the "objects.js" using typescript
export class PostItNote {
  constructor(
    public id: number,
    public noteColor: string,
    public textColor: string
  ) {}
}

// Dynamic Types
// https://github.com/Richard-Burd/typescript-sandbox/blob/master/practice_files/dynamicTypes.ts
let PostItNoteInstances: PostItNote[] = [];

let myNote = new PostItNote(PostItNoteInstances.length+1, "blue", "dark-blue")
