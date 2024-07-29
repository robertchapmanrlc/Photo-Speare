# Photo-Speare
A web application that creates poems derived from images.

## Web Application Structure
![Web Application Structure](https://i.ibb.co/cc7BKvG/Photo-Speare-Structure.png)

When a user uploads an image, the image data is sent to a hugging face [machine learning model](https://huggingface.co/Salesforce/blip-image-captioning-base) to get a description of the image. The description is then used to generate a poem via [another model](https://huggingface.co/striki-ai/william-shakespeare-poetry). The poem is then returned to the user.

## Built With
* Next.js
* TypeScript
* HuggingFace (MLM)