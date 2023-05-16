const fileInput = document.querySelectorAll('input[type=file]');

if (fileInput.length > 0) {
    window.onload = () => {
        for (let i = 1; i <= 3; i++){
            const file_in = document.getElementById('foto-' + i);
            file_in.value = '';
        }
    }
}

const populate_regiones = (data) => {
    const region_select = document.getElementById('region-select');
    data.regiones.forEach(region => {
        const option = document.createElement('option');
        option.value = region.id;
        option.textContent = region.nombre;
        region_select.appendChild(option);
    });
}

const populate_comunas = (data) => {
    const comuna_select = document.getElementById('comuna-select');
    while (comuna_select.options.length > 1) {
        comuna_select.removeChild(comuna_select.lastChild);
    }
    const region = document.getElementById('region-select').value;
    const comunas = data.regiones[region].comunas || [];
    comunas.forEach(comuna => {
        const option = document.createElement('option');
        option.value = comuna.id;
        option.textContent = comuna.nombre;
        comuna_select.appendChild(option);
    })
}

const photo_upload = (id) => {
    const new_id = parseInt(id.split("-")[1]) + 1;
    const new_file_in = document.getElementById('foto-' + new_id);
    new_file_in.hidden = false;
}

let data;

fetch('/regiones_comunas')
    .then(response => response.json())
    .then(regiones_comunas => {
        data = regiones_comunas;
        populate_regiones(regiones_comunas);
    });