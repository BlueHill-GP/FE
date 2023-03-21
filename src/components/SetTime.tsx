import { Select, Space } from "antd";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { getRandomServicePackage } from "../api/servicePackage";
import ServicePackage from "./ServicePackage";
import "../assets/css/SetTime.css";

function SetTime() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>("dn");
  const [servicePackages, setServicePackages] = useState<any>([]);
  const handleDateChange = (date: Date | null, dateString: string) => {
    // code xử lý
  };
  const handleDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.valueAsDate;
    const dateString = event.target.value;
    handleDateChange(date, dateString);
  };

  const handleTimeChange = (time: Date | null, timeString: string[]) => {
    // code xử lý
  };
  const handleTimeInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const time = event.target.valueAsDate;
    const timeString = [event.target.value, ""]; // giá trị mặc định cho giây
    handleTimeChange(time, timeString);
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
    <div className="setTime_Container">
      <form action="" className="setTime_Form">
        <div>
          <label htmlFor="date">Ngày:</label>
          <input
            type="date"
            id="date"
            className="date-input"
            onChange={handleDateInputChange}
          />
        </div>

        <div>
          <label htmlFor="time">Giờ:</label>
          <input
            type="time"
            id="time"
            className="time-input"
            onChange={handleTimeInputChange}
          />
        </div>

        <div>
          <label htmlFor="location">Địa điểm:</label>
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
        </div>
        <button className="search-btn" onClick={handleSendData}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className="show-packages-homePage">
        <div className="show-packages-list">
          {servicePackages &&
            servicePackages.map((servicePackage: any, index: number) => (
              <ServicePackage
                servicePackage={servicePackage}
                select={filter}
                key={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SetTime;
