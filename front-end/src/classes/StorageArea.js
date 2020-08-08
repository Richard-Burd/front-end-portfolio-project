export class StorageArea {
    constructor(name, id, area) {
        this.name = name;
        this.id = id;
        this.area = area;
    }
    allStorageAreas() {
        StorageArea.allStorageAreas.push(this);
    }
}
StorageArea.allStorageAreas = [];
