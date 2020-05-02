// init speechSynthesis api 
var synth = window.speechSynthesis;

// get dom elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');


const populateVoiceList = () => {

    voices = synth.getVoices();

    // loop through voices and create options 
    voices.forEach(voice => {
        var option = document.createElement('option');
        option.textContent = `${voice.name} ${voice.lang}`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}
const speak = () => {

    // check if speaking
    if (synth.speaking) {
        console.error('this already speaking');
        return;
    }
    if (textInput.value !== "") {
        // add backgroud animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        // get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e => {
            console.log('this is end');
            body.style.background = '#141414';
        }
        speakText.onerror = e => {
            console.error('something is wrong');
        }
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
            'data-name'
        );

        voices.forEach(voice => {
            if (voice.name == selectedVoice) {
                speakText.voice = voice;
            }
        });
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        synth.speak(speakText);
    }
}

// add event listner

textForm.addEventListener('submit', e => {
    e.preventDefault;
    speak();
    textInput.blur();
});

rate.addEventListener('change', () => rateValue.innerHTML = rate.value);
pitch.addEventListener('change', () => pitchValue.innerHTML = pitch.value);
voiceSelect.addEventListener('change', e => speak());