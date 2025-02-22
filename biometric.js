// DOM Elements
const biometricLoginButton = document.getElementById('biometricLogin');

// Helper function to convert base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Function to register a new credential
async function registerCredential() {
    const publicKey = {
        challenge: Uint8Array.from('random_challenge', c => c.charCodeAt(0)),
        rp: {
            name: 'Book Log App',
            id: window.location.hostname,
        },
        user: {
            id: Uint8Array.from('unique_user_id', c => c.charCodeAt(0)),
            name: 'user@example.com',
            displayName: 'User Example',
        },
        pubKeyCredParams: [
            { type: 'public-key', alg: -7 }, // ES256
            { type: 'public-key', alg: -257 } // RS256
        ],
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'preferred',
        },
        timeout: 60000,
        attestation: 'direct',
    };

    try {
        const credential = await navigator.credentials.create({ publicKey });
        if (credential) {
            const credentialData = {
                id: credential.id,
                rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
                response: {
                    attestationObject: btoa(String.fromCharCode(...new Uint8Array(credential.response.attestationObject))),
                    clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON))),
                },
            };
            localStorage.setItem('credential', JSON.stringify(credentialData));
            alert('Biometric registration successful.');
        }
    } catch (error) {
        console.error('Error during credential creation:', error);
        alert('Biometric registration failed.');
    }
}

// Function to authenticate using the stored credential
async function authenticate() {
    const storedCredential = JSON.parse(localStorage.getItem('credential'));
    if (!storedCredential) {
        alert('No stored credential found. Please register first.');
        return;
    }

    const publicKey = {
        challenge: Uint8Array.from('random_challenge', c => c.charCodeAt(0)),
        allowCredentials: [{
            type: 'public-key',
            id: base64ToArrayBuffer(storedCredential.rawId),
        }],
        timeout: 60000,
        userVerification: 'preferred',
    };

    try {
        const assertion = await navigator.credentials.get({ publicKey });
        if (assertion) {
            alert('Biometric authentication successful.');
            // Proceed with application-specific authentication logic
        }
    } catch (error) {
        console.error('Authentication failed:', error);
        alert('Biometric authentication failed.');
    }
}

// Event Listener for Biometric Login Button
biometricLoginButton.addEventListener('click', () => {
    const storedCredential = localStorage.getItem('credential');
    if (storedCredential) {
        authenticate();
    } else {
        registerCredential();
    }
});
