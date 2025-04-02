// Fetch word definition from API
async function getWordDefinition() {
    const word = document.getElementById("wordInput").value.trim();
    const resultDiv = document.getElementById("result");
    const pronunciationDiv = document.getElementById("pronunciation");
    const exampleDiv = document.getElementById("example");
    const synonymsDiv = document.getElementById("synonyms");

    if (!word) {
        resultDiv.innerHTML = "Please enter a word to search.";
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error("Word not found");

        const data = await response.json();
        const wordData = data[0];
        const phonetic = wordData.phonetics[0]?.text || 'N/A';
        const audio = wordData.phonetics[0]?.audio || null;
        const definition = wordData.meanings[0]?.definitions[0]?.definition || 'No definition available.';
        const example = wordData.meanings[0]?.definitions[0]?.example || 'No example available.';
        const synonyms = wordData.meanings[0]?.synonyms || [];

        resultDiv.innerHTML = `
            <h2>${word}</h2>
            <div class="definition">${definition}</div>
        `;

        pronunciationDiv.innerHTML = `
            <strong>Pronunciation:</strong> ${phonetic}
            ${audio ? `<br><audio controls><source src="${audio}" type="audio/mp3"></audio>` : ''}
        `;

        exampleDiv.innerHTML = `
            <strong>Example:</strong> ${example}
        `;

        synonymsDiv.innerHTML = `
            <h3>Synonyms:</h3>
            <ul>
                ${synonyms.map(synonym => `<li>${synonym}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        resultDiv.innerHTML = "Error: Word not found.";
        pronunciationDiv.innerHTML = "";
        exampleDiv.innerHTML = "";
        synonymsDiv.innerHTML = "";
    }
}