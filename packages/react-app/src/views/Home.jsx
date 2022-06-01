//import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
//import React, { useState } from "react";
//import { utils } from "ethers";
//import { SyncOutlined } from "@ant-design/icons";

import { Events } from "../components";

export default function Home({
  //purpose,
  //address,
  mainnetProvider,
  localProvider,
  //yourLocalBalance,
  //price,
  //tx,
  readContracts,
  //writeContracts,
})
{
  //const [fanPinMinted, ] = useState("loading...");

  return (
    <div>
      <Events
      contracts={readContracts}
      contractName="FanSocietyMother"
      eventName="FanPinMinted"
      localProvider={localProvider}
      mainnetProvider={mainnetProvider}
      startBlock={1}
      />
    </div>
  )
}