import { useEffect, useState } from "react";
import { fetcheData } from "./data";

function App() {
  const [result, setResult] = useState([]);
  useEffect(() => {
    (async function getData() {
      (async function () {
        const data = await fetcheData();
        setResult(data);
      })();

      // setData(result);
    })();
  }, []);

  return (
    <div>
      <h1 className="mt-3">Customers' reward Report</h1>

      <div className="wrapper">
        <ul className="flex card-wrapper ">
          {result.map((reward, idx) => {
            const months = Object.keys(reward.monthly);
            const monthsRewards = Object.values(reward.monthly);
            return (
              <li className="card" key={`reward-${idx}`}>
                <div className="flex mb-3">
                  <p>Customer ID:</p>
                  <p>{reward.id}</p>
                </div>
                <div>
                  <h3 className="mb-3">Monthly Rewards</h3>
                  <ul className="mb-3">
                    {months.map((month, idx) => (
                      <li className="flex mb-2" key={`${month}-${idx}`}>
                        <p>{month}: </p>
                        <p>{monthsRewards[idx]}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex total">
                  <p>Total Reward:</p>
                  <p>{reward.total}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
