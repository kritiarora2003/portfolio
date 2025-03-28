async function sendMessage() {
    const userInputField = document.getElementById("user-input");
    const userInput = userInputField.value.trim();
    const chatBox = document.getElementById("chat-box");

    if (!userInput) return;

    // Add user message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    try {
        // Send request to backend
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        const botResponse = data.response || "Oops, something went wrong.";

        // Add bot response
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
    } catch (error) {
        chatBox.innerHTML += `<p><strong>Bot:</strong> Error connecting to the server.</p>`;
        console.error("Error:", error);
    }

    // Clear input field
    userInputField.value = "";

    // Scroll chat to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Add event listener for "Enter" key
document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") sendMessage();
});
