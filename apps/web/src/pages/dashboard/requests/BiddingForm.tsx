import Color from "@/utils/color";
import { Box, Button, Stack, Typography } from "@mui/material";
import { BidSchema, IBids } from "core";
import LocationAutoComplete from "@/components/ui/LocationAutoComplete";
import SelectAmenities from "@/components/ui/tagsBox";
import { useForm } from "react-hook-form";
import { FormInputText } from "@/components/ui/InputBox";
import {
  createBidDefaultValue,
  createIMetaDefaultValue,
} from "@/utils/createDefaults";
import { zodResolver } from "@hookform/resolvers/zod";
import useCurrentUser from "@/hooks/useCurrentUser";

export const BiddingForm = () => {
  const defaultValues = createBidDefaultValue();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty, errors },
  } = useForm<IBids>({
    defaultValues: defaultValues,
    resolver: zodResolver(BidSchema),
  });

  const { futsal } = useCurrentUser();

  const handleCreateBid = (values: IBids) => {
    const meta = createIMetaDefaultValue(futsal);
    console.log({
      ...values,
      ...meta,
    });
  };

  return (
    <Box
      sx={{
        border: `1px solid ${Color.grey[300]}`,
        m: 2,
        pt: 2,
        borderRadius: 1,
        position: "relative",
      }}
    >
      <Typography variant="h6" px={2}>
        Bidding Form
      </Typography>
      <Typography variant="caption" mx={2}>
        You can bid for this request. Please fill the form below.
      </Typography>
      <Stack
        sx={{
          borderTop: `1px solid ${Color.grey[300]}`,
          p: 2,
          mt: 2,
        }}
      >
        <form onSubmit={handleSubmit(handleCreateBid)}>
          <FormInputText
            name={"budget"}
            control={control}
            label={"Budget"}
            type="number"
          />

          <LocationAutoComplete
            control={setValue}
            placeValue={""}
            name="venue"
            error={errors.venue?.lat?.message}
          />
          <SelectAmenities
            control={setValue}
            name="freebies"
            label="Freebies"
            value={[]}
            error={errors.freebies && errors?.freebies?.message}
          />
          <FormInputText
            name={"message"}
            control={control}
            placeholder="Write your message here..."
            label={"Write your message here..."}
            type="textArea"
            props={{
              multiline: true,
              rows: 4,
            }}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={!isDirty}
            sx={{
              mt: 2,
            }}
          >
            {/* {isLoading ? "Updating..." : "Update"} */}
            Create
          </Button>
        </form>
      </Stack>
    </Box>
  );
};
