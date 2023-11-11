import React, { useState } from 'react';

function TextToSpeech() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const handleSpeech = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);

        synth.speak(utterance);


        //const audio = new Audio();

        // audio.src = URL.createObjectURL(new Blob([new Uint8Array(utterance)]));
        setAudioUrl(URL.createObjectURL(new Blob([utterance])));

        const res = new Blob([audioUrl], { type: 'audio/mpeg4' });

        console.log('buffer', new ArrayBuffer(res));
        const data = URL.createObjectURL(res);
        const audio = new Audio(data);

        audio.play();

    };

    const handleChange = event => {
        setText(event.target.value);
    };


    if (audioUrl !== '') {
        console.log(audioUrl);
    }

    return (
        <div>
            <textarea className='bg-red-600' value={text} onChange={handleChange} />
            <button onClick={handleSpeech}>Convert to Speech and Download</button>

            {
                audioUrl &&
                <audio controls>
                    <source src={audioUrl} type="audio/ogg" />
                    <source src={audioUrl} type="audio/mpeg" />

                </audio>
            }
        </div>
    );
}

export default TextToSpeech;