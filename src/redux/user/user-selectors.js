import { createSelector } from "reselect";

const selectUser = ( state ) => state.user;

export const selectUserToken = createSelector(
    [selectUser],
    user => user.token
);

export const selectUsername = createSelector(
    [selectUser],
    user => user.username
)