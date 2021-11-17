import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  FormProps
} from 'antd';
import { SizeType } from "antd/es/config-provider/SizeContext";
import ArtistLayout from "src/components/ArtistLayout";

export default function ArtistSetting() {
  const [componentSize, setComponentSize] = useState<SizeType>();
  const [ form ] = Form.useForm();

  const onFormLayoutChange: FormProps["onValuesChange"] = ({ size }) => {
    setComponentSize(size);
  };

  const treeData = [
    {
      title: "Alphabet",
      value: "alpha",
      children: [
        { value: "A", label: "A" },
      ],
    },
  ];

  const cascaderOptions = [
    {
      label: "Alphabet",
      value: "alpha",
      children: [
        { value: "A", label: "A" },
      ],
    },
  ];

  return <div style={{ margin: "20px 0" }}>
    <h2 style={ { margin: 20 } }>설정하기</h2>
    <p style={{ color: "rgba(0, 0, 0, 0.3)" }}>개별 아티스트 설정에 관련된 내용은 아직 미구현 상태입니다</p>

    <Form
      labelCol={ { span: 4 } }
      wrapperCol={ { span: 14 } }
      layout="horizontal"
      initialValues={ { size: undefined } }
      size={ componentSize }
      onValuesChange={ onFormLayoutChange }
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Input">
        <Input />
      </Form.Item>

      <Form.Item label="Select">
        <Select>
          <Select.Option value="test">Test</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="TreeSelect">
        <TreeSelect treeData={ treeData }/>
      </Form.Item>

      <Form.Item label="Cascader">
        <Cascader options={ cascaderOptions }/>
      </Form.Item>

      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>

      <Form.Item label="InputNumber">
        <InputNumber />
      </Form.Item>

      <Form.Item label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item>

      {/*<Form.Item style={{ justifyContent: "flex-end", width: "fit-content" }}>*/}
      {/*  <Button>Submit</Button>*/}
      {/*</Form.Item>*/}
    </Form>

  </div>
}

ArtistSetting.Layout = ArtistLayout;