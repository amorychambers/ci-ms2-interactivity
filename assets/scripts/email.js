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
        document.getElementById('contact-form').insertAdjacentElement('afterend', successMessage)
        $('#contact-form').fadeOut(1500);
        $('#contact-success').delay(1500).fadeIn(1000);
        $('#contact-success').addClass('center m-4');
    }), function(error){

    }
    return false;
};

$('#contact-form').on('submit', function(){
    $('#contact-submit').attr('value', 'PLEASE WAIT...');
    $('#contact-submit').addClass('active');
})