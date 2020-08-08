export class StorageArea {
  constructor(
    public name: string,
    public id: number,
    public area: number
  ) {}

  static allStorageAreas: StorageArea[] = [];

  allStorageAreas(){
    StorageArea.allStorageAreas.push(this)
  }

}
