import { Button, Dialog, Flex, Slider, TextField } from "@radix-ui/themes";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormItem from "./FormItem";
import { IVirus } from "../../../types/virus";
import { useDispatch } from "react-redux";
import { addVirus } from "../../../store/slices/virusSlice";

const VirusForm = () => {
  const dispatch = useDispatch();
  const methods = useForm<IVirus>({
    defaultValues: {
      name: "",
      probabilityOfDeath: 0.4,
      probabilityOfImmunity: 0.2,
      probabilityOfInfection: 0.3,
      probabilityOfSymptoms: 0.5,
      timeOfDiseaseDays: 10,
      timeOfIncubationDays: 7,
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const isInvalid = Object.keys(errors).length > 0;
  const probabilityOfDeath = watch("probabilityOfDeath");
  const probabilityOfImmunity = watch("probabilityOfImmunity");
  const probabilityOfInfection = watch("probabilityOfInfection");
  const probabilityOfSymptoms = watch("probabilityOfSymptoms");
  const timeOfDiseaseDays = watch("timeOfDiseaseDays");
  const timeOfIncubationDays = watch("timeOfIncubationDays");

  const onSubmit: SubmitHandler<IVirus> = (data) => {
    dispatch(
      addVirus({
        ...data,
        id: crypto.randomUUID(),
      })
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog.Title>Crate a new virus</Dialog.Title>
        <Dialog.Description mb="6">
          With this form you can create your own virus to simulate how it would
          spread across your little population.
        </Dialog.Description>
        <Flex direction="column">
          <FormItem
            formKey="name"
            errorMessage="Required"
            hasError={errors.name != undefined}
            label="Name *"
            render={(hasError) => (
              <TextField.Root
                color={hasError ? "red" : undefined}
                {...register("name", { required: true, minLength: 4 })}
              />
            )}
          />
          <FormItem
            formKey="probabilityOfDeath"
            hasError={errors.name != undefined}
            label="% Death"
            render={(hasError) => (
              <Slider
                color={hasError ? "red" : undefined}
                {...register("probabilityOfDeath", {
                  required: true,
                })}
                defaultValue={[probabilityOfDeath]}
                size="2"
                max={1}
                step={0.1}
                onValueChange={(v) => setValue("probabilityOfDeath", v[0])}
                min={0}
              />
            )}
            renderValue={(value) => {
              return `${+value * 100} %`;
            }}
          />
          <FormItem
            formKey="probabilityOfImmunity"
            hasError={errors.name != undefined}
            label="% Immunity"
            render={(hasError) => (
              <Slider
                color={hasError ? "red" : undefined}
                {...register("probabilityOfImmunity", {
                  required: true,
                })}
                defaultValue={[probabilityOfImmunity]}
                size="2"
                max={1}
                step={0.1}
                onValueChange={(v) => setValue("probabilityOfImmunity", v[0])}
                min={0}
              />
            )}
            renderValue={(value) => {
              return `${+value * 100} %`;
            }}
          />
          <FormItem
            formKey="probabilityOfInfection"
            hasError={errors.name != undefined}
            label="% Infection"
            render={(hasError) => (
              <Slider
                color={hasError ? "red" : undefined}
                {...register("probabilityOfInfection", {
                  required: true,
                })}
                defaultValue={[probabilityOfInfection]}
                size="2"
                max={1}
                step={0.1}
                onValueChange={(v) => setValue("probabilityOfInfection", v[0])}
                min={0}
              />
            )}
            renderValue={(value) => {
              return `${+value * 100} %`;
            }}
          />
          <FormItem
            formKey="probabilityOfSymptoms"
            hasError={errors.name != undefined}
            label="% Symptoms"
            render={(hasError) => (
              <Slider
                color={hasError ? "red" : undefined}
                {...register("probabilityOfSymptoms", {
                  required: true,
                })}
                defaultValue={[probabilityOfSymptoms]}
                size="2"
                max={1}
                step={0.1}
                onValueChange={(v) => setValue("probabilityOfSymptoms", v[0])}
                min={0}
              />
            )}
            renderValue={(value) => {
              return `${+value * 100} %`;
            }}
          />
          <FormItem
            formKey="timeOfDiseaseDays"
            hasError={errors.name != undefined}
            label="Disease Duration (days)"
            render={(hasError) => (
              <Slider
                color={hasError ? "red" : undefined}
                {...register("timeOfDiseaseDays", {
                  required: true,
                })}
                defaultValue={[timeOfDiseaseDays]}
                size="2"
                max={30}
                step={1}
                onValueChange={(v) => setValue("timeOfDiseaseDays", v[0])}
                min={2}
              />
            )}
            renderValue={(value) => {
              return `${+value}`;
            }}
          />
          <FormItem
            formKey="timeOfIncubationDays"
            hasError={errors.name != undefined}
            label="Incubation Period (days)"
            render={(hasError) => (
              <Slider
                color={hasError ? "red" : undefined}
                {...register("timeOfIncubationDays", {
                  required: true,
                })}
                defaultValue={[timeOfIncubationDays]}
                size="2"
                max={20}
                step={1}
                onValueChange={(v) => setValue("timeOfIncubationDays", v[0])}
                min={2}
              />
            )}
            renderValue={(value) => {
              return `${+value}`;
            }}
          />
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          {isInvalid ? (
            <Button type="submit">Save</Button>
          ) : (
            <Dialog.Close>
              <Button type="submit">Save</Button>
            </Dialog.Close>
          )}
        </Flex>
      </form>
    </FormProvider>
  );
};

export default VirusForm;
