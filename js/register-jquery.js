var validator = $('#register-form').validate({
    rules: {
        firstName: {
            required: true,
            minlength: 2,
            maxlength: 15
        },
        lastName: {
            required: true,
            minlength: 2,
            maxlength: 15
        },
        password: {
            required: true,
            minlength: 2,
            maxlength: 15,
        },
        'confirm-password': {
            equalTo: '[name="password"]'
        },
        email: {
            required: true,
            email: true
        },
        address: {
            required: true
        },
        phone: {
            required: true
        },
        avatar: {
            required: true
        }

    },
    messages: {
        firstName: {
            required: 'vui lòng nhập tên của bạn',
            minlength: 'Tên quá ngắn',
            maxlength: 'Tên quá dài',
        },
        lastName: {
            required: 'vui lòng nhập họ của bạn',
            minlength: 'Họ quá ngắn',
            maxlength: 'Họ quá dài ',
        },
        password: {
            required: 'vui lòng nhập mật khẩu của bạn',
            minlength: 'mật khẩu quá dài, tối thiểu {0} kí tự',
            maxlength: 'mật khẩu quá dài, tối thiểu {0} kí tự',

        },
        'confirm-password': {
            equalTo: 'nhập lại mật khẩu không chính xác'
        },
        email:{
            required: 'Vui lòng nhập email',
            email: 'Sai định dạng email'
        },
        phone:{
            required: 'Vui lòng nhập số điện thoại'
        },
        address: {
            required: 'vui lòng nhập địa chỉ'
        },
        avatar: {
            required: 'vui lòng nhập avatar'
        }

    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderObject = {
            firstName: $(form["firstName"]).val(),
            lastName: $(form["lastName"]).val(),
            password: $(form["password"]).val(),
            address: $(form["address"]).val(),
            phone: $(form["phone"]).val(),
            gender: $(form["gender"]).val(),
            email: $(form["email"]).val(),
            avatar: $(form["avatar"]).val(),
            birthday: formatDate($(form["birthday"]).val()),
        };
        $.ajax({
            url: REGISTER_API,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(senderObject),
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log(data);
                console.log('-----');
                console.log(textStatus);
                console.log('-----');
                console.log(jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (Object.keys(jqXHR.responseJSON.error).length > 0) {
                    $('#summary')
                        .text(`Please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
                    validator.showErrors(jqXHR.responseJSON.error);
                }
            }
        });
        return false;
    }
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}