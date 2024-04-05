function sendMail(form) {
    emailjs.send('icloud', 'lost_in_library', {
        "from_name": form.name.value,
        "from_email": form.email.value,
        "message": form.message.value,
    }).then(function(response){

    }), function(error){

    }
    return false;
}