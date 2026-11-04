import type { Post } from "./types";
import { post as unionArenaStars } from "./union-arena-stars";
import { post as cardNumbers } from "./card-numbers";
import { post as threeCurves } from "./three-price-curves";

export const POSTS: Post[] = [threeCurves, unionArenaStars, cardNumbers];
