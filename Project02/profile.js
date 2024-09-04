document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('profileContainer');
    const createProfileContainer = document.getElementById('createProfileContainer');
    const createProfileForm = document.getElementById('createProfileForm');
    const logoutButton = document.querySelector('.action-button.logout');

    // Check if a profile exists in localStorage
    const profile = JSON.parse(localStorage.getItem('userProfile'));

    if (profile) {
        // If a profile exists, show the profile container and hide the create profile form
        profileContainer.style.display = 'block';
        createProfileContainer.style.display = 'none';
        displayProfile(profile);
    } else {
        // If no profile exists, show the create profile form
        profileContainer.style.display = 'none';
        createProfileContainer.style.display = 'block';
    }

    // Handle profile creation
    createProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
        const password = document.getElementById('profilePassword').value;
        const confirmPassword = document.getElementById('profileConfirmPassword').value;

        // Remove any existing error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Validate passwords
        if (password !== confirmPassword) {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Passwords do not match';
            errorMessage.className = 'error-message';
            document.getElementById('profileConfirmPassword').parentNode.appendChild(errorMessage);
            return;
        }

        // In a real application, you would hash the password before storing it
        const newProfile = { name, email, password: password };
        localStorage.setItem('userProfile', JSON.stringify(newProfile));

        profileContainer.style.display = 'block';
        createProfileContainer.style.display = 'none';
        displayProfile(newProfile);
    });

    // Handle logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userProfile');
        profileContainer.style.display = 'none';
        createProfileContainer.style.display = 'block';
        createProfileForm.reset();
    });

    function displayProfile(profile) {
        document.querySelector('.profile-name').textContent = profile.name;
        document.querySelector('.profile-email').textContent = profile.email;
    }
});
