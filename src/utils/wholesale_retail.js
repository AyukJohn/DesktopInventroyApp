// utils/indexedDB.js

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("productsDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("products")) {
                db.createObjectStore("products", { keyPath: "id", autoIncrement: true });
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

export function addProduct(db, product) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["products"], "readwrite");
        const store = transaction.objectStore("products");
        const request = store.add(product);

        request.onsuccess = () => resolve(product);
        request.onerror = (event) => reject(event.target.error);
    });
}


export function getAllProducts(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["products"], "readonly");
        const store = transaction.objectStore("products");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}


export function updateProduct(db, product) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["products"], "readwrite");
        const store = transaction.objectStore("products");
        const request = store.put(product);

        request.onsuccess = () => resolve(product);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function deleteProduct(db, productId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["products"], "readwrite");
        const store = transaction.objectStore("products");
        const request = store.delete(productId); // Delete the product by its id

        request.onsuccess = () => resolve(`Product with ID ${productId} deleted successfully`);
        request.onerror = (event) => reject(event.target.error);
    });
}
