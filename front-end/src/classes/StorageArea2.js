export class StorageArea {
    constructor(name, id, area) {
        this.name = name;
        this.id = id;
        this.area = area;
    }
    allStorageAreas() {
        StorageArea2.allStorageAreas.push(this);
    }
}
StorageArea.allStorageAreas = [];
