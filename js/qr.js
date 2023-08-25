const defaultSettings = {
    radius: 0,
    render: 'canvas',
    size: 1000,
    ecLevel: 'L',
    fill: '#000000',
    text: 'URL goes here',
    mode: 0,
    fontcolor: '#000000',
    background:'#fff',
    quiet: 2,
}
var currentType = 'text'
var currentData = 'Hello, World!'

const generateQr = (data, type) => {
    $("#myQRCode").empty()
    switch (type) {
        case 'text':
            data = !document.querySelector('input').value ? currentData : document.querySelector('input').value
            $("#myQRCode").qrcode(
                {...defaultSettings, text: data}
            );
            console.log({...defaultSettings, text: data})

            break;
    
        default:
            break;
    }
}

const changeRadius = (radius) => {
    defaultSettings['radius'] = radius/100
    generateQr(currentData, currentType)
}
const changeColor = (color, id) =>{
    if (id == 'qrBgColor'){
        defaultSettings['background'] = color

    } else {
        defaultSettings['fill'] = color
    }
    generateQr(currentData, currentType)
}
document.querySelectorAll('.option-item').forEach(btn => {
    btn.addEventListener("click", () => {
        defaultSettings['ecLevel'] = 'H'
        defaultSettings['mSize']= 0.2
        defaultSettings['mode'] = 4
        defaultSettings['image'] = btn.children[0]
        document.getElementById('myQRCode').focus()
        document.getElementById('myQRCode').click()

        document.getElementById('logoBtn').style.backgroundImage = `url(${btn.children[0].src})`; 
        console.log(btn.children[0].src)
        generateQr(currentData, currentType)
      });
});

generateQr(currentData, currentType)
