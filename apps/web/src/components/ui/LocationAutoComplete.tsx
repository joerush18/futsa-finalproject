// @ts-nocheck

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";

const GOOGLE_MAPS_API_KEY = "AIzaSyBQmglGDVwaRkFzgwRtDd21k0U0lcYF6us";

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
}

interface LocationAutoCompleteProps {
  placeValue?: any;
  control: any;
  label?: string;
  name?: string;
  error?: string;
}

export default function LocationAutoComplete({
  placeValue,
  control,
  label,
  name,
  error,
}: LocationAutoCompleteProps) {
  const [value, setValue] = React.useState<PlaceType | null>(
    placeValue.value ?? null
  );

  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  const fetchPlaceDetails = React.useCallback(
    async (newValue: PlaceType | null) => {
      if (!newValue) return;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAPS_API_KEY}&place_id=${newValue?.place_id}`
      );
      const data = await response.json();
      if (data && data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        if (name) {
          control(`${[name]}.lat`, lat.toString());
          control(`${[name]}.lng`, lng.toString());
          control(`${[name]}.value`, newValue);
        } else {
          control("geoLocation.lat", lat.toString());
          control("geoLocation.lng", lng.toString());
          control("geoLocation.value", newValue);
        }
      }
    },
    [value]
  );

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetchDebounce = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        400
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchDebounce({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  React.useEffect(() => {
    if (placeValue) {
      if (name) {
        control(`${[name]}.lat`, placeValue.lat.toString());
        control(`${[name]}.lng`, placeValue.lng.toString());
        control(`${[name]}.value`, placeValue.value);
      } else {
        control("geoLocation.lat", placeValue.lat.toString());
        control("geoLocation.lng", placeValue.lng.toString());
        control("geoLocation.value", placeValue.value);
      }
    }
  }, [placeValue]);

  return (
    <Autocomplete
      key={value?.place_id ?? ""}
      fullWidth
      id="google-map-demo"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText={"No locations"}
      onChange={(_, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        fetchPlaceDetails(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label ?? "Geo Location"}
          fullWidth
          sx={{
            border: error ? "1px solid red" : "",
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part: any, index: number) => (
                  <Box
                    key={`index_${part.text}${index}}`}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
