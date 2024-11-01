export type IconSize = "md" | "lg" | "sm";

export function getIconProps(size: IconSize = "md") {
  switch (size) {
    case "sm": {
      return {
        boxSize: "14px", // for mobile, lists and regular content
      };
    }
    case "md": {
      return {
        boxSize: "20px", // for tables, lists and regular content
      };
    }
    case "lg": {
      return {
        boxSize: "30px", // for headings
      };
    }
  }
}

export function getBoxSizeIconProps(size: IconSize = "md") {
  switch (size) {
    case "sm": {
      return 14; // for mobile, lists and regular content
    }
    case "md": {
      return 20; // for tables, lists and regular content
    }
    case "lg": {
      return 30; // for headings
    }
  }
}
