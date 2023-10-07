import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, H3, Input, Sheet, TextArea, YStack } from "tamagui";
import * as z from "zod";

import { useSupabase } from "../lib/context/useSupabase";

const FormSchema = z.object({
  container: z.string().min(1, "El contenedor no puede estar vacío."),
  reference: z.string().min(1, "La referencia no puede estar vacía."),
  quantity: z.string().min(1, "La cantidad no puede estar vacía."),
  observations: z.string().optional()
});

const snapPoints = [75];

export default function NewInventoryItemSheet({
  data,
  open,
  setOpen
}: {
  data: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { supabase } = useSupabase();

  const [position, setPosition] = useState(0);

  const {
    setValue,
    control,
    handleSubmit,
    trigger,
    formState: { isSubmitting }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      container: data,
      reference: "",
      quantity: "",
      observations: ""
    }
  });

  useEffect(() => {
    if (data) {
      setValue("container", data);
    }
  }, [data]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await supabase.from("InventoryItems").insert([
        {
          container: data.container,
          reference: data.reference,
          quantity: Number(data.quantity),
          observations: data.observations
        }
      ]);
      setOpen(false);
    } catch (error: Error | unknown) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      snapPoints={snapPoints}
      snapPointsMode="percent"
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      animation="quick"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame
        space="$4"
        padding="$4"
        justifyContent="space-between"
      >
        <YStack
          space="$4"
          width="100%"
        >
          <H3>Nueva entrada inventario</H3>

          <YStack
            width="100%"
            space="$2"
          >
            <Controller
              control={control}
              name="container"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Contenedor"
                  onChangeText={onChange}
                  onBlur={() => {
                    trigger("container");
                    onBlur();
                  }}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
            <Controller
              control={control}
              name="reference"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Referencia"
                  onChangeText={onChange}
                  onBlur={() => {
                    trigger("reference");
                    onBlur();
                  }}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
            <Controller
              control={control}
              name="quantity"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Cantidad"
                  onChangeText={onChange}
                  onBlur={() => {
                    trigger("quantity");
                    onBlur();
                  }}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                />
              )}
            />
            <Controller
              control={control}
              name="observations"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  placeholder="Observaciones"
                  onChangeText={onChange}
                  onBlur={() => {
                    trigger("observations");
                    onBlur();
                  }}
                  value={value}
                  autoCapitalize="words"
                  autoCorrect={true}
                  multiline
                />
              )}
            />
          </YStack>
        </YStack>

        <Button
          width="100%"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Añadir
        </Button>
      </Sheet.Frame>
    </Sheet>
  );
}
