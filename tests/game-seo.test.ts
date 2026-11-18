import { test } from "node:test";
import assert from "node:assert/strict";
import { fitTitle, TITLE_MAX } from "@/lib/seo-title";
import { productTitleLadder, seoSet, setTitleLadder } from "@/lib/game-seo";

// Cardmarket's playbook, ported from TCG Prices (DECISIONS.md 2026-11-18): titles name their game and set code.
test("set titles lead with the game and its code, never the site's three-game label", () => {
  const dg = { name: "Ignition of X", code: "BT27", line: "dg" };
  const t = fitTitle(setTitleLadder(dg, ["Booster Box"])).absolute;
  assert.match(t, /^Digimon Ignition of X \(BT27\) Booster Box/);
  assert.ok(t.length <= TITLE_MAX, t);
  assert.deepEqual(seoSet({ name: "UE27BT: Umamusume: Pretty Derby", code: "UE27BT", line: "ua" }), { game: "Union Arena", name: "Umamusume: Pretty Derby", code: "UE27BT" });
});

test("product titles name the game once", () => {
  const fw = { name: "Reach the God", code: "FB12", line: "fw" };
  assert.equal(productTitleLadder("Reach the God Booster Box", fw)[0], "Fusion World Reach the God Booster Box (FB12) Price");
});
