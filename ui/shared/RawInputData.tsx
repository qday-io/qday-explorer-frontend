import { Select } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import hexToUtf8 from "lib/hexToUtf8";
import RawDataSnippet from "ui/shared/RawDataSnippet";

type DataType = "Hex" | "UTF-8";
const OPTIONS: Array<DataType> = ["Hex", "UTF-8"];

interface Props {
  hex: string;
  rightSlot?: React.ReactNode;
}

const RawInputData = ({ hex, rightSlot: rightSlotProp }: Props) => {
  const [selectedDataType, setSelectedDataType] = React.useState<DataType>("Hex");

  const handleSelectChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDataType(event.target.value as DataType);
  }, []);

  const rightSlot = (
    <>
      <Select
        size="xs"
        borderRadius="base"
        value={selectedDataType}
        onChange={handleSelectChange}
        w="auto"
        mr="auto"
        borderColor={color.textBlack}
        fontSize={14}
        fontWeight={500}
        style={{
          color: color.textPrimary,
        }}
      >
        {OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {rightSlotProp}
    </>
  );

  return (
    <RawDataSnippet
      data={selectedDataType === "Hex" ? hex : hexToUtf8(hex)}
      rightSlot={rightSlot}
      textareaMaxHeight="220px"
      textareaMinHeight="160px"
      w="100%"
      contentProps={{ backgroundColor: "transparent", borderWidth: 1, borderRadius: 8, borderColor: color.textBlack }}
    />
  );
};

export default React.memo(RawInputData);
