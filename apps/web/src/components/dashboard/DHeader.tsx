"use client";

import { Grid } from "@mui/material";
import FsCard from "../card/FsCard";
import Color from "@/utils/color";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StoreIcon from "@mui/icons-material/Store";
import useMetrics from "@/hooks/useMetrics";

const DHeader = () => {
  const { totalApproved, totalBalance, totalBookings, totalPendings } =
    useMetrics();
  const DHeaderItems = [
    {
      icon: <LaptopChromebookIcon />,
      boxColor: Color.gradients.dark.main,
      label: "Total bookings",
      value: totalBookings ?? 0,
      remark: "than last month",
      remarkValue: "+23%",
    },
    {
      icon: <BarChartIcon />,
      boxColor: Color.gradients.info.main,
      label: "Total Pendings",
      value: totalPendings ?? 0,
      remark: "than last month",
      remarkValue: "+3%",
    },
    {
      icon: <StoreIcon />,
      boxColor: Color.gradients.success.main,
      label: "Total Revenue",
      value: `Rs. ${totalBalance ?? 0}`,
      remark: "than last month",
      remarkValue: "+1%",
    },

    {
      icon: <PersonAddIcon />,
      boxColor: Color.gradients.primary.main,
      label: "Total Approved",
      value: totalApproved ?? 0,
      remark: "Just updated",
    },
  ];
  return (
    <Grid container spacing={4}>
      {DHeaderItems.map((item, index) => {
        return (
          <Grid item xs={12} md={6} lg={3} key={`fscard_${index}`}>
            <FsCard
              boxColor={item.boxColor}
              icon={item.icon}
              label={item.label}
              value={item.value.toString()}
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
