/*
a little bit of explanation why we need this. It is very simple, if we type on different places these types with on small typo,
it will be incredible hard to find out what is the issue and why our app is not working properly. so, instead of that, we
create these constants only once, and we import them wherever the type mentioning is needed. Since we are exporting a constant
(that holds the type), and we don't manually type it, there is no way to make a typo.
 */
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN-OUT';

export const CREATE_STREAM = 'CREATE-STREAM';
export const FETCH_STREAMS = 'FETCH_STREAMS';
export const FETCH_STREAM = 'FETCH_STREAM';
export const DELETE_STREAM = 'DELETE_STREAM';
export const EDIT_STREAM = 'EDIT-STREAM';

