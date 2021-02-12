import { ProfileDocumentType } from '../collections/profileCollection';

export type CategoryViewModel = ProfileDocumentType['categories'] extends (infer T)[] ? T : never;
