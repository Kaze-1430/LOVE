import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  createBurstHearts(container: HTMLElement): void {

    const count = 8;

    for (let i = 0; i < count; i++) {

      const heart = document.createElement('span');

      heart.className = 'burst-heart';
      heart.textContent = Math.random() > 0.5 ? '♥' : '❤';

      const angle = (Math.PI * 2 * i) / count;
      const distance = 35 + Math.random() * 40;

      heart.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
      heart.style.setProperty('--ty', `${Math.sin(angle) * distance - 25}px`);
      heart.style.setProperty('--scale', `${0.5 + Math.random() * 0.6}`);
      heart.style.setProperty('--rot', `${Math.random() * 360}deg`);

      container.appendChild(heart);

      heart.addEventListener('animationend', () => {
        heart.remove();
      });

    }

  }

  createTeddies(): void {

  const layer = document.querySelector<HTMLElement>('.teddy-layer');
  const card = document.querySelector<HTMLElement>('.card');

  if (!layer || !card) return;

  layer.innerHTML = '';

  const rect = card.getBoundingClientRect();

  const mobile = window.innerWidth < 768;
  const teddyCount = mobile ? 100 : 150;

  for (let i = 0; i < teddyCount; i++) {

    const teddy = document.createElement('div');

    teddy.className = 'teddy';
    teddy.textContent = '🧸';

    teddy.style.fontSize =
      (mobile ? 18 + Math.random() * 10 : 22 + Math.random() * 20) + 'px';

    let x: number;
    let y: number;

    do {

      x = Math.random() * window.innerWidth;
      y = Math.random() * window.innerHeight;

    } while (

      x > rect.left - 60 &&
      x < rect.right + 60 &&
      y > rect.top - 60 &&
      y < rect.bottom + 60

    );

    teddy.style.left = `${x}px`;
    teddy.style.top = `${y}px`;

    teddy.style.setProperty(
      '--speed',
      `${2 + Math.random() * 3}s`
    );

    teddy.style.animationDelay =
      `${-Math.random() * 3}s`;

    layer.appendChild(teddy);

  }

}

drawRedString(): void {

  const canvas = document.getElementById('stringCanvas') as SVGSVGElement | null;
  const grid = document.getElementById('giftPhotosGrid') as HTMLElement | null;

  if (!canvas || !grid) return;

  const photos = document.querySelectorAll<HTMLElement>('.gift-photo-item');

  if (photos.length === 0) return;

  canvas.setAttribute('width', grid.clientWidth.toString());
  canvas.setAttribute('height', grid.clientHeight.toString());

  const gridRect = grid.getBoundingClientRect();

  let pathData = '';

  photos.forEach((photo, index) => {

    const rect = photo.getBoundingClientRect();

    const x = rect.left + rect.width / 2 - gridRect.left;
    const y = rect.top + rect.height / 2 - gridRect.top;

    if (index === 0) {
      pathData += `M ${x} ${y}`;
    } else {
      pathData += ` S ${x} ${y}, ${x} ${y}`;
    }

  });

  canvas.innerHTML =
    `<path class="red-string-path" d="${pathData}" />`;

}

  ngAfterViewInit(): void {

const envelope = document.getElementById('envelope');
const envelopeScreen = document.getElementById('envelope-screen');
const cardScreen = document.getElementById('card-screen');

if (envelope && envelopeScreen && cardScreen) {

  envelope.addEventListener('click', () => {

    envelope.classList.add('opening');

    setTimeout(() => {

      envelopeScreen.style.display = 'none';
      cardScreen.classList.add('show');

    }, 750);

  });

}

    const wordBoxes = document.querySelectorAll<HTMLElement>('.word-box');

wordBoxes.forEach(box => {

  box.addEventListener('click', () => {

    const word = box.dataset['word'];

    const floatEl = box.closest('.word-column')
      ?.querySelector<HTMLElement>('.float-word');

    const burstContainer = box.querySelector<HTMLElement>('.burst-container');

    if (floatEl && word) {

      if (!box.classList.contains('clicked')) {

        floatEl.textContent = word;

        floatEl.classList.remove('revealed');
        floatEl.classList.add('animate');

        floatEl.addEventListener('animationend', () => {

          floatEl.classList.remove('animate');
          floatEl.classList.add('revealed');

        }, { once: true });

        box.classList.add('clicked');

      }

    }

    if (burstContainer) {
      this.createBurstHearts(burstContainer);
    }

  });

});

this.createTeddies();

window.addEventListener('resize', () => {
  this.createTeddies();
});

const miniEnvelopes = document.querySelectorAll<HTMLElement>('.mini-envelope');

miniEnvelopes.forEach((miniEnvelope) => {

  miniEnvelope.addEventListener('click', (e) => {

    e.stopPropagation();

    const parent = miniEnvelope.parentElement;

    if (!parent) return;

    // ==========================
    // PHOTO
    // ==========================

    const photo = parent.querySelector<HTMLElement>('.couple-photo');
    const question = parent.querySelector<HTMLElement>('.question-mark');

    if (photo && question) {

      if (photo.classList.contains('hidden')) {

        photo.classList.remove('hidden');
        photo.classList.add('reveal');

        question.classList.add('hide');

      } else {

        photo.classList.remove('reveal');
        photo.classList.add('hidden');

        question.classList.remove('hide');

      }

    }

    // ==========================
    // MESSAGE POPUP
    // ==========================

    const existingMessage =
      parent.querySelector<HTMLElement>('.message-popup');

    if (existingMessage) {

      existingMessage.classList.remove('show');

      setTimeout(() => {

        existingMessage.remove();

      }, 300);

      return;

    }

    const popup = document.createElement('div');

    popup.className = 'message-popup';

    popup.textContent =
      miniEnvelope.dataset['message'] || '';

    parent.appendChild(popup);

    // LEFT SIDE

    if (miniEnvelope.closest('.side-boxes.left')) {

      popup.style.right = '250px';
      popup.style.top = '50%';

    }

    // RIGHT SIDE

    else {

      popup.style.left = '250px';
      popup.style.top = '50%';

    }

    setTimeout(() => {

      popup.classList.add('show');

    }, 50);

  });

});

const giftBox = document.getElementById('giftBox');
const giftPhotosGrid = document.getElementById('giftPhotosGrid');
const giftMessage = document.getElementById('giftMessage');

if (giftBox && giftPhotosGrid && giftMessage) {

  giftBox.addEventListener('click', () => {

    giftBox.classList.add('fade-out');

    setTimeout(() => {

      giftBox.style.display = 'none';

      giftPhotosGrid.classList.remove('hidden');
      giftMessage.classList.remove('hidden');

      this.drawRedString();

    }, 600);

  });

}

  }

}