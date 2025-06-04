const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Submit handler
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a valid URL");
    return;
  }

  showSpinner();

  // Simulate loading
  setTimeout(() => {
    hideSpinner();
    generateQRCode(url, size);

    // Small delay for canvas render
    setTimeout(() => {
      const canvas = qr.querySelector("canvas");
      if (canvas) {
        const saveUrl = canvas.toDataURL();
        createSaveBtn(saveUrl);
      }
    }, 100);
  }, 800);
};

// Generate QR
const generateQRCode = (url, size) => {
  new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Clear previous
const clearUI = () => {
  qr.innerHTML = "";
  const link = document.getElementById("save-link");
  if (link) link.remove();
};

// Spinner controls
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

// Save button styled like a button element
const createSaveBtn = (url) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.href = url;
  link.download = "qrcode.png";
  link.role = "button";
  link.className = `
    mt-6 inline-flex items-center justify-center
    bg-[#e0c3fc] hover:bg-[#c2e9fb] text-[#333]
    font-semibold px-6 py-2 rounded-lg shadow-md
    transition duration-200 ease-in-out focus:outline-none
  `;
  link.textContent = "Save Image";

  document.getElementById("generated").appendChild(link);
};


form.addEventListener("submit", onGenerateSubmit);
hideSpinner();
