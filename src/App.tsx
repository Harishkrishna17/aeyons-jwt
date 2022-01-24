import React from 'react';
import { Form, Input, Button, Switch } from 'antd';
import jwt from "jsonwebtoken";
import './App.css';

class App extends React.Component<{}, { output: string }> {
  private TOKEN_SECRET: string = "meet";

  constructor(props: any) {
    super(props);
    this.state = {
      output: ""
    }
  }
  copyToClipboard = () => {
    navigator.clipboard.writeText(this.state.output);
  }
  onFinish = (values: any) => {
    const tokenOptions: jwt.SignOptions = {
      audience: "jitsi",
      expiresIn: values.expiry + "h",
      algorithm: "HS256",
      subject: values.domain_name,
      issuer: "meet"
    };
    const token = jwt.sign(values, this.TOKEN_SECRET, tokenOptions);
    this.setState({ output: `https://${values.domain_name}/${values.room}?jwt=${token}` });
  }
  render = () => {
    return (
      <div className="container">
        <div className="header">
          <img className="logo" src="https://images.squarespace-cdn.com/content/v1/596763e803596ea603e6846f/1501617691677-WOMYPCCDXBGXMJR2HVYQ/red+stacked+lighter+with+R.png?format=1500w" />
        </div>
        <div className="body">
        <Form onFinish={this.onFinish}>
          <Form.Item required name="domain_name" label="Domain Name" hasFeedback initialValue="video2.aeyons.net">
            <Input placeholder="video2.aeyons.net" />
          </Form.Item>
          <Form.Item required name="email" label="Email" hasFeedback rules={[{ required: true, type: "email", message: 'Please input your email address!' }]}>
            <Input placeholder="youremail@example.com" />
          </Form.Item>
          <Form.Item required name="name" label="Name" hasFeedback rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input placeholder="Full Name" id="email" />
          </Form.Item>
          <Form.Item required name="room" label="Room Name" hasFeedback rules={[{ required: true, message: 'Please input the room name!' }]}>
            <Input id="room_name" />
          </Form.Item>
          <Form.Item required name="expiry" label="Expiry (in hours)" hasFeedback rules={[{ required: true, message: 'Please enter the expiry duration of token!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="moderator" label="Moderator" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
        <div className="footer">
          <div>
            {this.state.output}
          </div>
          <Button style={{ width: "100px" }} hidden={this.state.output.length ? false : true} type="primary" htmlType="submit" onClick={this.copyToClipboard}>
            Copy
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
