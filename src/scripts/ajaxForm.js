//ajax form
const $myForm = $('.form');
const $sendButton = $('.submit');
function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;
    return field.checkValidity();
};
function validateForm(form) {
    let valid = true;
    if (!validateField($('input[name=name]', form).get(0))) {
        valid = false;
    }
    if (!validateField($('input[name=phone]', form).get(0))) {
        valid = false;
    }
    if (!validateField($('textarea[name=comment]', form).get(0))) {
        valid = false;
    }
    return valid;
};
$sendButton.on('click', function (e) {
    e.preventDefault();
    if (validateForm($myForm)) {
        const $address = [];
        $('input[name^=address]', $myForm).each(() => $address.push($(this).val()));
        const data = {
            name: $('input[name=name]', $myForm).eq(0).val(),
            phone: $('input[name=phone]', $myForm).eq(0).val(),
            //address: $address,
            comment: $('textarea[name=comment]', $myForm).eq(0).val(),
            //pay: $('input[name=option]:checked').siblings('.radio__title').html(),
            //callback: $('input[name=callback]:checked').siblings('.radio__title').html()
            to: "mail@mail.ru" //на ленинге нет поля с email, хотя сервер ждет его
        };
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', () => {
            openModal(xhr.response.status);
            if (xhr.response.status) { $myForm[0].reset() };
        });
    };
});