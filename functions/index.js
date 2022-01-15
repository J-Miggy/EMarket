const functions = require("firebase-functions");
const firestore= firebase.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const setupGuides = (data) => {
    let html = '';
    data.forEach(doc => {
        const guide = doc.data();
        const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body">${guide.content}</div>
        </li>
        `;
        html += li
    });    

    
}