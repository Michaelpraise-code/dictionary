async function getMeaning() {
    const word = document.getElementById("wordInput").value.trim();
    if (!word) {
        alert("Please enter a word!");
        return;
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error("Word not found!");
        const data = await response.json();

        const phonetics = data[0]?.phonetics[0]?.text || "N/A";
        const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
        const example = data[0]?.meanings[0]?.definitions[0]?.example || "No example available.";

        resultDiv.innerHTML = `
            <h2>${data[0].word}</h2>
            <p><strong>Phonetics:</strong> ${phonetics}</p>
            <p><strong>Definition:</strong> ${definition}</p>
            <p><strong>Example:</strong> ${example}</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = "Word not found. Try another word!";
        console.error("Error fetching word:", error);
    }
}
