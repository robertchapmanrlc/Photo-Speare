"use server";

import { HfInference, ImageToTextOutput } from "@huggingface/inference";

let hf: HfInference;

export async function summarize(formData: FormData) {

  const file = formData.get('image') as Blob;
  const inferenceResponse: ImageToTextOutput = await runHfInference(file);
  console.log(inferenceResponse.generated_text);
  
}

async function runHfInference(input: Blob) {
  if (!hf) hf = new HfInference(process.env.HF_TOKEN);

  const modelName = "Salesforce/blip-image-captioning-large";
  const inferenceResult = await hf.imageToText({
    model: modelName,
    data: input
  });

  return inferenceResult;
}
