export async function fakeReq(url) {
  if (url === "http://error.com") {
    throw new Error("Network error");
  }

  return Buffer.from(JSON.stringify({ name: "Kathrin", location: "Glasgow" }));
}
