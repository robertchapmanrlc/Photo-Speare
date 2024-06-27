"use server";

import { HfInference, TextGenerationOutput } from "@huggingface/inference";

let hf: HfInference;

export async function getPoem(formData: FormData) {
  if (!hf) hf = new HfInference(process.env.HF_TOKEN);

  const file = formData.get("image") as Blob;

  const imageDescription = await hf.imageToText({
    model: "Salesforce/blip-image-captioning-large",
    data: file,
  });

  const poem: TextGenerationOutput = await hf.textGeneration({
    inputs: imageDescription.generated_text,
    model: "striki-ai/william-shakespeare-poetry",
    parameters: {
      max_new_tokens: 30,
      temperature: 1
    },
  });

  return poem.generated_text;
}
