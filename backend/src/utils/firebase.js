import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
    readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, "utf8")
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const notifyStores = async (tokens, title, body) => {
    const validTokens = tokens.filter(Boolean);
    if (validTokens.length === 0) return;

    await admin.messaging().sendEachForMulticast({
        tokens: validTokens,
        notification: { title, body }
    });
};
