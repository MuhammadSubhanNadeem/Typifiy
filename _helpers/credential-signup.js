export async function credentialSignupApiCall(body) {
  let rawResponse = await fetch(
    `${process.env?.NEXT_FRONTEND_URL}/api/auth/credential-signup`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let response = await rawResponse.json();
  return response;
}
