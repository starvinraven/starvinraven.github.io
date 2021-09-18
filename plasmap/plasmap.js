const canvas = document.getElementById('canvas')
const size = canvas.width
const ctx = canvas.getContext('2d')
const roughness = 2.5

const heightMap = Array(size).fill(0).map(() => Array(size))

const displace = (w) => {
    return (Math.random() - 0.5) * w / size * roughness;
}

const normalize = (v) => v < 0 ? 0 : v > 1 ? 1 : v

const iterate = (x, y, w, h1, h2, h3, h4) => {
    const newSize = Math.floor(w / 2) 
    if (w > 1) {
        const mid = normalize(displace(w) + ((h1 + h2 + h3 + h4) / 4))
        const e1 = (h1 + h2) / 2
        const e2 = (h2 + h3) / 2
        const e3 = (h3 + h4) / 2
        const e4 = (h4 + h1) / 2
        iterate(x,           y,             newSize,  h1,       e1,     mid,    e4)
        iterate(x + newSize, y,             newSize,  e1,       h2,     e2,     mid)
		iterate(x + newSize, y + newSize,   newSize,  mid,      e2,     h3,     e3)
		iterate(x,           y + newSize,   newSize,  e4,       mid,    e3,     h4)
    } else {
        const h = (h1 + h2 + h3 + h4) / 4
        
        if (x < size && y < size) {
		    heightMap[y][x] = h
        }   
    }
}

iterate(0, 0, size, Math.random(), Math.random(), Math.random(), Math.random())

// generated @ rampgen.com
const getColor = (v) => {
    return v >= 255 ? '#F5F5F9' :
    v >= 246.77 ? '#DEE0DD' :
    v >= 238.55 ? '#C8CBC1' :
    v >= 230.32 ? '#B1B7A5' :
    v >= 222.1 ? '#9BA289' :
    v >= 213.87 ? '#848D6D' :
    v >= 205.65 ? '#6E7951' :
    v >= 197.42 ? '#67895A' :
    v >= 189.19 ? '#619A64' :
    v >= 180.97 ? '#5AAB6D' :
    v >= 172.74 ? '#54BC77' :
    v >= 164.52 ? '#4EB26D' :
    v >= 156.29 ? '#48A964' :
    v >= 148.06 ? '#429F5B' :
    v >= 139.84 ? '#3C9652' :
    v >= 131.61 ? '#368C49' :
    v >= 123.39 ? '#308340' :
    v >= 115.16 ? '#2A7937' :
    v >= 106.94 ? '#24702E' :
    v >= 98.71 ? '#1E6625' :
    v >= 90.48 ? '#185D1C' :
    v >= 82.26 ? '#505EE1' :
    v >= 74.03 ? '#4858DD' :
    v >= 65.81 ? '#4153DA' :
    v >= 57.58 ? '#394ED6' :
    v >= 49.35 ? '#3248D3' :
    v >= 41.13 ? '#2B43CF' :
    v >= 32.9 ? '#233ECC' :
    v >= 24.68 ? '#1C38C8' :
    v >= 16.45 ? '#1433C5' :
    v >= 8.23 ? '#0D2EC1' :
    v >= 0 ? '#0629BE' :
            '#0629BE'; 
  }

const heightToFillStyle = (height) => {
    if (!height) {
        return 'rgba(128,128,128,0)'
    }
    return getColor(height * 255)
}

for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
        ctx.fillStyle = heightToFillStyle(heightMap[y][x])
        ctx.fillRect(y, x, 1, 1)
    }
}

