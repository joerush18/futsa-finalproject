import { useRef, useState } from "react";
import { Box, CircularProgress, Input, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  getUploadPath,
  StoragePath,
  uploadImage,
} from "core/src/db/storage/Storage";
import { createUniqueId } from "core";
import Color from "@/utils/color";

const ImageUpload = ({
  label,
  control,
  name,
  defaultImage,
  height,
  width,
  error,
}: {
  label: string;
  control: any;
  name: string;
  defaultImage?: string;
  height?: string;
  width?: string;
  error?: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isBusy, setBusy] = useState(false);
  const [imageURL, setImageUrl] = useState<string | null>(defaultImage ?? "");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    const imageCount = Number(event.target.files?.length);
    if (imageCount > 5) {
      return null;
    }
    setBusy(true);

    try {
      const promises = Array.from(event.target.files).map((file) => {
        const imageSizeInMb = file.size / 1024 / 1024;
        if (imageSizeInMb >= 5) {
          throw new Error("Image size is more than 5mb");
        }
        const formData = new FormData();
        const id = createUniqueId();
        formData.append("file", file, `${id}-${file.name}`);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise<string>((resolve, reject) => {
          reader.onload = (event) => {
            const imageBase64 = event?.target?.result as string;
            uploadImage(imageBase64, getUploadPath(StoragePath.Futsal, id))
              .then(resolve)
              .catch(reject);
          };

          reader.onerror = reject;
        });
      });

      const results = await Promise.allSettled(promises);
      const urls = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          urls.push(result.value);
        }
      }
      setImageUrl(urls[0]);
      control(name, urls[0]);
    } catch (error: unknown) {
    } finally {
      setBusy(false);
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const imageHeight = `calc(${height} -  10px)`;
  const imageWidth = `calc(${width} -  10px)`;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          "&: hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{
            borderRadius: 1,
            border: `1px dashed ${error ? "red" : "gray"}`,
            padding: "10px 10px",
            height: height ?? "100px",
            width: width ?? "100px",
            display: "grid",
            placeItems: "center",
            objectFit: "contain",
            position: "relative",
          }}
          onClick={handleAddImageClick}
        >
          {isBusy ? <CircularProgress size={18} /> : label}
          {imageURL ? (
            <img
              src={imageURL ?? defaultImage}
              alt="futsal"
              style={{
                objectFit: "cover",
                position: "absolute",
                top: "3px",
                borderRadius: "4px",
                height: height ? imageHeight : "90px",
                width: width ? imageWidth : "90px",
              }}
            />
          ) : null}
          {imageURL ? (
            <CancelIcon
              onClick={(e) => {
                e.stopPropagation();
                setImageUrl(null);
              }}
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                color: Color.primary.main,
              }}
            />
          ) : null}
        </Box>
      </Box>
      <Input
        type="file"
        inputProps={{
          accept: "image/*",
          multiple: true,
          ref: fileInputRef,
          style: { display: "none" },
        }}
        onChange={async (e: any) => {
          await handleChange(e);
        }}
      />
      {error ? (
        <Typography color={Color.error.main} fontSize="12px" mt={"-16px"}>
          {error}
        </Typography>
      ) : null}
    </>
  );
};

export default ImageUpload;
