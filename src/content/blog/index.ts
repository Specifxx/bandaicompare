import type { Post } from "./types";
import { post as unionArenaStars } from "./union-arena-stars";
import { post as cardNumbers } from "./card-numbers";
import { post as threeCurves } from "./three-price-curves";
import { post as fakeCards } from "./fake-cards";
import { post as uaExpensive } from "./union-arena-most-expensive";
import { post as blackFriday } from "./black-friday";

export const POSTS: Post[] = [blackFriday, uaExpensive, fakeCards, threeCurves, unionArenaStars, cardNumbers];
