// import  { useState } from "react";
// import { DatePicker, TimePicker, Button } from "antd";
// import axios from "axios";

// const App = () => {
//   const [selectedDate, setSelectedDate] = useState<any>(null);
//   const format = "HH:mm";
//   const handleDateChange = (date: any, dateString: string) => {
//     setSelectedDate(dateString);
//   };

//   const handleSendData = () => {
//     console.log(selectedDate);

//     axios
//       .post("http://your-server-url.com", { selectedDate })
//       .then((response) => {
//         console.log("Server response:", response.data);
//       });
//   };

//   return (
//     <>
//       <TimePicker.RangePicker format={format} />
//       <DatePicker onChange={handleDateChange} />
//     </>
//   );
// };

// export default App;

import React, { useState } from "react";
import { DatePicker, TimePicker, Button, Space, Select } from "antd";
import axios from "axios";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>("dn");

  const handleDateChange = (date: any, dateString: string) => {
    setSelectedDate(dateString);
  };

  const handleTimeChange = (time: any, timeString: [string, string]) => {
    setSelectedTime(timeString.join(" - "));
  };

  const handleSendData = () => {
    axios
      .post("http://your-server-url.com", {
        selectedDate,
        selectedTime,
        selectedLocation,
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
    </>
  );
};

export default App;
