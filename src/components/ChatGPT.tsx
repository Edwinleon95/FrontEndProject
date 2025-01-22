import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const ChatGPT = async (message: string) => {
    console.log("API_KEY", API_KEY); // Check if the key is correctly accessed

    try {
        const response = await axios.post(
            API_URL,
            {
                model: "gpt-3.5-turbo", // or "gpt-4"
                messages: [{ role: "user", content: message }],
                temperature: 0.7,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error: any) {
        // Improved error logging
        if (error.response) {
            // Response from OpenAI API with details
            console.error("API Response Error:", error.response.data);
        } else if (error.request) {
            // No response from the server
            console.error("No response received:", error.request);
        } else {
            // Something went wrong while setting up the request
            console.error("Error setting up API request:", error.message);
        }

        return "Sorry, I couldn't process your request.";
    }
};
