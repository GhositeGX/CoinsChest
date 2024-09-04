document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.getElementById('profileContainer');
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    if (!userProfile) {
        profileContainer.innerHTML = `
            <div class="profile-info">
                <h2>No Profile Found</h2>
                <p>Please create your profile to continue.</p>
                <a href="create-profile.html" class="submit-button">Create Profile</a>
            </div>
        `;
        return;
    }

    profileContainer.innerHTML = `
        <div class="profile-info">
            <div class="profile-photo" style="background-image: url(${userProfile.profilePhoto || 'https://via.placeholder.com/100'})"></div>
            <h2 id="userName">${userProfile.fullName}</h2>
            <p id="userEmail">${userProfile.email}</p>
        </div>
        <div class="settings">
            <h3>Settings</h3>
            <ul>
                <li><button id="changePhotoBtn" class="settings-btn">Change Profile Photo</button></li>
                <li><button id="changePasswordBtn" class="settings-btn">Change Password</button></li>
                <li><button id="notificationBtn" class="settings-btn">Notification Preferences</button></li>
                <li><button id="twoFactorBtn" class="settings-btn">Two-Factor Authentication</button></li>
                <li><button id="linkedAccountsBtn" class="settings-btn">Linked Accounts</button></li>
            </ul>
        </div>
    `;

    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.getElementsByClassName('close')[0];

    function openModal(title, content) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    document.getElementById('changePasswordBtn').addEventListener('click', function() {
        openModal('Change Password', `
            <form id="changePasswordForm">
                <input type="password" placeholder="Current Password" required>
                <input type="password" placeholder="New Password" required>
                <input type="password" placeholder="Confirm New Password" required>
                <button type="submit">Change Password</button>
            </form>
        `);
    });

    document.getElementById('notificationBtn').addEventListener('click', function() {
        openModal('Notification Preferences', `
            <form id="notificationForm">
                <label><input type="checkbox" name="emailNotif"> Email Notifications</label>
                <label><input type="checkbox" name="pushNotif"> Push Notifications</label>
                <label><input type="checkbox" name="smsNotif"> SMS Notifications</label>
                <button type="submit">Save Preferences</button>
            </form>
        `);
    });

    document.getElementById('twoFactorBtn').addEventListener('click', function() {
        openModal('Two-Factor Authentication', `
            <p>Enhance your account security with 2FA.</p>
            <button id="setup2FABtn">Set up 2FA</button>
        `);
        document.getElementById('setup2FABtn').addEventListener('click', function() {
            window.location.href = 'two-factor.html';
        });
    });

    document.getElementById('linkedAccountsBtn').addEventListener('click', function() {
        openModal('Linked Accounts', `
            <ul>
                <li>Google Account: Not Linked</li>
                <li>Facebook Account: Not Linked</li>
                <li>Twitter Account: Not Linked</li>
            </ul>
            <button>Link New Account</button>
        `);
    });

    document.getElementById('changePhotoBtn').addEventListener('click', function() {
        openModal('Change Profile Photo', `
            <form id="changePhotoForm">
                <input type="file" id="newProfilePhoto" accept="image/*">
                <div id="newPhotoPreview" class="photo-preview"></div>
                <button type="submit">Update Photo</button>
            </form>
        `);

        const newPhotoInput = document.getElementById('newProfilePhoto');
        const newPhotoPreview = document.getElementById('newPhotoPreview');
        
        newPhotoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    newPhotoPreview.style.backgroundImage = `url(${e.target.result})`;
                    newPhotoPreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });

        document.getElementById('changePhotoForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const newPhotoData = newPhotoPreview.style.backgroundImage.slice(5, -2);
            userProfile.profilePhoto = newPhotoData;
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            document.querySelector('.profile-photo').style.backgroundImage = `url(${newPhotoData})`;
            modal.style.display = 'none';
        });
    });
});
