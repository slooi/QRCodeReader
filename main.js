console.log('main.js loaded')


// const code = jsQR(imageData, width, height, options?);

// if (code) {
//   console.log("Found QR code", code);
// }
const status = document.getElementById('status')


const reader = new FileReader()
reader.onload = function(){
    console.log('onload')
    console.log(reader.result)
    const image = new Image()
    image.onload = function(){
        // content.append(image)

        const canvas = document.createElement('canvas')
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
        canvas.style['width'] = image.naturalWidth + 'px'
        canvas.style['height'] = image.naturalHeight + 'px'
        content.append(canvas)
        content.append(document.createElement('p'))
        const c = canvas.getContext('2d')
        c.drawImage(image,0,0)
        const imageData = c.getImageData(0,0,canvas.height,canvas.width)
        console.log('image.naturalWidth')
        console.log(image.naturalWidth)
        console.log(image.naturalHeight)
        console.log('canvas.width')
        console.log(canvas.width)
        console.log(canvas.height)
        console.log('imageData',imageData)

        getCode(imageData.data,imageData.width,imageData.height)

    }
    image.src = reader.result
}

window.addEventListener('paste',e=>{
    console.log(e.clipboardData.files)
    try{
        reader.readAsDataURL(e.clipboardData.files[0])
    }
    catch(e){
        
        statusText('ERROR: try pasting an image',0)
        // alert('ERROR: try pasting an image')
    }
})



// FUNCTIONS
function getCode(data,width, height){
    const code = jsQR(data, width, height);

    if (code) {
        console.log("Found QR code", code);
        qrcode.innerText = code.data
        statusText('QR code found',1)
    }else{
        statusText('No QR code found',0)

        // alert('No QR code found')
        qrcode.innerText = ''
    }
}

function statusText(text,foundQRCode){
    status.innerText = text
    timer = 0
    worked = foundQRCode
}

var worked = 0
var timer = 180
tick()
function tick(){
    console.log(timer)
    if(timer<180){
        timer+=5
    }
    const val = timer/180
    if(worked){
        status.style['background-color'] = 'rgba(157, 255, 157,'+val+')'
    }else{
        status.style['background-color'] = 'rgba(255, 177, 177,'+val+')'
    }
    requestAnimationFrame(tick)
}