document.addEventListener('DOMContentLoaded', function() {
    // In a real application, you would generate these server-side
    const secretKey = 'ABCDEF123456';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/CryptoTradeApp:user@example.com?secret=${secretKey}&issuer=CryptoTradeApp`;

    document.getElementById('qrCode').src = qrCodeUrl;
    document.getElementById('secretKey').textContent = secretKey;

    document.getElementById('verify2FAForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const code = this.querySelector('input[type="text"]').value;
        // In a real application, you would verify this code server-side
        if (code === '123456') { // This is a mock verification
            alert('Two-Factor Authentication has been successfully set up!');
            window.location.href = 'profile.html';
        } else {
            alert('Invalid code. Please try again.');
        }
    });
});
