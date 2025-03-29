"use client";

import { FormEvent, useState, } from "react";

const sendData = async (data: string) => {
  const response = await fetch("https://bg-remover-blond.vercel.app/api/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ base64img: data }),
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return response;
};

export default function Home() {
  const [isError, setIsError] = useState(false);
  const [processedImg, setProcessedImg] = useState<string | null>(null);

  const handleBgRemove = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // const fileInput = evt.target.imgInput;
    const fileInput = evt.currentTarget.elements.namedItem("imgInput") as HTMLInputElement | null;

    if (!fileInput?.files?.length) return;

    const reader = new FileReader();
    reader.onload = async function (e) {
      const imgData = e.target?.result as string;
      const response = await sendData(imgData);
      console.log(response)

      if (response.message === "Success!") {
        const baseImg = `data:image/png;base64,${response.result.base64img}`;
        setProcessedImg(baseImg);
        setIsError(false);
      }
      else {
        setIsError(true);
      }

      fileInput.value = "";
    };

    reader.readAsDataURL(fileInput.files[0]);
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="mb-10 text-5xl font-semibold underline">Bg Remover</h1>
      <form onSubmit={handleBgRemove}>
        <label htmlFor="imgInput" className="text-4xl font-medium mr-4">
          Upload Image
        </label>
        <input
          type="file"
          id="imgInput"
          name="imgInput"
          accept=".jpg, .jpeg, .png, .webp"
          className="bg-white text-2xl border rounded-lg p-2"
        />
        <button
          type="submit"
          className="text-white bg-black px-4 py-2 shadow-md rounded-full ml-5 text-xl font-medium hover:cursor-pointer"
        >
          Bg Remove
        </button>
      </form>
      {isError && <p className="text-red-500 text-xl mt-5 font-semibold">Internal Server Error!!!</p>}
      {processedImg && (
        <div className="mt-10">
          <h2 className="text-3xl font-semibold mb-4">Processed Image:</h2>
          <img src={processedImg} alt="Processed" className="border rounded-lg shadow-lg max-w-full h-auto bg-transparent block" />
        </div>
      )}
    </main>
  );
};