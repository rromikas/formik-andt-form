import React from "react";
import { Formik } from "formik";
import {
  Radio,
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Slider,
} from "formik-antd";
import { Upload, Row, Col, Space, Button } from "antd";
import { countries } from "countries-list";
import ImgCrop from "antd-img-crop";
import { onPreview, beforeUpload, getBase64 } from "./helpers/ImageUpload";
import { PlusOutlined } from "@ant-design/icons";
import getAge from "./helpers/AgeCalculator";
import * as Yup from "yup";

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid"),
  imageUrl: Yup.string().required("Required"),
  telephone: Yup.string()
    .required("Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid"
    ),
  gender: Yup.string().required("Required"),
  birthday: Yup.date().required("Required"),
  nationality: Yup.string().required("Required"),
  ethnicity: Yup.string().required("Required"),
});

const { Option } = Select;

const FormComponent = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "700px", width: "100%", padding: "20px" }}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            picked: "",
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values, setFieldValue, resetForm }) => {
            return (
              <Form layout="vertical">
                <Row gutter={[15, 0]}>
                  <Col flex="auto">
                    <Row justify="center">
                      <Col className="profile-photo-container">
                        <Form.Item
                          name="imageUrl"
                          label="Profile Photo"
                          required
                          style={{ margin: "auto" }}
                        >
                          <ImgCrop rotate>
                            <Upload
                              accept="image/png, image/jpeg"
                              name="avatar"
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              onChange={(info) => {
                                getBase64(info.file.originFileObj, (imageUrl) =>
                                  setFieldValue("imageUrl", imageUrl)
                                );
                              }}
                              onPreview={onPreview}
                              beforeUpload={beforeUpload}
                            >
                              {values.imageUrl ? (
                                <img
                                  src={values.imageUrl}
                                  alt="avatar"
                                  style={{ width: "100%" }}
                                />
                              ) : (
                                <div>
                                  <PlusOutlined />
                                  <div className="ant-upload-text">Upload</div>
                                </div>
                              )}
                            </Upload>
                          </ImgCrop>
                        </Form.Item>
                      </Col>
                      <Col flex="auto">
                        <Row gutter={[15, 0]}>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              label="First Name"
                              name="first_name"
                              required
                            >
                              <Input name="first_name" spellCheck={false} />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              label="Last Name"
                              name="last_name"
                              required
                            >
                              <Input name="last_name" spellCheck={false} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[15, 0]}>
                          <Col xs={24} sm={12}>
                            <Form.Item label="Email" name="email" required>
                              <Input
                                name="email"
                                type="email"
                                spellCheck={false}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              label="Telephone"
                              name="telephone"
                              required
                            >
                              <Input name="telephone" spellCheck={false} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row gutter={[15, 0]}>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Gender" name="gender" required>
                          <Checkbox
                            checked={values.gender === "Female"}
                            name="gender"
                            value="Female"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue("gender", "Female");
                              }
                            }}
                          >
                            Female
                          </Checkbox>
                          <Checkbox
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue("gender", "Male");
                              }
                            }}
                            checked={values.gender === "Male"}
                            name="gender"
                            value="Male"
                          >
                            Male
                          </Checkbox>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          required
                          name="birthday"
                          label={`Birthday${
                            values.birthday
                              ? ` (${getAge(values.birthday)} years)`
                              : ""
                          }`}
                        >
                          <DatePicker
                            name="birthday"
                            style={{ width: "100%" }}
                          ></DatePicker>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[15, 0]}>
                      <Col xs={24} sm={12}>
                        <Form.Item name="ethnicity" label="Ethnicity" required>
                          <Radio.Group name="ethnicity">
                            <Radio name="ethnicity" value={"White"}>
                              White
                            </Radio>
                            <Radio value={"Hispanic"} name="ethnicity">
                              Hispanic
                            </Radio>
                            <Radio value={"Other"} name="ethnicity">
                              Other
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="nationality"
                          label="Nationality"
                          required
                        >
                          <Select
                            name="nationality"
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Select your country"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {Object.values(countries).map((x) => (
                              <Option value={x.name}>{x.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="height" label="Height, cm">
                      <Slider
                        name="height"
                        max={300}
                        defaultValue={150}
                      ></Slider>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Space>
                    <Button type="primary" htmlType="submit" size="large">
                      Submit
                    </Button>
                    <Button size="large" onClick={() => resetForm()}>
                      Cancel
                    </Button>
                  </Space>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default FormComponent;
