import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import React, { useState } from "react";
//!fucntion to call the backend api
const generateImageAPI = async (prompt) => {
  const res = await axios.post("http://localhost:9000/generate-image", {
    prompt,
  });
  return res.data;
};
const Generateimg = () => {
  const [prompt, setPrompt] = useState("");

  const mutation = useMutation({
    mutationFn: generateImageAPI,
    mutationKey: ["dalle"],
  });
  //submit handler
  const handlerGenerateImage = () => {
    if (!prompt) {
      alert("Please enter a prompt");
    }
    mutation.mutate(prompt);
  };
  console.log(mutation);

  return (
    <div>
      <input
        type="text"
        placeholder="enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button type="submit" onClick={handlerGenerateImage}>
        {mutation?.isPending ? 'Generating please wait':'Generate Image'}
      </button>
    </div>
  );
};

export default Generateimg;
