// this is the splash screen

function runSplash() {
  const splash = document.getElementById("splashScreen");

  setTimeout(() => {
    splash.classList.add("fade-out");

    setTimeout(() => {
      splash.style.display = "none";
    }, 1400);

  }, 2600);
}

window.onload = () => {
  const splash = document.getElementById("splashScreen");

  setTimeout(() => {
    splash.classList.add("fade-out");
    setTimeout(() => {
      splash.style.display = "none";
    }, 1400);
  }, 2600);
};


// these are scripture and prayer phrases:

const scriptures= [
    "“Be still, and know that I am God! I will be honored by every nation. I will be honored throughout the world.” - Psalm 46:10 (NLT)",
    "“The Lord is close to the brokenhearted; he rescues those whose spirits are crushed.” - Psalm 34:18 (NLT)",
    "“You will keep perfect peace all who trust in you, all whose thoughts are fixed on you!”- Isaiah 26:3 (NLT)",
    "“The Lord is my shepard; I have all that I need.”- Psalm 23:1 (NLT)",
    "“Give all of your worries and cares to God, for he cares about you.” - 1 Peter 5:7 (NLT)" 
];

const breathPrayers = [
    "Inhale: Lord, help me to draw closer near you. Exhale: I release all fear.",
    "Inhale: You are with me. Exhale: For I am not alone.",
    "Inhale: Holy Spirit, fill me with peace. Exhale: Calm my spirit.",
    "Inhale: Lord, You are my refuge. Exhale: You are my strenth. I will not be afraid, for you are close beside me."
];

let mode = "scripture";
let index = 0;
let cycle;

// this function represents the scripture and prayer rotations
function startCycle() {
    cycle = setInterval(() => {
        const el = document.getElementById("text");
        el.style.opacity = 0;

        setTimeout(() => {
            index = (index + 1) % (mode == "scripture" ? scriptures.length : breathPrayers.length);
            el.textContent = mode == "scripture" ? scriptures[index] : breathPrayers[index];
            el.style.opacity = 1;
        }, 1000);
    }, 8000);
}

function stopCycle() {
    clearInterval(cycle);
}

// this function allows the user to utilize voice recognition with the help of the user's voice

let recognition;

function startListening() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition not supported in this browser.");
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase()
        handleVoiceCommand(transcript);
    };
    recognition.start();
    document.getElementById("status").textContent = "Listening for prayer commands...";   
}

// voice command functions and calls

function handleVoiceCommand(cmd) {
    const circle = document.getElementById("circle");

    if (cmd.includes("start prayer")) {
        startCycle();
    }

    if (cmd.includes("stop")) {
    stopCycle();
  }

  if (cmd.includes("scripture")) {
    mode = "scripture";
    index = -1;
    startCycle();
  }

  if (cmd.includes("breath prayer mode")) {
    mode = "breath";
    index = -1;
    startCycle();
  }

  if (cmd.includes("new scripture")) {
    index = -1;
    startCycle();
  }

  if (cmd.includes("slow down")) {
    circle.style.animation = "breathe 12s ease-in-out infinite";
  }

  if (cmd.includes("peace mode")) {
    circle.style.animation = "breathe 10s ease-in-out infinite";
    document.getElementById("text").textContent = "“I am leaving you with a gift— peace of mind and heart. And the peace I give is a gift the world cannot give. So don't be troubled or afraid.” - John 14:27 (NLT)";
  }
}