const messageInput = document.getElementById("message-input");
const chatWindow = document.getElementById("chat-window");
const emojiElement = document.getElementById("emoji");

messageInput.addEventListener("input", function () {
  const previewElement = document.getElementById("preview");
  previewElement.textContent = messageInput.value ? messageInput.value : "";
});

document.getElementById("camera-icon").addEventListener("click", function () {
  alert("Fungsi kamera tidak tersedia saat ini."); // Ganti dengan fungsionalitas yang diinginkan
});

let isRecording = false;
let mediaRecorder;
let audioChunks = [];

document
  .getElementById("mic-icon")
  .addEventListener("click", async function () {
    if (!isRecording) {
      // Memulai merekam suara
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();
      isRecording = true;

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioChunks = []; // Reset audio chunks
        alert("Rekaman selesai!"); // Ganti dengan fungsionalitas yang diinginkan, seperti memutar audio
        // Misalnya, bisa disimpan atau diputar
      };

      alert("Mulai merekam...");
    } else {
      // Menghentikan perekaman
      mediaRecorder.stop();
      isRecording = false;
      alert("Merekam dihentikan.");
    }
  });
// untuk function enter
document
  .getElementById("message-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah perilaku default (mis. membuat baris baru)
      document.getElementById("send-btn").click(); // Memicu klik tombol kirim
    }
  });
emojiElement.addEventListener("click", function () {
  emojiElement.addEventListener("click", function () {
    // Daftar emoji
    const emojis = ["😊", "😂", "😍", "😢", "😎", "🤔"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    // Menampilkan emoji yang baru dipilih
    emojiElement.textContent = randomEmoji;

    // Menambahkan emoji lain ke dalam chat
    const additionalEmoji = emojis.filter((emoji) => emoji !== randomEmoji);
    const randomAdditionalEmoji =
      additionalEmoji[Math.floor(Math.random() * additionalEmoji.length)];

    const emojiDisplay = document.createElement("span");
    emojiDisplay.textContent = randomAdditionalEmoji;
    emojiDisplay.style.marginLeft = "5px"; // Memberi jarak
    emojiDisplay.style.fontSize = "24px"; // Ukuran font emoji
  });
});

document.getElementById("send-btn").addEventListener("click", function () {
  const messageText = messageInput.value;

  if (messageText) {
    // Menambahkan pesan pengguna
    const userMessageElement = document.createElement("div");
    userMessageElement.classList.add("message", "user");

    const userTextElement = document.createElement("span");
    userTextElement.classList.add("text");
    userTextElement.textContent = messageText;

    userMessageElement.appendChild(userTextElement);

    // Menambahkan ikon centang abu-abu
    const checkMark = document.createElement("span");
    checkMark.textContent = " ✔️"; // Menggunakan emoji ceklis
    checkMark.style.color = "gray"; // Mengubah warna ikon menjadi abu-abu
    userTextElement.appendChild(checkMark);

    chatWindow.appendChild(userMessageElement);

    // Mengirim balasan otomatis
    setTimeout(() => {
      const botMessageElement = document.createElement("div");
      botMessageElement.classList.add("message", "bot");

      const botTextElement = document.createElement("span");
      botTextElement.classList.add("text");

      // Logika balasan sesuai dengan pesan
      const response = getResponse(messageText);
      botTextElement.textContent = response;

      botMessageElement.appendChild(botTextElement);
      chatWindow.appendChild(botMessageElement);
      chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom

      // Update ikon centang menjadi ganda
      checkMark.textContent = " ✔✔"; // Ganti menjadi dua centang
    }, 1000); // Balasan muncul setelah 1 detik

    messageInput.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
    document.getElementById("preview").textContent = ""; // Clear preview
  }
});

// Fungsi untuk mendapatkan balasan sesuai dengan pertanyaan
function getResponse(question) {
  question = question.toLowerCase();

  if (question.includes("hai")) {
    return "Hai! Apa kabar?";
  } else if (question.includes("apa tugasmu")) {
    return "Saya adalah bot yang siap membantu!";
  } else if (question.includes("siapa kamu")) {
    return "Nama saya Jarvis!";
  } else if (question.includes("siapa penciptamu")) {
    return "yang membuatku adalah tony stark!";
  } else if (question.includes("hari")) {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return `Hari ini adalah ${today.toLocaleDateString(undefined, options)}.`;
  } else {
    return "Maaf, saya tidak mengerti.";
  }
}
