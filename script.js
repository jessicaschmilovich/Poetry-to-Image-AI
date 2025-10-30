async function generateImage() {
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const generateBtn = document.getElementById('generate-btn');
    
    const additionalPhrases = [
        document.getElementById('phrase1').value,
        document.getElementById('phrase2').value,
        document.getElementById('phrase3').value
    ];
    
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    generateBtn.disabled = true;
    
    try {
        const response = await fetch('/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ additionalPhrases })
        });
        
        const data = await response.json();
        
        if (data.imageUrl) {
            document.getElementById('generated-image').src = data.imageUrl;
            document.getElementById('phrase-count').textContent = 
                'Total phrases feeding the sublime: ' + data.phraseCount;
            
            loading.classList.add('hidden');
            result.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate image. Please try again.');
    } finally {
        generateBtn.disabled = false;
        loading.classList.add('hidden');
    }
}