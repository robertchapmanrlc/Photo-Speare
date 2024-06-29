"use server";

import { HfInference, TextGenerationOutput } from "@huggingface/inference";

let hf: HfInference;

export async function getPoem(formData: FormData) {
  if (!hf) hf = new HfInference(process.env.HF_TOKEN);

  const file = formData.get("image") as Blob;
  let imageDescription = "";
  let poem_text = "";

  try {
    const imgToTextRes = await hf.imageToText({
      model: "Salesforce/blip-image-captioning-large",
      data: file,
    });

    imageDescription = imgToTextRes.generated_text;

    const poem: TextGenerationOutput = await hf.textGeneration({
      inputs: imageDescription,
      model: "striki-ai/william-shakespeare-poetry",
      parameters: {
        max_new_tokens: 50,
        temperature: 1,
      },
    });

    poem_text = poem.generated_text;
  } catch (error) {
    return {
      error: "An error has occurred",
    };
  }

  const new_poem_text = poem_text.substring(imageDescription.length).trim();

  let poem_parts = new_poem_text.trim().split(",");
  poem_parts.forEach((str, i) => (poem_parts[i] = str.replace("\n", "")));

  const partsSet = new Set(poem_parts);

  let final_poem_parts = [];
  for (const item of partsSet.values()) {
    final_poem_parts.push(item);
  }

  let final_poem = [imageDescription];
  for (let index = 0; index < final_poem_parts.length - 1; index++) {
    const element = final_poem_parts[index].trim();
    final_poem.push(element);
  }

  return { poem: final_poem.join(" ") };
}
