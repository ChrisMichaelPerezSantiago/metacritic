import { describe, expect, it } from "vitest";
import { getGameReviews } from "../dist";

describe("should", () => {
  it("[GAME REVIEWS] be object and not empty", async () => {
    const result = await getGameReviews({
      filterBy: "available",
      platform: "ps5",
      sortBy: "date",
    });

    expect(typeof result).toBe("object");
    expect(result).not.toBeNull();
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });
});
