import generateToken04 from "./zegoServerAssistant.js";

export const generateZegoToken = async (req, res, next) => {
  try {
    const appID = Number(process.env.ZEGO_APP_ID); // Ensure this is parsed as a number
    const serverSecret = process.env.ZEGO_SERVER_SECRET;
    console.log('generateZegoToken controller called');
    console.log(req.body)
    const { userID } = req.body; // Extract userID directly from req.body

    if (!userID) {
      return res.status(400).json({ error: 'userID is required' });
    }

  
    console.log('Generating token with:', { appID, userID, serverSecret });

    // Pass userID as a string to generateToken04 function
    const zegoToken = generateToken04(appID, userID, serverSecret, 3600, "");
    console.log('Token generated:', zegoToken);
    
    res.status(200).json({
      status: "success",
      message: "Token generated successfully",
      zegoToken,
    });
  } catch (err) {
    console.error('Error in generateZegoToken controller:', err); // Log the entire error object
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};
