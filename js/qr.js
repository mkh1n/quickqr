const defaultSettings = {
    render: 'image',
    size: 300,
    ecLevel: 'H',
    fill: '#212121',
    text: 'URL goes here',
    mode: 0,
    fontcolor: '#e41b17'
}
var type = 'text'
sendData = (data, type) => {
    switch (type) {
        case 'text':
            $("#myQRCode").qrcode(
                {defaultSettings, text: data}
            );
            console.log('hello world')

            break;
    
        default:
            break;
    }
}
document.querySelector('input').addEventListener('keydown', function() {
    sendData()
  })