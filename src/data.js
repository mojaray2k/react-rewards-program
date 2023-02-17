import { months } from "./utils";

export const fetcheData = async () => {
  const data = [
    {
      id: 1,
      email: "smith@gmail.com",
      firstName: "George",
      lastName: "Smith",
      amount: 120,
      date: "01-10-2022",
    },
    {
      id: 1,
      email: "smith@gmail.com",
      firstName: "George",
      lastName: "Smith",
      amount: 50,
      date: "01-07-2022",
    },
    {
      id: 1,
      email: "smith@gmail.com",
      firstName: "George",
      lastName: "Smith",
      amount: 220,
      date: "01-09-2022",
    },
    {
      id: 2,
      email: "boma@gmail.com",
      firstName: "boma",
      lastName: "Dan",
      amount: 200,
      date: "02-12-2022",
    },
    {
      id: 6,
      email: "boma@gmail.com",
      firstName: "boma",
      lastName: "Dan",
      amount: 700,
      date: "10-11-2022",
    },
    {
      id: 3,
      email: "boma@gmail.com",
      firstName: "boma",
      lastName: "Dan",
      amount: 80,
      date: "21-12-2022",
    },
    {
      id: 3,
      email: "boma@gmail.com",
      firstName: "boma",
      lastName: "Dan",
      amount: 130,
      date: "21-10-2022",
    },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const groups = data.reduce((acc, transaction) => {
        const key = `${transaction.id}-${transaction.date.slice(0, 5)}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(transaction);
        return acc;
      }, {});
      const result = {};
      for (const key in groups) {
        const [customerId, _, month] = key.split("-");
        const rewardPoints = groups[key].reduce((acc, transaction) => {
          const { amount } = transaction;
          if (amount > 100) {
            acc += (amount - 100) * 2 + 50;
          } else if (amount > 50) {
            acc += amount - 50;
          }
          return acc;
        }, 0);
        if (!result[customerId]) {
          result[customerId] = { total: 0, monthly: {} };
        }
        result[customerId].total += rewardPoints;
        result[customerId].monthly[months[month]] = rewardPoints;
      }

      const result_ = Object.keys(result).map((item) => ({
        id: item,
        ...result[item],
      }));

      resolve(result_);
    }, 1000);
  });
};
