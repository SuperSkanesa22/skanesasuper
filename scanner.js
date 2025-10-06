window.addEventListener("load", () => {
  const resultDiv = document.getElementById("result");
  const html5QrCode = new Html5Qrcode("preview");

  function onScanSuccess(decodedText) {
    try {
      const data = JSON.parse(decodedText);
      resultDiv.innerHTML = `
        <h3>✅ Tiket Valid</h3>
        <p><b>Nama:</b> ${data.nama}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Jumlah:</b> ${data.jumlah}</p>
        <p><b>Total:</b> Rp ${data.total.toLocaleString()}</p>
        <p><b>Kode Tiket:</b> <span style="color:#00bcd4">${data.kode}</span></p>
      `;
      html5QrCode.stop();
    } catch {
      resultDiv.innerHTML = `<p style="color:red;">❌ QR Code tidak valid</p>`;
    }
  }

  Html5Qrcode.getCameras().then((devices) => {
    if (devices && devices.length) {
      html5QrCode.start(devices[0].id, { fps: 10, qrbox: 250 }, onScanSuccess);
    } else {
      resultDiv.innerHTML = `<p style="color:red;">Tidak ada kamera ditemukan</p>`;
    }
  });
});