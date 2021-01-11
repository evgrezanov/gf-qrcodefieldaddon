document.addEventListener('DOMContentLoaded', function () {

    var datasetMode = document.getElementById('qr-reader');
    var resultInput = document.getElementById('qrcode-result');
    
    if (typeof datasetMode !== "undefined" && datasetMode !== null) {
        var mode = datasetMode.dataset.qrmode;

        if (mode == 'pro') {
            // Create instance of the object. The only argument is the "id" of HTML element created above.
            const html5QrCode = new Html5Qrcode("qr-reader");

            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,    // sets the framerate to 10 frame per second
                    qrbox: 250  // sets only 250 X 250 region of viewfinder to
                    // scannable, rest shaded.
                },
                qrCodeMessage => {
                    // do something when code is read. For example:
                    console.log(`QR Code detected: ${qrCodeMessage}`);
                    //var resultInput = document.getElementById('qrcode-result');
                    resultInput.value = qrCodeMessage;
                    // Optional: To close the QR code scannign after the result is found
                    html5QrCode.stop().then(ignore => {
                        html5QrCode.clear();
                        // QR Code scanning is stopped.
                        resultInput.style.display = "block";
                    }).catch(err => {
                        // Stop failed, handle it.
                        console.log(`Stop failed, handle it scanning, error: ${err}`);
                    });

                },
                errorMessage => {
                    // parse error, ideally ignore it. For example:
                    console.log(`QR Code no longer in front of camera.`);
                })
                .catch(err => {
                    // Start failed, handle it. For example,
                    console.log(`Unable to start scanning, error: ${err}`);
                });
        }

        if (mode == 'lite') {
            var resultContainer = document.getElementById('qr-reader-results');
            var lastResult, countResults = 0;

            var html5QrcodeScanner = new Html5QrcodeScanner(
                "qr-reader",
                { fps: 10, qrbox: 250 }
            );

            function onScanSuccess(qrCodeMessage) {
                if (qrCodeMessage !== lastResult) {
                    ++countResults;
                    lastResult = qrCodeMessage;
                    //resultContainer.innerHTML += `<div>[${countResults}] - ${qrCodeMessage}</div>`;
                    resultInput.value = qrCodeMessage;
                    // Optional: To close the QR code scannign after the result is found
                    //html5QrcodeScanner.clear();
                    resultInput.style.display = "block";
                    //resultContainer.style.display = "none";
                }
            }

            // Optional callback for error, can be ignored.
            function onScanError(qrCodeError) {
                // This callback would be called in case of qr code scan error or setup error.
                // You can avoid this callback completely, as it can be very verbose in nature.
            }

            html5QrcodeScanner.render(onScanSuccess, onScanError);
        }
    }
    
}, false);