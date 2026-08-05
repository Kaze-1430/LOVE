function createBurstHearts(container) {
    const count = 8;
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.className = 'burst-heart';
        heart.textContent = Math.random() > 0.5 ? '♥' : '❤';

        const angle = (Math.PI * 2 * i) / count;
        const distance = 35 + Math.random() * 40;
        heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * distance - 25 + 'px');
        heart.style.setProperty('--scale', 0.5 + Math.random() * 0.6);
        heart.style.setProperty('--rot', Math.random() * 360 + 'deg');

        container.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }
}
/* ===========================
Teddy Generator
=========================== */

function createTeddies(){

const layer=document.querySelector(".teddy-layer");
const card=document.querySelector(".card");

layer.innerHTML="";

const rect=card.getBoundingClientRect();

const mobile=window.innerWidth<768;

const teddyCount=mobile?100:150;

for(let i=0;i<teddyCount;i++){

    const teddy=document.createElement("div");

    teddy.className="teddy";
    teddy.textContent="🧸";

    teddy.style.fontSize=
        (mobile?18+Math.random()*10:22+Math.random()*20)+"px";

    let x;
    let y;

    do{

        x=Math.random()*window.innerWidth;
        y=Math.random()*window.innerHeight;

    }

    while(

        x>rect.left-60 &&
        x<rect.right+60 &&
        y>rect.top-60 &&
        y<rect.bottom+60

    );

    teddy.style.left=x+"px";
    teddy.style.top=y+"px";

    teddy.style.setProperty(
        "--speed",
        (2+Math.random()*3)+"s"
    );

    teddy.style.animationDelay=
        (-Math.random()*3)+"s";

    layer.appendChild(teddy);

}

}

window.addEventListener("load",createTeddies);

window.addEventListener("resize",createTeddies);

document.querySelectorAll('.word-box').forEach(box => {
    box.addEventListener('click', function () {
        const word = this.dataset.word;
        const floatEl = this.closest('.word-column').querySelector('.float-word');
        const burstContainer = this.querySelector('.burst-container');

        if (!this.classList.contains('clicked')) {
            floatEl.textContent = word;
            floatEl.classList.remove('revealed');
            floatEl.classList.add('animate');
            floatEl.addEventListener('animationend', () => {
                floatEl.classList.remove('animate');
                floatEl.classList.add('revealed');
            }, { once: true });
            this.classList.add('clicked');
        }

        createBurstHearts(burstContainer);
    });
});

/* ===========================
Open Envelope
=========================== */

const envelope =
document.getElementById("envelope");

const envelopeScreen =
document.getElementById("envelope-screen");

const cardScreen =
document.getElementById("card-screen");

envelope.addEventListener("click", () => {

envelope.classList.add("opening");

setTimeout(() => {

    envelopeScreen.style.display = "none";

    cardScreen.classList.add("show");

}, 750);

});

document.querySelectorAll(".mini-envelope").forEach(envelope => {

    envelope.addEventListener("click", function(e){

        e.stopPropagation();


        // ==========================
        // REVEAL / HIDE PHOTO
        // ==========================

        const photo = this.parentElement.querySelector(".couple-photo");
        const question = this.parentElement.querySelector(".question-mark");


        if(photo && question){

            if(photo.classList.contains("hidden")){

                photo.classList.remove("hidden");
                photo.classList.add("reveal");

                question.classList.add("hide");

            }
            else{

                photo.classList.remove("reveal");
                photo.classList.add("hidden");

                question.classList.remove("hide");

            }

        }


        // ==========================
        // MESSAGE POPUP
        // ==========================

        let existingMessage =
        this.parentElement.querySelector(".message-popup");


        // If message already exists, remove it
        if(existingMessage){

            existingMessage.classList.remove("show");

            setTimeout(()=>{

                existingMessage.remove();

            },300);

            return;

        }


        // Create message
        const popup = document.createElement("div");

        popup.className="message-popup";

        popup.textContent=this.dataset.message;


        this.parentElement.appendChild(popup);



        // Position message

        if(this.closest(".side-boxes.left")){

            // Left side picture → message goes left
            popup.style.right="250px";
            popup.style.top="50%";

        }
        else{

            // Right side picture → message goes right
            popup.style.left="250px";
            popup.style.top="50%";

        }


        setTimeout(()=>{

            popup.classList.add("show");

        },50);


    });

});

// ===========================
// Gift Box Click Event
// ===========================

const giftBox = document.getElementById("giftBox");
const giftPhotosGrid = document.getElementById("giftPhotosGrid");

if (giftBox && giftPhotosGrid) {
    giftBox.addEventListener("click", () => {
        giftBox.classList.add("fade-out");

        setTimeout(() => {
            giftBox.style.display = "none";
            giftPhotosGrid.classList.remove("hidden");
            document.getElementById('giftMessage').classList.remove('hidden');
        }, 500);
    });
}

function drawRedString() {
    const canvas = document.getElementById('stringCanvas');
    const photos = document.querySelectorAll('.gift-photo-item');
    if (!canvas || photos.length === 0) return;

    // Set SVG size to match the container
    const grid = document.getElementById('giftPhotosGrid');
    canvas.setAttribute('width', grid.clientWidth);
    canvas.setAttribute('height', grid.clientHeight);

    const gridRect = grid.getBoundingClientRect();
    let pathData = '';

    // Loop through photos and connect center coordinates
    photos.forEach((photo, index) => {
        const rect = photo.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) - gridRect.left;
        const y = (rect.top + rect.height / 2) - gridRect.top;

        if (index === 0) {
            pathData += `M ${x} ${y}`;
        } else {
            // Smooth curved line connecting each point
            pathData += ` S ${x} ${y}, ${x} ${y}`;
        }
    });

    // Create and attach the path element
    canvas.innerHTML = `<path class="red-string-path" d="${pathData}" />`;
}

// Call the function inside your giftBox click listener after photos pop out
giftBox.addEventListener('click', () => {
    giftBox.classList.add('fade-out');
    giftPhotosGrid.classList.remove('hidden');
    document.getElementById('giftMessage').classList.remove('hidden');

    // Wait briefly for CSS animations to calculate photo positions
    setTimeout(drawRedString, 600);
});