import type { Post } from "./types";
import { post as unionArenaStars } from "./union-arena-stars";
import { post as cardNumbers } from "./card-numbers";
import { post as fakeCards } from "./fake-cards";
import { post as blackFriday } from "./black-friday";

// Sealed only (owner, 2026-11-08): the two card-price guides (the most expensive Union Arena cards and the
// three price curves of single cards) are retired and 301 from next.config.js.
export const POSTS: Post[] = [blackFriday, fakeCards, unionArenaStars, cardNumbers];
