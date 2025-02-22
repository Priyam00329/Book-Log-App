// ai-chatbot.js

const aiQueryInput = document.getElementById('aiQuery');
const aiChatbotButton = document.getElementById('aiChatbot');
const aiResponseDiv = document.getElementById('aiResponse');

// Function to communicate with OpenAI API
async function askAI(query) {
    const apiKey = 'YOUR_OPENAI_API_KEY';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: query,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

// Event Listener
aiChatbotButton.addEventListener('click', async () => {
    const query = aiQueryInput.value.trim();
    if (query) {
        aiResponseDiv.textContent = 'Thinking...';
        try {
            const answer = await askAI(query);
            aiResponseDiv.textContent = answer;
        } catch (error) {
            aiResponseDiv.textContent = 'Error fetching response from AI.';
            console.error('Error:', error);
        }
    } else {
        alert('Please enter a question.');
    }
});
