// utils/salesDB.js

export function openSalesDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("salesDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("sales")) {
                db.createObjectStore("sales", { keyPath: "id", autoIncrement: true });
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

export function addSale(db, sale) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["sales"], "readwrite");
        const store = transaction.objectStore("sales");
        const request = store.add(sale);

        request.onsuccess = () => resolve(sale);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function getAllSales(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["sales"], "readonly");
        const store = transaction.objectStore("sales");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function updateSale(db, sale) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["sales"], "readwrite");
        const store = transaction.objectStore("sales");
        const request = store.put(sale);

        request.onsuccess = () => resolve(sale);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function deleteSale(db, saleId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["sales"], "readwrite");
        const store = transaction.objectStore("sales");
        const request = store.delete(saleId); // Delete the sale by its id

        request.onsuccess = () => resolve(`Sale with ID ${saleId} deleted successfully`);
        request.onerror = (event) => reject(event.target.error);
    });
}