const openModalImg = document.getElementById("donation-photo");

const photoModal = () => {
    const modal = document.getElementById("img-modal");
    const closeModalBtn = document.querySelector(".close");

    openModalImg.addEventListener("click", () => {
        modal.style.display = "block";
        const content = document.querySelector('.modal-content');
        const biggerImg = document.createElement('img');
        const oimg = document.getElementById('donation-img')
        biggerImg.width = 1280;
        biggerImg.id = 'bimg'
        biggerImg.height = 1024;
        biggerImg.src = oimg.src;
        content.appendChild(biggerImg);
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        const content = document.querySelector('.modal-content');
        content.children[1].remove();
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            const content = document.querySelector('.modal-content');
            content.children[1].remove();
        }
    });
}

if (openModalImg) {
    photoModal();
}

