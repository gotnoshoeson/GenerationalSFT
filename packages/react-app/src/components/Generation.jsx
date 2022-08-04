//import { Typography } from "antd";
import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

// displays a page header

export default function Generation(props) {
  const num = props.value.toString();
  return (
    <span>
      <Text> Generation {num} </Text>
    </span>
  );
}