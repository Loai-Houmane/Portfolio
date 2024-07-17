function getMainColor(image) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0, image.width, image.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const colorCounts = {};

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];

        if (alpha < 255) continue;

        const color = `${r},${g},${b}`;

        colorCounts[color] = (colorCounts[color] || 0) + 1;
    }

    let maxCount = 0;
    let mainColor = '';

    for (const color in colorCounts) {
        if (colorCounts[color] > maxCount) {
            maxCount = colorCounts[color];
            mainColor = color;
        }
    }

    return `rgb(${mainColor})`;
}

function applyGlowEffect(img) {
    console.log('Image loaded');
    const mainColor = getMainColor(img);
    console.log('Main color:', mainColor);
    
    // Adjust these values to control the glow effect
    const offsetX =0;
    const offsetY = 0;
    const blurRadius = 5; // Adjust for more or less glow
    
    // Create a CSS rule for the hover effect
    const style = document.createElement('style');
    style.innerHTML = `
        #myImage:hover {
            filter: drop-shadow(${offsetX}px ${offsetY}px ${blurRadius}px ${mainColor});
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('myImage');
    if (img.complete) {
        applyGlowEffect(img); // If the image is cached, apply the effect immediately
    } else {
        img.onload = function() {
            applyGlowEffect(img);
        };
    }
});
