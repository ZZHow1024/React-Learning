import BarChart from "./components/BarChart";

function Home() {
  return (
    <div>
      <BarChart title={"前端框架使用量"} />
      <BarChart title={"前端框架满意度"} />
    </div>
  );
}

export default Home;
