export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("usersDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("users")) {
                const store = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
                store.createIndex("name", "name", { unique: true }); // Create index for 'name' field
            }
        };

        request.onsuccess = (event) => {
            console.log("Database opened successfully");
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error("Database open failed:", event.target.error);
            reject(event.target.error);
        };
    });
}

export function addUser(db, user) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");
        const request = store.add(user);

        request.onsuccess = () => resolve(user);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function getAllUsers(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readonly");
        const store = transaction.objectStore("users");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

// Function to get user by name
export function getUser(db, name) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readonly");
        const store = transaction.objectStore("users");
        const index = store.index("name"); // Get the 'name' index
        const request = index.get(name); // Use the index to retrieve user by name

        request.onsuccess = () => {
            if (request.result) {
                console.log("User found:", request.result);
                resolve(request.result);
            } else {
                console.log("User not found");
                reject(new Error("User not found"));
            }
        };

        request.onerror = (event) => {
            console.error("Error retrieving user:", event.target.error);
            reject(new Error("Failed to retrieve user from DB"));
        };
    });
}

export function updateUser(db, user) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");
        const request = store.put(user);

        request.onsuccess = () => resolve(user);
        request.onerror = (event) => reject(event.target.error);
    });
}

export function deleteUser(db, userId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");
        const request = store.delete(userId);

        request.onsuccess = () => resolve(`User with ID ${userId} deleted successfully`);
        request.onerror = (event) => reject(event.target.error);
    });
}
