// utils/supplierDB.js

export function openSupplierDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("supplierDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("suppliers")) {
                db.createObjectStore("suppliers", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}


export function addSupplier(db, supplier) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["suppliers"], "readwrite");
        const store = transaction.objectStore("suppliers");
        const request = store.add(supplier);

        request.onsuccess = () => resolve(supplier);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function getAllSuppliers(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["suppliers"], "readonly");
        const store = transaction.objectStore("suppliers");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function updateSupplier(db, supplier) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["suppliers"], "readwrite");
        const store = transaction.objectStore("suppliers");
        const request = store.put(supplier);

        request.onsuccess = () => resolve(supplier);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function deleteSupplier(db, supplierId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["suppliers"], "readwrite");
        const store = transaction.objectStore("suppliers");
        const request = store.delete(supplierId); // Delete the supplier by its id

        request.onsuccess = () => resolve(`Supplier with ID ${supplierId} deleted successfully`);
        request.onerror = (event) => reject(event.target.error);
    });
}