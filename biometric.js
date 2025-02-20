document.getElementById("biometricLogin").addEventListener("click", async () => {
    try {
        const publicKeyCredential = await navigator.credentials.create({
            publicKey: {
                challenge: new Uint8Array(32),
                rp: { name: "Book Log App" },
                user: { id: new Uint8Array(16), name: "user@example.com", displayName: "User" },
                pubKeyCredParams: [{ alg: -7, type: "public-key" }]
            }
        });
        alert("Biometric authentication successful!");
    } catch (err) {
        alert("Authentication failed: " + err.message);
    }
});
