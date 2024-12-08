document.addEventListener('DOMContentLoaded', () => {
    const voiceBtn = document.getElementById('voice-btn');
    const chatLog = document.getElementById('chat-log');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;

    voiceBtn.addEventListener('click', () => {
        recognition.start();
    });

    recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        if (transcript) {
            appendMessage('user', transcript);
            fetchBotResponse(transcript);
        }
    });

    recognition.addEventListener('end', () => {
        console.log('Recognition ended');
    });

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.innerText = text;
        chatLog.appendChild(messageDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function fetchBotResponse(message) {
        fetch('http://localhost:5000/ask_sweety', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('bot', data.response);
        })
        .catch(error => {
            console.error('Error:', error);
            appendMessage('bot', 'There was an error processing your request.');
        });
    }
});
