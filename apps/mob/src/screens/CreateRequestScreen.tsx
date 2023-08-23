import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../assets/colors";

import { useForm } from "react-hook-form";
import InputComponent from "../components/ui/InputComponent";
import {
  IEntryMeta,
  IRequest,
  REQUEST_STATUS,
  RequestSchema,
  useCreateRequest,
} from "core";
import Button from "../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import useCurrentUser from "../hooks/useCurrentUser";
import { createRequestDefault } from "../utils/defaults";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const CreateRequestScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Request form",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
        color: color.white,
      },
    });
  }, []);

  const defaultValues = createRequestDefault();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IRequest>({
    defaultValues: defaultValues,
    resolver: zodResolver(RequestSchema),
  });

  const { user } = useCurrentUser();

  const { mutate: createRequest, isLoading: isCreatingRequest } =
    useCreateRequest();

  const handleCreateRequest = (data: IRequest) => {
    const meta: IEntryMeta = {
      createdAt: +new Date(),
      createdBy: {
        id: user?.id,
        email: user?.email,
        name: user.fullname,
      },
    };

    const _request = {
      ...data,
      ...meta,
    };

    createRequest(_request, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Request created successfully",
        });
        navigation.goBack();
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Error creating request",
          visibilityTime: 4000,
        });
      },
    });
  };

  return (
    <ScrollView className="p-4 pb-8">
      <Text className=" font-bold text-xl">Create Request</Text>
      <Text>Fill the form below to create a request. </Text>
      <InputComponent
        label="Title"
        control={control}
        name="title"
        error={errors.title?.message}
      />
      <InputComponent
        label="Write description about your request"
        control={control}
        name="description"
        error={errors.description?.message}
        multiline={true}
        style={{ minHeight: 200, textAlignVertical: "top", overflow: "scroll" }}
      />

      <View className="flex-row justify-between items-center w-full">
        <DatePickerComponent
          label="Start Date"
          control={setValue}
          name="startDate"
          error={errors.startDate?.message}
        />
        <Text className="text-xl font-bold ">-</Text>
        <DatePickerComponent
          label="End Date"
          control={setValue}
          name="endDate"
          error={errors.endDate?.message}
        />
      </View>
      <InputComponent
        label="Budget"
        name="budget"
        control={control}
        error={errors.budget?.message}
        keyboardType="numeric"
      />

      <InputComponent
        label="City / Town"
        name="location"
        control={control}
        error={errors.location?.message}
      />
      <DatePickerComponent
        label="Deadline"
        control={setValue}
        name="deadline"
        error={errors.deadline?.message}
      />
      <Button
        className="mt-3 py-4"
        onPress={handleSubmit(handleCreateRequest)}
        disabled={!isDirty}
      >
        <Text className="text-md font-bold text-center text-white tracking-wider">
          Submit
        </Text>
      </Button>
    </ScrollView>
  );
};

export default CreateRequestScreen;

interface DatePickerComponentProps {
  label?: string;
  control?: any;
  name?: string;
  error?: string;
}

const DatePickerComponent = ({
  label,
  control,
  name,
  error,
}: DatePickerComponentProps) => {
  const [date, setDate] = useState<Date | null>();

  const onChange = (event: DateTimePickerEvent, selectedDate: any) => {
    const currentDate = selectedDate ?? date;
    setDate(currentDate);
    control(name, currentDate.toDateString());
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date ?? new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };
  return (
    <View className="flex-col basis-[46%]" key={`${name}_${label}`}>
      <Pressable
        onPress={showDatepicker}
        className={`px-4 py-4 border-[1px]  ${
          error ? "border-red" : "border-gray-300"
        } rounded-md text-grayText text-sm mt-3 `}
      >
        <Text className={`${date ? "text-gray-700" : "text-gray-400"}`}>
          {date ? date.toDateString() : label}
        </Text>
      </Pressable>
      {error ? <Text className="text-red text-xs">{error}</Text> : null}
    </View>
  );
};