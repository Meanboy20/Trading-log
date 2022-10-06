import React, { useState } from "react";
import "antd/dist/antd.css";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, Checkbox, Upload } from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const IdeasNew = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
      >
        <Form.Item label="Chekbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>

        <Form.Item label="name">
          <Input />
        </Form.Item>

        <Form.Item label="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="identify">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button>Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default IdeasNew;
