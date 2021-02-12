import { ProfileDocumentType } from '../collections/profileCollection';

export type TagViewModel = ProfileDocumentType['tags'] extends (infer T)[] ? T : never;
