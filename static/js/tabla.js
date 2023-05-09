const populate_donation_table = (data) => {
    const donations = data.donaciones;
    donations.forEach(donation => {
        const row = document.createElement('tr');
        for (const attr in donation) {
            const td = document.createElement('td');
            if (attr === 'direccion') {
                td.textContent = donation[attr].comuna.nombre
            }
            else if (attr === 'descripcion' || attr === 'condiciones') {
                continue;
            }
            else if (attr === 'persona') {
                td.textContent = donation[attr].nombre
            }
            else if (attr === 'foto') {
                const img = document.createElement('img');
                img.src = donation[attr]
                img.width = 120;
                img.height = 120;
                td.appendChild(img);
            }
            else {
                td.textContent = donation[attr]
            }
            row.appendChild(td);
        }
        row.onclick = () => {
            const stringObj = JSON.stringify(donation);
            localStorage.setItem('donation', stringObj);
            window.location = 'informacion-donacion.html';
        }
        donation_table.appendChild(row);
    });
}

const populate_order_table = (data) => {
    const orders = data.pedidos;
    orders.forEach(order => {
        const row = document.createElement('tr');
        for (const attr in order) {
            const td = document.createElement('td');
            if (attr === 'direccion') {
                td.textContent = order[attr].comuna.nombre
            }
            else if (attr === 'persona') {
                td.textContent = order[attr].nombre
            }
            else {
                td.textContent = order[attr]
            }
            row.appendChild(td);
        }
        row.onclick = () => {
            const stringObj = JSON.stringify(order);
            localStorage.setItem('order', stringObj);
            window.location = 'informacion-pedido.html';
        }
        order_table.appendChild(row);
    });
}

let data;
const donation_table = document.getElementById("donation-table");
const order_table = document.getElementById('order-table');

const xhr = new XMLHttpRequest();
xhr.open('GET', '../assets/donaciones_pedidos.json');
xhr.responseType = 'json';
xhr.send();
xhr.onload = function() {
    if (this.status === 200) {
        data = this.response;

        if (donation_table) {
            populate_donation_table(data);
        }
        if (order_table) {
            populate_order_table(data);
        }
    }
};