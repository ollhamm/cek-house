"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ModalContain from "./ModalContain";
import useRentModal from "@/app/hooks/useRentModal";
import { Heading } from "../Heading";
import { categories } from "../navbar/Categories";
import InputCategory from "../inputs/InputCategory";
import CountrySelect from "../inputs/CountrySelect";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Counter } from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("api/listings", data)
      .then(() => {
        toast.success("Created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleNext = () => {
    if (step === STEPS.CATEGORY && !category) {
      toast.error("Please select a category");
      return;
    }

    onNext();
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = step === STEPS.CATEGORY ? undefined : "Back";

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Yang mana yang paling menggambarkan tempat Anda?"
        subtitle="Pilih Kategori!"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[40vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1 rounded-md">
            <InputCategory
              onClick={(category) => setCustomValue("category", category)}
              select={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Select country location "
          subtitle="Help guests find your location!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Basic information about the place of residence"
          subtitle="Existing facilities"
        />
        <Counter
          title="Number Of Guest"
          subtitle="How Many Guest do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Number Of Rooms"
          subtitle="How Many Guest do you allow?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Number Of BathRooms"
          subtitle="How Many Guest do you allow?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add Image"
          subtitle="Show guest what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe Your Place"
          subtitle="Short sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Set Your Price" subtitle="How much is the price" />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <ModalContain
      isOpen={rentModal.isOpen}
      title="Your Home"
      onClose={rentModal.onClose}
      onSubmit={step === STEPS.PRICE ? handleSubmit(onSubmit) : handleNext}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={secondaryActionLabel ? onBack : undefined}
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
};

export default RentModal;
