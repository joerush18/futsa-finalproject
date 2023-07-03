import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import "./index.css";

const TagBox = () => {
  const [selected, setSelected] = useState(["Free Wifi"]);

  return (
    <TagsInput
      value={selected}
      onChange={setSelected}
      name="Amenities"
      placeHolder="Enter Amenities"
    />
  );
};

export default TagBox;
