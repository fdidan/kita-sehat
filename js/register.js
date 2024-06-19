document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmpassword = document.getElementById('confirm').value;

    // Encrypt password
    if(password==confirmpassword){
        let encryptResponse = await fetch('/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ plaintext: password })
        });
    
        let encryptResult = await encryptResponse.json();
        let encryptedPassword = encryptResult.ciphertext;
        let key = encryptResult.key;
        let iv = encryptResult.iv;
    
        // Register user with encrypted password
        let registerResponse = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: encryptedPassword,
                key: key,
                iv: iv
            })
        });
    }else{
        let registerResult = await registerResponse.json();
        console.log(registerResult.message);
    }

    
});