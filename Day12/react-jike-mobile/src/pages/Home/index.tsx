import './index.css';
import { Tabs } from 'antd-mobile';
import { useTabs } from '@/pages/Home/useTabs.ts';
import HomeList from '@/pages/Home/HomeList';

const Home = () => {
  const { channels } = useTabs();

  return (
    <>
      <div className="tabContainer">
        <Tabs defaultActiveKey="0">
          {channels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              <div className="listContainer">
                <HomeList channelId={item.id.toString()} />
              </div>
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default Home;
