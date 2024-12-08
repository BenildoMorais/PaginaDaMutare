const contactForm = document.querySelector('.php-email-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message =  document.getElementById('message');

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log('submit cliked');

    let fromData = {
        name : name.value,
        email : email.value,
        subject : subject.value,
        message : message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:9000/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('email enviado');
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        }else{
            alert('algo deu errado')
        }
    }

    xhr.send(JSON.stringify(fromData));

})