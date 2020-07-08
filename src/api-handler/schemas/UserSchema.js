import SimpleSchema from 'simpl-schema';

export const UserSchema = new SimpleSchema({
    name: String,
    username: String,
    email: String,
    password: String
});
