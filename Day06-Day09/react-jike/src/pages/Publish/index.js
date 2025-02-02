import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import {
  getArticleDetailAPI,
  publishArticleAPI,
  updateArticleAPI,
} from "@/apis/article";
import useChannelList from "@/hooks/useChannelList";

const { Option } = Select;

const Publish = () => {
  const navigate = useNavigate();

  // 获取频道列表
  const { channelList } = useChannelList();

  // 发布文章
  const onFinish = (value) => {
    if (imageType !== imageList.length) return message.error("图片数量不正确");

    const { title, content, channel_id } = value;
    const data = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
      channel_id,
    };

    if (articleId) {
      updateArticleAPI(data, articleId);
      message.success("更新成功");
    } else {
      publishArticleAPI(data);
      message.success("发布成功");
    }
    navigate("/article");
  };

  // 上传图片回调
  const [imageList, setImageList] = useState([]);
  const onChange = (value) => {
    setImageList(value.fileList);
  };

  // 切换封面类型
  const imageUpload = useRef(null);
  const [imageType, setImageType] = useState(0);
  const onImageTypeChange = (e) => {
    setImageType(e.target.value);
    if (imageUpload.current !== null)
      imageUpload.current.fileList.splice(
        0,
        imageUpload.current.fileList.length,
      );
  };

  // 回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const formRef = useRef(null);
  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleDetailAPI(articleId);
      formRef.current.setFieldsValue({
        ...res.data.data,
        type: res.data.data.cover.type,
      });
      setImageType(res.data.data.cover.type);
      setImageList(
        res.data.data.cover.images.map((item) => {
          return {
            url: item,
          };
        }),
      );
    }

    if (articleId !== null) getArticleDetail();
  }, [articleId]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: (articleId === null ? "发布" : "编辑") + "文章" },
            ]}
          />
        }
      >
        <Form
          ref={formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onImageTypeChange}>
                <Radio value={0}>无图</Radio>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                ref={imageUpload}
                listType="picture-card"
                fileList={imageList}
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                onChange={onChange}
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
