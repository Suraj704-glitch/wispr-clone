
const DEEPGRAM_API_KEY =import.meta.env.VITE_DEEPGRAM_API_KEY;


export const startStream = async (onTranscript, onError) => {
  let mediaRecorder;
  let socket;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Deepgram WebSocket URL
    socket = new WebSocket("wss://api.deepgram.com/v1/listen?punctuate=true&smart_format=true&model=nova-2", [
      "token",
      DEEPGRAM_API_KEY,
    ]);

    socket.onopen = () => {
      mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorder.addEventListener("dataavailable", async (event) => {
        if (event.data.size > 0 && socket.readyState === 1) {
          socket.send(event.data);
        }
      });
      mediaRecorder.start(250);
    };

    socket.onmessage = (message) => {
      const received = JSON.parse(message.data);
      const transcript = received.channel?.alternatives[0]?.transcript;
      if (transcript && onTranscript) {
        onTranscript(transcript);
      }
    };

    socket.onerror = (error) => {
      if (onError) onError("Deepgram Socket Error");
      console.error("Deepgram Error:", error);
    };

    socket.onclose = () => {
      console.log("Deepgram connection closed");
    };

  } catch (error) {
    if (onError) onError("Microphone Access Denied");
    console.error(error);
  }

  // Cleanup Function
  return () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    if (socket && socket.readyState === 1) {
      socket.close();
    }
  };
};