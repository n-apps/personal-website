import * as Separator from "@radix-ui/react-separator";

export function DashedDivider() {
  return (
    <Separator.Root
      className="w-full h-0 border-t border-dashed border-muted-foreground/30"
      decorative
    />
  );
}
