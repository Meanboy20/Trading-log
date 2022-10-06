import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

const DescriptionItem = ({ title, content, editDetail, setTradeDetail }) => {
  const subName = "Rolling";

  const inputToArray = (value) => {
    const chartArray = value.split(",");
    return chartArray;
  };

  return (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">
        {title === "Rolling" ? "Credit" : title}:
      </p>
      {!editDetail ? (
        content
      ) : title === "Review" ? (
        <TextArea
          name={title}
          defaultValue={content}
          onChange={(e) => {
            const { name, value } = e.target;
            setTradeDetail((pre) => ({
              ...pre,

              [title === "Rolling" ? subName : name]: value,
            }));
          }}
        />
      ) : (
        <Input
          name={title}
          defaultValue={content}
          onChange={(e) => {
            const { name, value } = e.target;
            setTradeDetail((pre) => ({
              ...pre,

              [name]: name === "chart" ? inputToArray(value) : value,
            }));
          }}
        />
      )}
    </div>
  );
};

export default DescriptionItem;
