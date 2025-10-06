document.getElementById("tiketForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const harga = 20000;
  const total = jumlah * harga;
  const kode = Math.random().toString(36).substring(2, 8).toUpperCase();

  const dataTiket = { nama, email, jumlah, total, kode };
  const dataString = JSON.stringify(dataTiket);

  const qr = new QRious({
    value: dataString,
    size: 200,
    background: "#fff",
    foreground: "#0b1a33"
  });

  document.getElementById("hasil").innerHTML = `
    <h3>✅ Tiketmu Siap!</h3>
    <p><b>Nama:</b> ${nama}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Jumlah Tiket:</b> ${jumlah}</p>
    <p><b>Total Bayar:</b> Rp ${total.toLocaleString()}</p>
    <p><b>Kode Tiket:</b> <span style="color:#00bcd4">${kode}</span></p>
    <img src="${qr.toDataURL()}" alt="QR Tiket" id="qrImage"/>
    <br><br>
    <button id="downloadBtn">⬇️ Download Tiket</button>
  `;

  document.getElementById("downloadBtn").addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = qr.toDataURL();
    a.download = `Tiket_${nama.replace(/\s+/g, "_")}.png`;
    a.click();
  });
});