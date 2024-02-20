import { graphConfig } from "./authConfig"

export async function callMsGraph(accessToken: string): Promise<any> {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  const options = {
    method: "GET",
    headers
  };

  try {
    const response = await fetch(graphConfig.graphMeEndpoint, options)
    if (!response.ok) {
      throw new Error(`Failed to fetch profile. Status: ${response.status}`);
    }
    return await response.json()
  }
  catch (error) {
    console.error("Error in callMsGraph function:", error);
  }
}

export async function getPicture(accessToken: string): Promise<string | undefined> {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  const options = {
    method: "GET",
    headers
  };
  try {
    const response = await fetch(graphConfig.graphMePhoto, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch profile picture. Status: ${response.status}`);
    }

    const photoBlob = await response.blob();
    return URL.createObjectURL(photoBlob);

  } catch (error) {
    console.error("Error in getPicture function:", error);
  }
}