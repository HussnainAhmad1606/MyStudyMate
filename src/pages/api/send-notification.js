import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
 
  admin.initializeApp({
    credential: admin.credential.cert("service_key.json"),
  });
}

const notificationHandler = async (request, response) => {
  const { token, title, message, link } = request.body;

  const payload = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);
    return response.status(200).json({ type:"success", message: "Notification sent!" });
  } catch (error) {
    console.log(error)
    return response.status(500).json({ type:"error", message: `Error: ${error}` });
  }
}

export default notificationHandler;
