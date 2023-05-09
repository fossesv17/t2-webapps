const donation_information = () => {
    const personal_info_div = document.createElement('div');
    personal_info_div.id = 'donation-personal-info'
    const personal_info = donationData.persona;
    for (const info in personal_info) {
        const span = document.createElement('span');
        span.textContent = info + ": " + personal_info[info];
        personal_info_div.appendChild(span)
    }
    const address = donationData.direccion;
    for (const info in address) {
        const span = document.createElement('span');
        if (info === 'comuna') {
            span.textContent = info + ": " + address[info].nombre;
        }
        else {
            span.textContent = info + ": " + address[info];
        }
        personal_info_div.appendChild(span);
    }
    donation_info.appendChild(personal_info_div);

    const donation_data_div = document.createElement('div');
    donation_data_div.id = 'donation-data';

    for (const info in donationData) {
        if (info === 'direccion' || info === 'persona' || info === 'foto') {
            continue;
        }
        const span = document.createElement('span');
        span.textContent = info + ": " + donationData[info];
        donation_data_div.appendChild(span);
    }
    donation_info.appendChild(donation_data_div);

    const donation_photo = document.getElementById('donation-photo');
    const img = document.createElement('img');
    img.width = 640;
    img.height = 480;
    img.src = donationData.foto;
    img.id = 'donation-img'
    donation_photo.appendChild(img);
}

const order_information = () => {
    const personal_info_div = document.getElementById('order-info')
    const personal_info = orderData.persona;
    for (const info in personal_info) {
        const span = document.createElement('span');
        span.textContent = info + ": " + personal_info[info];
        personal_info_div.appendChild(span)
    }

    const address = orderData.direccion;
    for (const info in address) {
        const span = document.createElement('span');
        if (info === 'comuna') {
            span.textContent = info + ": " + address[info].nombre;
        }
        else {
            span.textContent = info + ": " + address[info];
        }
        personal_info_div.appendChild(span);
    }

    const order_data_div = document.getElementById('order-data')

    for (const info in orderData) {
        if (info === 'direccion' || info === 'persona') {
            continue;
        }
        const span = document.createElement('span');
        span.textContent = info + ": " + orderData[info];
        order_data_div.appendChild(span);
    }
}

const donationString = localStorage.getItem('donation');
const donationData = JSON.parse(donationString);

const orderString = localStorage.getItem('order');
const orderData = JSON.parse(orderString)


const donation_info = document.getElementById('donation-info');
const order_info = document.getElementById('order-info');

if (donation_info) {
    donation_information();
}

else if (order_info) {
    order_information();
}
