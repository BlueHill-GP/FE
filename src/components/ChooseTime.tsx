import React, { useEffect, useState } from "react";
import { DatePicker, TimePicker, Button, Space, Select } from "antd";
import axios from "axios";
import { getRandomServicePackage } from "../api/servicePackage";
import ServicePackage from "./ServicePackage";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>("dn");
  const [servicePackages, setServicePackages] = useState<any>([]);

  const handleDateChange = (date: any, dateString: string) => {
    setSelectedDate(dateString);
  };

  const handleTimeChange = (time: any, timeString: [string, string]) => {
    setSelectedTime(timeString.join(" - "));
  };

    useEffect(() => {
      async function fetchData() {
        const response = await getRandomServicePackage();
        if (response.data.data) {
          setServicePackages(response.data.data);
        }
      }
      fetchData();
      return () => {
        setServicePackages([]);
      };
    }, []);
  
  const filter = {
    selectedDate,
    selectedTime,
    selectedLocation,
  };
  const handleSendData = () => {
    axios
      .post("http://localhost:4000/api/service-packages/filter", {
        filter,
      })
      .then((response) => {
        console.log("Server response:", response.data);
      });
  };
  const handleChangeLocation = (value: string) => {
    setSelectedLocation(value);
    console.log(`selected ${value}`);
  };

  return (
    <>
      <TimePicker.RangePicker onChange={handleTimeChange} />
      <DatePicker onChange={handleDateChange} />
      <Space wrap>
        <Select
          defaultValue={selectedLocation}
          style={{ width: 120 }}
          onChange={handleChangeLocation}
          options={[
            { value: "hn", label: "Hà Nội" },
            { value: "dn", label: "Đà Nẵng" },
            { value: "sg", label: "Sài Gòn" },
          ]}
        />
      </Space>

      <Button onClick={handleSendData}>Send Data</Button>

      {servicePackages &&
        servicePackages.map((servicePackage: any, index: number) => (
          <ServicePackage
            servicePackage={servicePackage}
            select={filter}
            key={index}
          />
        ))}
    </>
  );
};

export default App;
