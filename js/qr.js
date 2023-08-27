
const defaultSettings = {
    radius: 0,
    render: 'image',
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
    'maps',
    'wi-fi'
]
var currentType = 'url'
var currentData = 'Hello, World!'
var changes = 0

const makeQr = (data) => {
    $("#myQRCode").empty()
    $("#myQRCode").qrcode(
        { ...defaultSettings, 'text': data }
    );
    document.getElementById('myQRCode').firstChild.addEventListener('click', function () {
        copyElement()
    });    
    var link = document.getElementById('myQRCode').firstChild.getAttribute('src')
    document.getElementById('savePngLink').setAttribute('href', link);
}
const generateQr = (data, type) => {
    if (changes >= 1) {
        showDeleteAllBtn()
    } else {
        hideDeleteAllBtn()
    }
    switch (type) {
        case 'url':
            var url = document.querySelectorAll('input[type=url]')[0].value
            data = !url ? currentData : url
            makeQr(data)
            break;
        case 'text':
            var txt = document.querySelectorAll('input[type=text]')[0].value
            data = !txt ? currentData : txt
            makeQr(data)
            break;
        case 'sms':
            var number = document.querySelectorAll('input[type=smsNumber]')[0].value
            var message = document.querySelectorAll('input[type=smsMessage]')[0].value
            data = !number ? currentData : `smsto:${number}:${message}`
            makeQr(data)

            break;
        case 'mail':
            var mail = document.querySelectorAll('input[type=mail]')[0].value
            var subject = document.querySelectorAll('input[type=mailSubject]')[0].value
            var mailmessage = document.querySelectorAll('input[type=mailMessage]')[0].value
            data = !mail ? currentData : `mailto:${mail}?subject=${subject}&body=${mailmessage}`
            makeQr(data)

            break;
        case 'phone':
            var phone = document.querySelectorAll('input[type=phone]')[0].value

            data = !phone ? currentData : `tel:${phone.trim()}`
            makeQr(data)
            break;
        case 'maps':
            var geo = document.querySelectorAll('input[type=maps]')[0].value.trim()
            data = !geo ? currentData : `geo:${geo}`
            makeQr(data)
            break;
        case 'wi-fi':
            var networkName = document.querySelectorAll('input[type=networkName]')[0].value
            var password = document.querySelectorAll('input[type=password]')[0].value
            var encryption = document.querySelectorAll('select[type=encryption]')[0].value == 'No encryption' ? 'nopass' : document.querySelectorAll('select[type=encryption]')[0].value.split('/')[0]
           
            data = !networkName ? currentData : `WIFI:T:${encryption};S:${networkName};P:${password};;`
            console.log(data)
            makeQr(data)
        break;
}
}
const changeType = (type) => {
    currentType = type;
    console.log(type + 'Form')
    typeList.forEach((el) => {
        document.getElementById(el + 'Form').style.display = 'none'
        document.getElementById(el).style.outline = 'none'
    })
    document.getElementById(type + 'Form').style.display = 'block'
    document.getElementById(type).style.outline = '2px solid var(--orange)'
}
const changeRadius = (radius) => {
    changes += 1
    defaultSettings['radius'] = radius / 100
    generateQr(currentData, currentType)
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
    defaultSettings['mode'] = 4
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
var forms = document.getElementsByClassName('inputForm');

Array.from(forms).forEach(form => {
    form.addEventListener('keyup', function () {
        generateQr(this.value, currentType)
    });
});

async function copyElement() {
    const response = await fetch(document.getElementById('myQRCode').firstChild.getAttribute('src'));
    const blob = await response.blob()
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob})])
    document.getElementById('copyAlert').classList.add('alertAnimation')
    document.getElementById('copyPng').style.pointerEvents = 'none'
    document.getElementById('myQRCode').firstChild.style.pointerEvents = 'none'

    setTimeout(() => {
        document.getElementById('copyAlert').classList.remove('alertAnimation')
        document.getElementById('copyPng').style.pointerEvents = 'all'
        document.getElementById('myQRCode').firstChild.style.pointerEvents = 'all'}, 2000);
}



document.getElementById('url').style.outline = '2px solid var(--orange)'
document.getElementById('urlForm').style.display = 'block'
generateQr(currentData, currentType)

document.getElementById('myQRCode').firstChild.addEventListener('click', function () {
    copyElement()
});
