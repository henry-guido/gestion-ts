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

export async function getPicture(accessToken: string): Promise<string | any> {
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

    return await blobToBase64(response)

  } catch (error) {
    console.error("Error in getPicture function:", error);
  }
}


async function blobToBase64(response: Response): Promise<string> {
  try {
    const photoBlob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(photoBlob);

      reader.onloadend = function () {
        const base64data = reader.result as string;
        resolve(base64data);
      };

      reader.onerror = function (error) {
        reject(error);
      };
    });
  } catch (error) {
    console.error('Error al obtener base64:', error);
    throw error;
  }
}