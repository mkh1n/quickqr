const defaultSettings = {
    radius: 0,
    render: 'canvas',
    size: 1000,
    ecLevel: 'L',
    fill: '#000000',
    text: 'URL goes here',
    mode: 0,
    fontcolor: '#000000',
    background: '#fff',
    quiet: 2,
}
const typeList = [
    'url',
    'text',
    'sms',
    'mail',
    'phone',
    'whatsapp',
    'wi-fi'
]
var currentType = 'url'
var currentData = 'Hello, World!'
var changes = 0

const generateQr = (data, type) => {
    $("#myQRCode").empty()
    if (changes >= 1) {
        showDeleteAllBtn()
    } else {
        hideDeleteAllBtn()
    }
    switch (type) {
        case 'url':
            data = !document.querySelector('input').value ? currentData : document.querySelector('input').value
            $("#myQRCode").qrcode(
                { ...defaultSettings, text: data }
            );
            console.log({ ...defaultSettings, text: data })

            break;

        default:
            break;
    }
}
const changeType = (type) => {
    currentType = type;
    console.log(type + 'Form')
    typeList.forEach((el) => {
        document.getElementById(el + 'Form').style.display = 'none'
    })
    document.getElementById(type + 'Form').style.display = 'block' 

}
const changeRadius = (radius) => {
    changes += 1
    defaultSettings['radius'] = radius / 100
    generateQr(currentData, currentType)
    document.getElementById('sliderIcon').style.borderRadius = String(radius / 1.4) + '%'
}
const changeColor = (color, id) => {
    changes += 1
    if (id == 'qrBgColor') {
        defaultSettings['background'] = color
    } else {
        defaultSettings['fill'] = color
    }
    generateQr(currentData, currentType)
}
document.querySelectorAll('.option-item').forEach(btn => {
    btn.addEventListener("click", () => {
        changes += 1
        defaultSettings['ecLevel'] = 'H'
        defaultSettings['mSize'] = 0.2
        defaultSettings['mode'] = 4
        defaultSettings['image'] = btn.children[0]
        document.getElementById('logoBtn').style.backgroundImage = `url(${btn.children[0].src})`;
        document.getElementById('deleteLogo').style.display = `block`;
        generateQr(currentData, currentType)
    });
});
const deleteLogo = () => {
    changes -= 1
    defaultSettings['image'] = 'none'
    defaultSettings['mode'] = 0
    defaultSettings['ecLevel'] = `L`;
    document.getElementById('deleteLogo').style.display = `none`;
    document.getElementById('logoBtn').style.backgroundImage = "url(images/logos/telegram.png)";
    generateQr(currentData, currentType)
}
const showDeleteAllBtn = () => {
    document.getElementById('deleteAll').style.opacity = `1`;
    document.getElementById('deleteAll').style.pointerEvents = `all`;
}
const hideDeleteAllBtn = () => {
    document.getElementById('deleteAll').style.opacity = `0`;
    document.getElementById('deleteAll').style.pointerEvents = `none`;
}
const deleteAll = () => {
    deleteLogo()
    changeColor('#fff', 'qrBgColor')
    changeColor('#000000', 'qrFillColor')
    document.getElementById('qrBgColor').value = '#ffffff';
    document.getElementById('qrFillColor').value = '#000000';
    changeRadius(0)
    hideDeleteAllBtn()
    changes = 0
}
document.getElementById('urlForm').style.display = 'block' 

generateQr(currentData, currentType)
