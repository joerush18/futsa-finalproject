import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Free Wifi",
  "Parking",
  "Locker",
  "Shower",
  "Cafe",
  "Changing Room",
  "First Aid",
  "Toilet",
  "CCTV",
  "Light",
  "Drinking Water",
  "Ball",
  "Shoes",
  "Jersey",
  "Tournament",
  "Training",
];

export default function SelectAmenities({
  control,
  name,
  value,
}: {
  control: any;
  name: string;
  value: string[];
}) {
  const [amenities, setAmenities] = React.useState<string[]>(
    value ?? ["Free Wifi"]
  );
  const handleChange = (event: SelectChangeEvent<typeof amenities>) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === "string" ? value.split(",") : value;
    setAmenities(typeof value === "string" ? value.split(",") : value);
    control(name, values);
  };

  return (
    <div>
      <FormControl
        fullWidth
        sx={{
          my: 2,
        }}
      >
        <InputLabel id="demo-multiple-chip-label">Amenities</InputLabel>
        <Select
          label="Select Amenities"
          multiple
          value={amenities}
          onChange={handleChange}
          input={<OutlinedInput label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
