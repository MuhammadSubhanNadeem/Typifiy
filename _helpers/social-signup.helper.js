export async function socialSignupApiCall(body) {
  let rawResponse = await fetch(
    `${process.env?.NEXT_FRONTEND_URL}/api/auth/social-signup`,
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
