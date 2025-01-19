const DB_NAME = 'wholesaleDB';
const DB_VERSION = 2;
const STORE_NAME = 'wholesale';

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { 
                    keyPath: "id", 
                    autoIncrement: true 
                });
                
                // Add indexes for searching
                store.createIndex('brandName', 'brandName', { unique: false });
                store.createIndex('category', 'category', { unique: false });
                store.createIndex('reference', 'reference', { unique: true });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function addWholeSale(db, product) {
    return new Promise((resolve, reject) => {
        if (!product || !product.brandName) {
            reject(new Error('Invalid product data'));
            return;
        }

        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(product);

        request.onsuccess = () => resolve(product);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function getAllwholsale(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function updateWholeSale(db, product) {
    return new Promise((resolve, reject) => {
        if (!product || !product.id) {
            reject(new Error('Invalid product data or missing ID'));
            return;
        }

        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(product);

        request.onsuccess = () => resolve(product);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function deleteWholeSale(db, productId) {
    return new Promise((resolve, reject) => {
        if (!productId) {
            reject(new Error('Product ID is required'));
            return;
        }

        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(productId);

        request.onsuccess = () => resolve(`Product with ID ${productId} deleted successfully`);
        request.onerror = (event) => reject(event.target.error);
    });
}