import { Document } from 'mongoose';

//Eliminate the warning--> Only plain objects can be passed to clientcomponents from server components
export function ConvertToSerializableObject(leanDocument: Document) {
    for (const key of Object.keys(leanDocument)) {
        if (leanDocument[key as keyof typeof leanDocument]?.toJSON && leanDocument[key as keyof typeof leanDocument]?.toString) {
            leanDocument[key as keyof typeof leanDocument] = leanDocument[key as keyof typeof leanDocument].toString();
        }
    }

    return leanDocument;
}