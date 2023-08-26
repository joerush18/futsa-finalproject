import Color from "@/utils/color";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  BidSchema,
  IBids,
  createUniqueId,
  useBidsStore,
  useCreateBid,
  useUpdateBids,
} from "core";
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
import { toast } from "react-hot-toast";

export const BiddingForm = ({
  onCompleteCreate,
  requestId,
  myDefaultBid,
}: {
  onCompleteCreate: React.Dispatch<React.SetStateAction<"form" | "bids">>;
  requestId: string;
  myDefaultBid?: IBids;
}) => {
  const defaultValues = createBidDefaultValue(myDefaultBid);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IBids>({
    defaultValues: myDefaultBid ? myDefaultBid : defaultValues,
    resolver: zodResolver(BidSchema),
  });

  const { futsal } = useCurrentUser();

  const { mutate: createBids, isLoading: isCreatingBid } = useCreateBid();
  const { mutate: updateBids, isLoading: isUpdatingBid } = useUpdateBids();
  const { updateBids: updateBidsLocal } = useBidsStore();
  const { setBids, bids } = useBidsStore();

  const handleCreateBid = (values: IBids) => {
    const meta = createIMetaDefaultValue(futsal);
    const id = createUniqueId();
    const _bid: IBids = { ...values, ...meta, id, requestId: requestId };
    setBids([...bids, _bid]);
    createBids(_bid, {
      onSuccess: () => {
        toast.success("Bid created successfully");
        onCompleteCreate("bids");
      },
      onError: () => {
        toast.error("Error creating bid");
      },
    });
  };

  const handleUpdateBid = (values: IBids) => {
    console.log({ myDefaultBid });
    const updatedBid: Partial<IBids> & Pick<IBids, "id"> = {
      ...values,
      id: myDefaultBid?.id ?? "",
      updatedAt: +new Date(),
      updatedBy: {
        id: futsal?.id ?? "",
        name: futsal.futsalName ?? "",
        email: futsal.email ?? "",
      },
    };
    console.log(updatedBid);
    updateBids(
      { ...updatedBid },
      {
        onSuccess: () => {
          toast.success("Bid updated successfully");
          onCompleteCreate("bids");
          updateBidsLocal({ ...updatedBid });
        },
        onError: () => {
          toast.error("Error updating bid");
        },
      }
    );
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
        <form
          onSubmit={handleSubmit(
            myDefaultBid ? handleUpdateBid : handleCreateBid
          )}
        >
          <FormInputText
            name={"budget"}
            control={control}
            label={"Budget"}
            type="number"
          />

          <LocationAutoComplete
            control={setValue}
            placeValue={myDefaultBid?.venue ?? ""}
            name="venue"
            error={errors.venue?.lat?.message}
          />
          <SelectAmenities
            control={setValue}
            name="freebies"
            label="Freebies"
            value={myDefaultBid?.freebies ?? []}
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
            disabled={isCreatingBid}
            sx={{
              mt: 2,
            }}
          >
            {isCreatingBid
              ? "Creating..."
              : isUpdatingBid
              ? "Updating"
              : myDefaultBid
              ? "Update"
              : "Create"}
          </Button>
        </form>
      </Stack>
    </Box>
  );
};
