"use client";

import { Grid } from "@mui/material";
import React from "react";
import FsCard from "../card/FsCard";
import Color from "@/utils/color";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StoreIcon from "@mui/icons-material/Store";

const DHeaderItems = [
  {
    icon: <LaptopChromebookIcon />,
    boxColor: Color.gradients.dark.main,
    label: "Bookings",
    value: "234",
    remark: "than last month",
    remarkValue: "+23%",
  },
  {
    icon: <BarChartIcon />,
    boxColor: Color.gradients.info.main,
    label: "Today's Users",
    value: "100",
    remark: "than last month",
    remarkValue: "+3%",
  },
  {
    icon: <StoreIcon />,
    boxColor: Color.gradients.success.main,
    label: "Today's Revenue",
    value: "100$",
    remark: "than yesterday",
    remarkValue: "+1%",
  },

  {
    icon: <PersonAddIcon />,
    boxColor: Color.gradients.primary.main,
    label: "Followers",
    value: "+100",
    remark: "Just updated",
  },
];

const DHeader = () => {
  return (
    <Grid container spacing={4}>
      {DHeaderItems.map((item, index) => {
        return (
          <Grid item xs={12} md={6} lg={3} key={`fscard_${index}`}>
            <FsCard
              boxColor={item.boxColor}
              icon={item.icon}
              label={item.label}
              value={item.value}
              remark={item.remark}
              remarkValue={item.remarkValue}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DHeader;
