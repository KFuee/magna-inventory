import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Keyboard } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToastController } from "@tamagui/toast";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, H3, Input, Sheet, TextArea, YStack } from "tamagui";
import * as z from "zod";

import { useSupabase } from "../lib/context/useSupabase";
import { useInventoryItemStore } from "../lib/state/inventory-item";

const FormSchema = z.object({
  container: z.string().min(1, "El contenedor no puede estar vacío."),
  reference: z.string().min(1, "La referencia no puede estar vacía."),
  quantity: z.string().min(1, "La cantidad no puede estar vacía."),
  observations: z.string().optional(),
  codeType: z.union([
    z.literal(BarCodeScanner.Constants.BarCodeType.qr),
    z.literal(BarCodeScanner.Constants.BarCodeType.code128)
  ])
});

export default function NewInventoryItemSheet({
  type,
  data,
  open,
  setOpen
}: {
  type: "code128" | "qr" | "";
  data: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const toast = useToastController();

  const { supabase } = useSupabase();

  const setInventoryItems = useInventoryItemStore(
    (state) => state.setInventoryItems
  );

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    trigger,
    formState: { isSubmitting }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      container: "",
      reference: "",
      quantity: "",
      observations: ""
    }
  });

  useEffect(() => {
    setValue("codeType", type);
    setValue("container", data);
  }, [type, data]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { data: newInventoryItem } = await supabase
        .from("InventoryItems")
        .insert([
          {
            container: data.container,
            reference: data.reference,
            quantity: Number(data.quantity),
            observations: data.observations,
            code_type: data.codeType
          }
        ])
        .select("*")
        .single();

      if (!newInventoryItem)
        throw new Error(
          "No se ha podido crear el nuevo elemento de inventario"
        );

      setInventoryItems((items) => [newInventoryItem, ...items]);

      // Prevent perdida de valores si se trata de los mismos datos
      const lastType = data.codeType;
      const lastContainer = data.container;

      reset();

      setValue("codeType", lastType);
      setValue("container", lastContainer);

      setOpen(false);

      toast.show("Creación exitosa", {
        message: "Se ha creado la nueva entrada de inventario.",
        duration: 5000
      });
    } catch (error: Error | unknown) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }

  return (
    <Sheet
      modal={true}
      forceRemoveScrollEnabled={open}
      open={open}
      onOpenChange={(open: boolean) => {
        if (!open) if (Keyboard.isVisible) Keyboard.dismiss();

        setOpen(open);
      }}
      snapPointsMode="fit"
      dismissOnSnapToBottom
      dismissOnOverlayPress
      moveOnKeyboardChange
      zIndex={100_000}
      animation="bouncy"
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
                  keyboardType="default"
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Enter") {
                      trigger("reference");
                    }
                  }}
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
                  autoCapitalize="sentences"
                  autoCorrect={true}
                  numberOfLines={3}
                />
              )}
            />
          </YStack>
        </YStack>

        <Button
          width="100%"
          onPress={() => {
            Keyboard.dismiss();
            handleSubmit(onSubmit)();
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando..." : "Crear"}
        </Button>
      </Sheet.Frame>
    </Sheet>
  );
}
