function sendMail(form) {
    emailjs.send('icloud', 'lost_in_library', {
        "from_name": form.name.value,
        "from_email": form.email.value,
        "message": form.message.value,
    }).then(function(response){
        let successMessage = document.createElement('div');
        successMessage.setAttribute('id', 'contact-success')
        successMessage.style.display = 'none';
        successMessage.innerHTML = `<i class="fa-solid fa-circle-check fa-2xl mb-4" style="color: #0bda51;"></i><br>
        <p>Thanks for getting in touch! I'll try to get back to you at an ungodly hour and within a reasonable timescale for a person that is also facing down a neglected backlog.</p>`;
        document.getElementById('contact-form').insertAdjacentElement('afterend', successMessage);
        $('#contact-form').fadeOut(1500);
        $('#contact-success').delay(1500).fadeIn(1000);
        $('#contact-success').addClass('center m-4');
    }, function(error){
        let errorMessage = document.createElement('div');
        errorMessage.setAttribute('id', 'contact-error')
        errorMessage.style.display = 'none';
        errorMessage.innerHTML = `<i class="fa-solid fa-circle-xmark fa-2xl mb-4" style="color: #c70039;"></i>
        <p>Oh dear! I'm afraid there was an error processing your response. Error type: ${error.status} (${error.text})<br>Here is the message you entered in case you'd like to save it somewhere and try again later!</p>
        </div>
        <div class='text-start'>
        <label for='message'>Message</label>
        <input type='textarea' id='message' name='message' value=${form.message.value}>
        <div>`;
        document.getElementById('contact-form').insertAdjacentElement('afterend', errorMessage);
        $('#contact-form').fadeOut(1500);
        $('#contact-error').delay(1500).fadeIn(1000);
        $('#contact-error').addClass('center m-4');
    });
    return false;
};

$('#contact-form').on('submit', function(){
    $('#contact-submit').attr('value', 'PLEASE WAIT...');
    $('#contact-submit').addClass('active');
})