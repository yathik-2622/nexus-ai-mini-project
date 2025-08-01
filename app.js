const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning BOSS...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing NEXUS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello') || message.includes('hi')) {
        speak("Hello Sir, How May I Help You?");
        } else if (message.includes('what is your name')) {
            speak("My Name Is NEXUS, I Am Your Virtual Assistant");
    } else if ((message.includes("can you open google")) || message.includes('google') || message.includes('open google')) {
        window.open("https://google.com", "_blank");
        speak("Sure sir, Opening Google...");
    } else if ((message.includes("open youtube")) || message.includes('youtube') || message.includes('can you open Youtube')) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if ((message.includes("\nopen facebook")) || message.includes('facebook') || message.includes('can you open facebook')) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if ((message.includes("can you open gpt")) || message.includes('open chatgpt') || message.includes('open gpt')) {
        window.open("https://openai.com/chatgpt/overview/", "_blank");
        speak("Opening chat GPT...");
    } else if (message.includes("open gpt home page")) {
        window.open("https://chatgpt.com/", "_blank");
        speak("Opening GPT home page...");
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    }  else if (message.includes("thank you")) {
        speak("Its My Pleasure to assist you sir..");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
