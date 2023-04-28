import { getGameReviews } from "../dist";

(async () => {
  const response = await getGameReviews({
    filterBy: "available",
    platform: "ps5",
    sortBy: "date",
  });

  console.log(response);
})();
