const contactForm = document.querySelector('.php-email-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit cliked');

    contactForm.querySelector('.loading').classList.add('d-block');
    contactForm.querySelector('.error-message').classList.remove('d-block');
    contactForm.querySelector('.sent-message').classList.remove('d-block');

    let fromData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://servidor-de-email.vercel.app/?vercelToolbarCode=VickDAxzcL3Krjb:9000/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            contactForm.querySelector('.loading').classList.remove('d-block');
            contactForm.querySelector('.sent-message').classList.add('d-block');

            setTimeout(() => {
                contactForm.reset();
                contactForm.querySelector('.sent-message').classList.remove('d-block');
            }, 3000);
        } else {
            alert('algo deu errado')
        }
    }

    xhr.send(JSON.stringify(fromData));

})