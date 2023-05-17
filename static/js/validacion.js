let err_count = 0;

const validationModal = () => {
    const modal = document.getElementById("validation-modal");
    const closeModalBtn = document.getElementById('negation-btn')
    const confBtn = document.getElementById('confirmation-btn');

    modal.style.display = 'block';

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    confBtn.addEventListener("click", () => {
        modal.style.display = "none";
        form = document.getElementById("donation-form");
        form.submit();
    })
}

const validate_donation = () => {
    const region_select = document.getElementById('region-select');
    const region = region_select.options[region_select.selectedIndex].value;
    const comuna_select = document.getElementById('comuna-select');
    const comuna = comuna_select.options[comuna_select.selectedIndex].value;
    const address = document.getElementById('street-num-input').value;
    const donation_type = document.getElementById('donation-select').value;
    const quantity = document.getElementById('quantity-input').value;
    const date = document.getElementById('date-input').value;
    let files = []
    for (let i = 1; i <= 3; i++) {
        const file = document.getElementById('foto-'+i).files[0];
        if (file) {
            files.push(file);
        }
    }
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const phoneNum = document.getElementById('cel-num').value;

    let err_msgs = document.querySelectorAll('.error-msg');
    err_msgs.forEach( e => e.remove());

    err_count = 0;

    validate_region(region);
    validate_comuna(comuna);
    validate_address(address);
    validate_donation_type(donation_type);
    validate_date(date);
    validate_quantity(quantity);
    validate_files(files);
    validate_personal_info(name, email, phoneNum);
    
    if (err_count === 0) validationModal(); 
}

const validate_order = () => {
    const region_select = document.getElementById('region-select');
    const region = region_select.options[region_select.selectedIndex].value;
    const comuna_select = document.getElementById('comuna-select');
    const comuna = comuna_select.options[comuna_select.selectedIndex].value;
    const order_type = document.getElementById('order-select');
    const desc = document.getElementById('desc-input').value;
    const quantity = document.getElementById('quantity-input').value;
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const phoneNum = document.getElementById('cel-num').value;

    let err_msgs = document.querySelectorAll('.error-msg');
    err_msgs.forEach( e => e.remove());

    err_count = 0;

    validate_region(region);
    validate_comuna(comuna);
    validate_order_type(order_type);
    validate_desc(desc);
    validate_quantity(quantity);
    validate_personal_info_no_cell(name, email);

    if (err_count === 0) validationModal();

}



const validate_region = (region) => {
    const isValid = region && region.length >= 0;
    const region_select = document.getElementById('region-select');
    region_select.addEventListener('click', () => region_select.style = 'border-color: ;');
    if (!isValid) {
        const select_parent = region_select.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Seleccione una region';
        err_msg.style = 'font-size: 0.8rem;';
        region_select.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
}

const validate_comuna = (comuna) => {
    const isValid = comuna && comuna.length >= 0;
    const comuna_select = document.getElementById('comuna-select');
    comuna_select.addEventListener('click', () => comuna_select.style = 'border-color: ;');
    if (!isValid) {
        const select_parent = comuna_select.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Selecciona una comuna';
        err_msg.style = 'font-size: 0.8rem'
        comuna_select.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
}

const validate_address = (addr) => {
    const lengthValid = addr && addr.length >= 0;
    const re = /^[a-zA-Z0-9 ]+$/;
    const formatValid = re.test(addr);
    const address_input = document.getElementById('street-num-input');
    address_input.addEventListener('click', () => address_input.style = 'border-color: ;');
    if (!lengthValid) {
        const select_parent = address_input.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese una direccion';
        err_msg.style = 'font-size: 0.8rem'
        address_input.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
    else if (!formatValid) {
        const select_parent = address_input.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingresa una direccion valida';
        err_msg.style = 'font-size: 0.8rem'
        address_input.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
}

const validate_donation_type = (type) => {
    const isValid = type && type.length >= 0;
    const donation_type = document.getElementById('donation-select');
    donation_type.addEventListener('click', () => donation_type.style = 'border-color: ;');
    if (!isValid) {
        const select_parent = donation_type.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Seleccione un tipo de donacion';
        err_msg.style = 'font-size: 0.8rem'
        donation_type.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
}

const validate_order_type = (type) => {
    const isValid = type && type.length >= 0;
    const order_type = document.getElementById('order-select');
    order_type.addEventListener('click', () => order_type.style = 'border-color: ;');
    if (!isValid) {
        const select_parent = order_type.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Seleccione un tipo de pedido';
        err_msg.style = 'font-size: 0.8rem'
        order_type.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
}

const validate_desc = (desc) => {
    const isValid = desc && desc.length >= 0 && desc.length <= 250;
    const desc_input = document.getElementById('desc-input');
    desc_input.addEventListener('click', () => desc_input.style = 'border-color: ;');
    if (!isValid) {
        const select_parent = desc_input.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese una descripcion valida';
        err_msg.style = 'font-size: 0.8rem'
        desc_input.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
}

const validate_quantity = (quantity) => {
    const lengthValid = quantity && quantity >= 0;
    const re = /^[a-zA-Z0-9]+$/;
    const formatValid = re.test(quantity);
    const quantity_in = document.getElementById('quantity-input');
    quantity_in.addEventListener('click', () => quantity.style = 'border-color: ;');
    if (!lengthValid) {
        const select_parent = quantity_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese una cantidad';
        err_msg.style = 'font-size: 0.8rem'
        quantity_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }

    else if (!formatValid) {
        const select_parent = quantity_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese una cantidad valida';
        err_msg.style = 'font-size: 0.8rem'
        quantity.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
}

const validate_date = (date) => {
    const actualDate = new Date();
    const re = /^\d{4}-\d{2}-\d{2}$/
    const formatValid = re.test(date);
    let dateValid = false;
    const objDate = new Date(date);
    dateValid = objDate > actualDate;
    const date_in = document.getElementById('date-input');
    date_in.addEventListener('click', () => date_in.style = 'border-color: ;');
    if (!formatValid || !dateValid) {
        const select_parent = date_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese una fecha valida';
        err_msg.style = 'font-size: 0.8rem'
        date_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
}

const validate_files = (files) => {
    if (!files) return false;
    const lengthValid = 1 <= files.length && files.length <= 3;

    let typeValid = true;

    for (const file in files) {
        if (file.type){
            let fileFamily = file.type.split('/')[0];
            typeValid &&= fileFamily == 'image';
        }
    }

    const photo_in = document.getElementById('photo-inputs');
    photo_in.addEventListener('click', () => photo_in.style = 'border: ;');

    if (!files || !lengthValid) {
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Añada al menos una imagen';
        err_msg.style = 'font-size: 0.8rem'
        photo_in.style = 'border: 1px solid red'
        photo_in.appendChild(err_msg);
        err_count += 1;
    }

    else if (!typeValid) {
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Solo se aceptan archivos de tipo imagen';
        err_msg.style = 'font-size: 0.8rem'
        photo_in.style = 'border: 1px solid red'
        photo_in.appendChild(err_msg);
        err_count += 1;
    }
}

const validate_personal_info_no_cell = (name, email) => {
    const nameLengthValid = name.length >= 3 && name.length <= 80;

    const mailRegex = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const mailValid = mailRegex.test(email);

    const name_in = document.getElementById('name-input');
    const email_in = document.getElementById('email-input');

    name_in.addEventListener('click', () => name_in.style = 'border-color: ;');
    email_in.addEventListener('click', () => email_in.style = 'border-color: ;');

    if (!name) {
        const select_parent = name_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese un nombre';
        err_msg.style = 'font-size: 0.8rem'
        name_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }

    else if (!nameLengthValid) {
        const select_parent = name_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Nombre debe tener minimo 3 caracteres y maximo 80 caracteres';
        err_msg.style = 'font-size: 0.8rem'
        name_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }

    if (!email) {
        const select_parent = email_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese un correo electronico';
        err_msg.style = 'font-size: 0.8rem'
        email_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }

    else if (!mailValid) {
        const select_parent = email_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese un correo valido (eg: correo@gmail.com)';
        err_msg.style = 'font-size: 0.8rem'
        email_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
} 

const validate_personal_info = (name, email, number) => {
    const nameLengthValid = name.length >= 3 && name.length <= 80;

    const mailRegex = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const mailValid = mailRegex.test(email);

    const numberRegex = /^[0-9]+$/;
    const numberValid = number.length >= 8 && numberRegex.test(number);

    const name_in = document.getElementById('name-input');
    const email_in = document.getElementById('email-input');
    const cel_num = document.getElementById('cel-num');
    name_in.addEventListener('click', () => name_in.style = 'border-color: ;');
    email_in.addEventListener('click', () => email_in.style = 'border-color: ;');
    cel_num.addEventListener('click', () => cel_num.style = 'border-color: ;');


    if (!name) {
        const select_parent = name_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese un nombre';
        err_msg.style = 'font-size: 0.8rem'
        name_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }

    else if (!nameLengthValid) {
        const select_parent = name_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Nombre debe tener minimo 3 caracteres y maximo 80 caracteres';
        err_msg.style = 'font-size: 0.8rem'
        name_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }

    if (!email) {
        const select_parent = email_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese un correo electronico';
        err_msg.style = 'font-size: 0.8rem'
        email_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }

    else if (!mailValid) {
        const select_parent = email_in.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese un correo valido (eg: correo@gmail.com)';
        err_msg.style = 'font-size: 0.8rem'
        email_in.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }

    if (!number) {
        const select_parent = cel_num.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese un numero telefonico';
        err_msg.style = 'font-size: 0.8rem'
        cel_num.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }

    else if (!numberValid) {
        const select_parent = cel_num.parentNode;
        const err_msg = document.createElement('span');
        err_msg.className = 'error-msg';
        err_msg.textContent = 'Ingrese un numero telefonico valido';
        err_msg.style = 'font-size: 0.8rem'
        cel_num.style = 'border-color: red;'
        select_parent.appendChild(err_msg);
        err_count += 1;
    }
}

const submit_donation = document.getElementById('submit-donation');

if (submit_donation) {
    submit_donation.addEventListener('click', event => {
        event.preventDefault();
        validate_donation();
    });
}

const submit_order = document.getElementById('submit-order')

if (submit_order) {
    submit_order.addEventListener('click', event => {
        event.preventDefault();
        validate_order();
    });
}
