document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createProfileForm');
    const photoInput = document.getElementById('profilePhoto');
    const photoPreview = document.getElementById('photoPreview');
    let profilePhotoData = null;

    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePhotoData = e.target.result;
                photoPreview.style.backgroundImage = `url(${profilePhotoData})`;
                photoPreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Passwords don't match. Please try again.");
            return;
        }

        // In a real app, you'd send this data to a server
        // For now, we'll just store it in localStorage
        const profile = {
            fullName,
            email,
            password, // In a real app, never store passwords in plain text!
            profilePhoto: profilePhotoData
        };

        localStorage.setItem('userProfile', JSON.stringify(profile));
        alert('Profile created successfully!');
        window.location.href = 'profile.html';
    });
});
