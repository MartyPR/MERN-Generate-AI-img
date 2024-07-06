import { useQuery } from "@tanstack/react-query";
import React from "react";

const GalleryImagesAPI = async () => {
  const res = await axios.post("http://localhost:9000/images", {});
  return res.data;
};

const Images = () => {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryFn: GalleryImagesAPI,
    queryKey: ["images"],
  });

  //loading 
  if(isPending) return <h2>Loading please wait ...</h2>
  if(isError) return <h2>Something is wrong</h2>
  
  return (
    <div>
      {data?.map((img) => {
        return <img src={img.url} />;
      })}
    </div>
  );
};

export default Images;
